using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Web.DTOs;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly IUserSubscriptionRepository _subscriptionRepository;

        public AccountController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration config,
            IUserSubscriptionRepository subscriptionRepository)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _subscriptionRepository = subscriptionRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            // Assign a free subscription by default
            var freeSubscription = new UserSubscription
            {
                UserId = user.Id,
                PlanType = PlanType.Free,
                StartDate = DateTime.UtcNow,
                ExpiryDate = null,
                IsActive = true,
                PaymentStatus = "N/A"
            };

            await _subscriptionRepository.AddAsync(freeSubscription);

            return new UserDto
            {
                Email = user.Email,
                Username = user.UserName,
                Token = await GenerateJwtToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null)
                return Unauthorized("Invalid credentials.");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded)
                return Unauthorized("Invalid credentials.");

            return new UserDto
            {
                Email = user.Email!,
                Username = user.UserName!,
                Token = await GenerateJwtToken(user)
            };
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName ?? "")
            };

            // 🔥 Add subscription claim
            var subscription = (await _subscriptionRepository.ListAllAsync())
                .FirstOrDefault(s => s.UserId == user.Id && s.IsActive);

            if (subscription != null)
            {
                claims.Add(new Claim("SubscriptionActive", "true"));
                claims.Add(new Claim("PlanType", subscription.PlanType.ToString()));
            }
            else
            {
                claims.Add(new Claim("SubscriptionActive", "false"));
                claims.Add(new Claim("PlanType", "Free"));
            }

            var jwtKey = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
                throw new InvalidOperationException("JWT Key is not configured.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.UtcNow.AddDays(Convert.ToDouble(_config["Jwt:ExpireDays"] ?? "7"));

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

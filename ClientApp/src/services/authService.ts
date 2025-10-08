import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { RegisterDto, LoginDto, UserDto } from '../types/auth.types';

const API_URL = '/api/account/';

const register = (data: RegisterDto) => {
  return axios.post(API_URL + 'register', data);
};

const login = (data: LoginDto): Promise<UserDto> => {
  return axios
    .post<UserDto>(API_URL + 'login', data)
    .then((response) => {
      if (response.data.token) {
        const decodedToken: { [key: string]: any } = jwtDecode(response.data.token);
        const rolesClaim = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const roles = Array.isArray(rolesClaim) ? rolesClaim : [rolesClaim].filter(Boolean);

        const userWithRoles: UserDto = {
          ...response.data,
          roles: roles,
        };

        localStorage.setItem('user', JSON.stringify(userWithRoles));
        return userWithRoles;
      }
      return response.data;
    });
};

const logout = (): void => {
  localStorage.removeItem('user');
};

const getCurrentUser = (): UserDto | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr) as UserDto;
  }
  return null;
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
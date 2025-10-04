export interface RegisterDto {
  username?: string;
  email?: string;
  password?: string;
}

export interface LoginDto {
  email?: string;
  password?: string;
}

export interface UserDto {
  email: string;
  username: string;
  token: string;
}
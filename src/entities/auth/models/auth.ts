export interface IRegister {
  userName: string;
  email: string;
  password: string;
  fullname: string;
  rolesCommaDelimited?: string;
}

export interface ILogin {
  login: string;
  password: string;
}

export interface ISecret {
  isLogedIn: boolean;
  refreshToken: string;
  jwtToken: string;
  jwtTokenExpiry: number;
}

export interface IUser {
  login: string;
  fullname: string;
  email: string;
}

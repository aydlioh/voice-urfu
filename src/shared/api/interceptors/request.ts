import { InternalAxiosRequestConfig } from 'axios';
import { TokenService } from '../services';

export const request = (config: InternalAxiosRequestConfig) => {
  const token = TokenService.get()?.jwtToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

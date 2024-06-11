import { InternalAxiosRequestConfig } from 'axios';
import { TokenService } from '../services';
import { isRequestPrivate } from '../utils';

export const addTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  if (isRequestPrivate(config.url)) {
    const token = TokenService.get()?.jwtToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

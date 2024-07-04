import axios from 'axios';
import { addTokenInterceptor, refreshTokensInterceptor } from './interceptors';

export const chatHttp = axios.create({
  baseURL: 'https://voice-backend.ru:9003',
  timeout: 10000,
});

export const userHttp = axios.create({
  baseURL: 'https://voice-backend.ru:8081/api/Order',
  timeout: 5000,
});

chatHttp.interceptors.request.use(addTokenInterceptor, Promise.reject);
userHttp.interceptors.request.use(addTokenInterceptor, Promise.reject);

chatHttp.interceptors.response.use((res) => res, refreshTokensInterceptor);
userHttp.interceptors.response.use((res) => res, refreshTokensInterceptor);

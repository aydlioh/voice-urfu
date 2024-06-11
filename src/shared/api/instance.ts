import axios from 'axios';
import { addTokenInterceptor, refreshTokensInterceptor } from './interceptors';

export const chatHttp = axios.create({
  baseURL: 'https://voice-backend.ru:9003',
  timeout: 10000,
});

export const authHttp = axios.create({
  baseURL: 'https://voice-backend.ru:8081/api/Order',
  timeout: 5000,
});

chatHttp.interceptors.request.use(addTokenInterceptor, Promise.reject);
authHttp.interceptors.request.use(addTokenInterceptor, Promise.reject);

chatHttp.interceptors.response.use((res) => res, refreshTokensInterceptor);
authHttp.interceptors.response.use((res) => res, refreshTokensInterceptor);

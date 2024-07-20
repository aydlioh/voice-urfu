import axios from 'axios';
import { addTokenInterceptor, refreshTokensInterceptor } from './interceptors';

const headers = {
  Accept: 'text/plain',
  'Content-Type': 'application/json; charset=utf-8',
};

export const chatHttp = axios.create({
  baseURL: 'https://voice-backend.ru:9003',
  timeout: 10000,
  headers,
});

export const friendsHttp = axios.create({
  baseURL: 'https://voice-backend.ru:9004',
  timeout: 10000,
  headers,
});

export const authHttp = axios.create({
  baseURL: 'https://voice-backend.ru:8081/api/Order',
  timeout: 5000,
  headers,
});

export const userHttp = axios.create({
  baseURL: 'https://voice-backend.ru:8083/api/Order',
  timeout: 5000,
  headers,
});

chatHttp.interceptors.request.use(addTokenInterceptor, Promise.reject);
friendsHttp.interceptors.request.use(addTokenInterceptor, Promise.reject);
authHttp.interceptors.request.use(addTokenInterceptor, Promise.reject);
userHttp.interceptors.request.use(addTokenInterceptor, Promise.reject);

chatHttp.interceptors.response.use((res) => res, refreshTokensInterceptor);
friendsHttp.interceptors.response.use((res) => res, refreshTokensInterceptor);
authHttp.interceptors.response.use((res) => res, refreshTokensInterceptor);
userHttp.interceptors.response.use((res) => res, refreshTokensInterceptor);

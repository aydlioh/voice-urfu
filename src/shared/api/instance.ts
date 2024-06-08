import axios from 'axios';
import { request } from './interceptors';

export const chatHttp = axios.create({
  baseURL: 'https://voice-backend.ru:9003',
  timeout: 10000,
});

export const authHttp = axios.create({
  baseURL: 'https://voice-backend.ru:8081',
  timeout: 10000,
});

chatHttp.interceptors.request.use(request, Promise.reject);
authHttp.interceptors.request.use(request, Promise.reject);

import axios from 'axios';
import { addTokenInterceptor, refreshTokensInterceptor } from './interceptors';

export const createAxiosWithInterceptors = (baseURL: string) => {
  const instance = axios.create({ baseURL });
  instance.interceptors.request.use(addTokenInterceptor, Promise.reject);
  instance.interceptors.response.use((res) => res, refreshTokensInterceptor);
  return instance;
}

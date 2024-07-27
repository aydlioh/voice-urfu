import { createAxiosWithInterceptors } from './helpers';
import axios from 'axios';

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.headers.post['Accept'] = 'text/plain';

export const chatHttp = createAxiosWithInterceptors('https://voice-backend.ru:9003');
export const friendsHttp = createAxiosWithInterceptors('https://voice-backend.ru:9004');
export const authHttp = createAxiosWithInterceptors('https://voice-backend.ru:8081/api/Order');
export const userHttp = createAxiosWithInterceptors('https://voice-backend.ru:8083/api/Order');

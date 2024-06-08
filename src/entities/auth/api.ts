import { authHttp } from '@/shared/api';
import { ILogin, IRegister } from './models';

export const register = async (data: IRegister) => {
  try {
    const response = await authHttp.post('/api/Order/Register', {
      ...data,
      rolesCommaDelimited: 'ADMIN',
    });

    return response;
  } catch (error) {
    console.error('Registration failed: ', error);
  }
};

export const login = async (data: ILogin) => {
  try {
    const response = await authHttp.post('/api/Order/Login', data);
    return response;
  } catch (error) {
    console.error('Login failed: ', error);
  }
};

export const logout = async () => {
  try {
    const response = await authHttp.post('/api/Order/Logout');
    return response;
  } catch (error) {
    console.error('Logout failed: ', error);
  }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { authHttp } from '@/shared/api';
import { ILogin, IRegister } from './models';

export const register = async (data: IRegister) => {
  try {
    const response = await authHttp.post('/Register', {
      ...data,
      rolesCommaDelimited: 'ADMIN',
    });

    return response;
  } catch (error: any) {
    console.error('Registration failed: ', error);
    throw new Error(error.response.data);
  }
};

export const login = async (data: ILogin) => {
  try {
    const response = await authHttp.post('/Login', data);
    return response;
  } catch (error: any) {
    console.error('Login failed: ', error);
    throw new Error(error.response.data);
  }
};

export const logout = async () => {
  try {
    const response = await authHttp.post('/Logout');
    return response;
  } catch (error) {
    console.error('Logout failed: ', error);
  }
};

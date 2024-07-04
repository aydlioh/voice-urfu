import { userHttp } from '@/shared/api';
import axios from 'axios';

export const getFriends = async (query: string = '') => {
  try {
    const response = await userHttp.get('/GetUser', {
      params: {
        friendName: query,
      },
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
};

export const getUsers = async (query: string = '') => {
  try {
    const response = await userHttp.get('/GetUser', {
      params: {
        friendName: query,
      },
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data);
    }
  }
};

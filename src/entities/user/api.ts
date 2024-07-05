import { userHttp } from '@/shared/api';
import { IFriend } from './models';

export const getFriends = async (friendName: string = '') => {
  try {
    const response = await userHttp.get<IFriend[]>('/GetUser', {
      params: {
        friendName,
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};

export const getUsers = async (friendName: string = '') => {
  try {
    console.log(friendName)
    const { data } = await userHttp.get<IFriend[]>('/GetUser', {
      params: {
        friendName,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};

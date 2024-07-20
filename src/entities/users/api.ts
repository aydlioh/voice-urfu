import { userHttp } from '@/shared/api';
import { IUser } from './model';
import { SearchParams } from '@/shared/types';

export const getUsers = async ({ pageParam, query }: SearchParams) => {
  try {
    const { data, headers } = await userHttp.get<IUser[]>('/GetUser', {
      params: {
        friendName: query ? query : null,
        page: pageParam,
        pageSize: 5,
      },
    });
    
    const totalCount = headers['X-Total-Count'];

    return { data, totalCount };
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};

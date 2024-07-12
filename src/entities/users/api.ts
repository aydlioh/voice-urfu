import { userHttp } from '@/shared/api';
import { IUser } from './model';
import { QueryParams } from '@/shared/types';

export const getUsers = async ({ pageParam, query }: QueryParams) => {
  try {
    const { data, headers } = await userHttp.get<IUser[]>('/GetUser', {
      params: {
        friendName: query ? query : null,
        page: pageParam,
        pageSize: 2,
      },
    });

    const totalCount = headers['x-total-count'];

    return { data, totalCount };
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};

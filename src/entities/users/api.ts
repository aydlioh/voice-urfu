import { userHttp } from '@/shared/api';
// TODO import { IUser } from './model';
import { SearchParams } from '@/shared/types';

export const getUsers = async ({ pageParam, query }: SearchParams) => {
  try {
    // TODO IUser[]
    const { data } = await userHttp.get<any>('/GetUser', {
      params: {
        friendName: query ? query : null,
        page: pageParam,
        pageSize: 5,
      },
    });
    // TODO
    // const totalCount = headers['x-total-count'];

    return { data: data.item2, totalCount: data.item1 };
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};

import { friendsHttp, userHttp } from '@/shared/api';
import { FriendRequestParams, SearchParams } from '@/shared/types';
import { IFriend } from './model';

export const getFriends = async ({ pageParam, query }: SearchParams) => {
  try {
    const { data, headers } = await userHttp.get<IFriend[]>('/FriendList', {
      params: {
        friendName: query ? query : null,
        page: pageParam,
        pageSize: 5,
      },
    });
    
    const totalCount = headers['x-total-count'];

    return { data, totalCount };
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};

export const deleteFriend = async ({ friend }: { friend: string }) => {
  try {
    await friendsHttp.post(`/friendship/remove/${friend}`);
  } catch (error) {
    console.error('Error delete friend:', error);
    throw error;
  }
};

export const getFriendRequests = async ({
  belonging,
  type,
}: FriendRequestParams) => {
  try {
    const { data } = await friendsHttp.get<IFriend[]>(`/friendship/history`, {
      params: {
        type,
        belonging,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    throw error;
  }
};

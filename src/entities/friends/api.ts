import { friendsHttp } from '@/shared/api';
import { IFriend } from './model';
import { FriendRequestParams, SearchParams } from '@/shared/types';

export const getFriends = async ({ pageParam, query }: SearchParams) => {
  // TODO
  try {
    const { data } = await friendsHttp.get<IFriend[]>('/getFriends', {
      params: {
        friendName: query,
        page: pageParam,
        pageSize: 2,
      },
    });

    return data;
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

export const getFriendRequests = async ({ belonging, type }: FriendRequestParams) => {
  try {
    const { data } = await friendsHttp.get<IFriend[]>(
      `/friendship/history/${type}`,
      {
        params: {
          belonging,
        },
      }
    );

    return data;
  } catch (error) {
    console.error('Error fetching friend requests:', error);
    throw error;
  }
};

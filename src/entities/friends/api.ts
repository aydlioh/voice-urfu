import { friendsHttp, userHttp } from '@/shared/api';
import { IFriend } from './model';
import { FriendRequestParams } from '@/shared/types';

export const getFriends = async () => {
  try {
    const { data } = await userHttp.get<IFriend[]>('/FriendList');
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

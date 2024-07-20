import { useQuery } from '@tanstack/react-query';
import { getFriendRequests, getFriends } from './api';
import { FriendRequestParams } from '@/shared/types';

export const useFriends = () => {
  // TODO useInfiniteQuery
  return useQuery({
    queryKey: ['friends'],
    queryFn: getFriends,
  });
};

export const useFriendRequest = ({ belonging, type }: FriendRequestParams) => {
  // TODO useInfiniteQuery
  return useQuery({
    queryKey: ['friendRequests', belonging, type],
    queryFn: () => getFriendRequests({ belonging, type }),
  });
};

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getFriendRequests, getFriends } from './api';
import { FriendRequestParams } from '@/shared/types';

export const useFriends = (query: string | null) => {
  return useInfiniteQuery({
    queryKey: ['friends', query],
    queryFn: ({ pageParam }) => getFriends({ pageParam, query }),
    initialPageParam: 1,
    getNextPageParam: ({ data }, _, lastPageParam) => {
      if (!data.length) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    select: (data) => {
      return {
        pages: [...data.pages].map(({ data }) => data),
        pageParams: [...data.pageParams],
        totalCount: data.pages[0].totalCount,
      };
    },
  });
};

export const useFriendRequest = ({ belonging, type }: FriendRequestParams) => {
  // TODO useInfiniteQuery
  return useQuery({
    queryKey: ['friendRequests', belonging, type],
    queryFn: () => getFriendRequests({ belonging, type }),
  });
};

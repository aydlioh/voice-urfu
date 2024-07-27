import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getChats, getMessages } from './api';

export const useMessages = (query: string) => {
  return useQuery({
    queryKey: ['messages', query],
    queryFn: () => getMessages({ query }),
  });
};

export const useChats = (query: string | null) => {
  return useInfiniteQuery({
    queryKey: ['chats', query],
    queryFn: ({ pageParam }) => getChats({ pageParam, query }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.length) {
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
  });
};

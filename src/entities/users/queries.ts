import { useInfiniteQuery } from '@tanstack/react-query';
import { getUsers } from './api';

export const useUserList = (query: string | null) => {
  return useInfiniteQuery({
    queryKey: ['users', query],
    queryFn: ({ pageParam }) => getUsers({ pageParam, query }),
    initialPageParam: 1,
    getNextPageParam: ({ data }, _, lastPageParam) => {
      if (!data.length) {
        return undefined;
      }
      return lastPageParam + 1;
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

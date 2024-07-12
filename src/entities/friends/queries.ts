import { useInfiniteQuery } from "@tanstack/react-query";
import { getFriends } from "./api";

export const useFriends = (query: string | null) => {
  return useInfiniteQuery({
    queryKey: ["friends", query],
    queryFn: ({ pageParam }) => getFriends({ pageParam, query }),
    initialPageParam: 1,
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

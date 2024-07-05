import { useQuery } from '@tanstack/react-query';
import { getFriends, getUsers } from './api';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/shared/hooks';

export const useFriends = () => {
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounce(search, 500);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['friends', search],
    queryFn: () => getFriends(search),
  });

  useEffect(() => {
    if (debounceSearch) {
      refetch();
    }
  }, [debounceSearch]);

  return { friends: data, isLoading, error, search, setSearch };
};

export const useUserList = () => {
  const [search, setSearch] = useState('a');
  const debounceSearch = useDebounce(search, 500);

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['friends', search],
    queryFn: () => getUsers(search),
  });

  // useEffect(() => {
  //   if (debounceSearch) {
  //     refetch();
  //   }
  // }, [debounceSearch]);

  return {
    users: data,
    isLoading: isLoading || isFetching,
    isError,
    search,
    setSearch,
  };
};

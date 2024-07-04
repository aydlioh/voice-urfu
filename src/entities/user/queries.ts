import { useQuery } from '@tanstack/react-query';
import { getFriends } from './api';
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

  return { data, isLoading, error, search, setSearch };
};

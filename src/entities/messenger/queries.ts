import { useQuery } from '@tanstack/react-query';
import { getMessages } from './api';

type GetMessages = {
  receiverId: string;
};

export const useMessages = ({ receiverId }: GetMessages) => {
  return useQuery({
    queryKey: ['messages', receiverId],
    queryFn: () => getMessages({ receiverId }),
  });
};

import { useQuery } from '@tanstack/react-query';
import { getMessages } from './api';

type GetMessages = {
  senderId: string;
  receiverId: string;
};

export const useMessages = ({ senderId, receiverId }: GetMessages) => {
  return useQuery({
    queryKey: ['messages', receiverId],
    queryFn: () => getMessages({ senderId, receiverId }),
  });
};

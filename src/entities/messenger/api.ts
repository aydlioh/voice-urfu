import { chatHttp } from '@/shared/api';
import { IMessage } from './model';

export const getMessages = async ({ receiverId }: { receiverId: string }) => {
  try {
    const { data } = await chatHttp.get<IMessage[]>('/chat/history/messages', {
      params: {
        receiverId,
        page: 0,
        length: 1000,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

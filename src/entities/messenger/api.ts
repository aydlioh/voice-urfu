import { chatHttp } from '@/shared/api';
import { IMessage } from './model';

export const getMessages = async ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  try {
    const { data } = await chatHttp.get<IMessage[]>('/chat/history/messages', {
      params: {
        senderId,
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

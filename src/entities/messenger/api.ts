import { chatHttp } from '@/shared/api';
import { IChat, IMessage } from './models';
import { SearchParams } from '@/shared/types';

export const getMessages = async ({ query }: { query: string }) => {
  try {
    const { data } = await chatHttp.get<IMessage[]>('/chat/history/messages', {
      params: {
        receiverId: query,
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

export const getChats = async ({ pageParam, query }: SearchParams) => {
  try {
    const { data } = await chatHttp.get<IChat[]>(
      '/chat/find-existing-chats',
      {
        params: {
          page: pageParam,
          length: 10,
          receiver: query,
        },
      }
    );

    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

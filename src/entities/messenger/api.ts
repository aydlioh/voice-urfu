import { chatHttp } from '@/shared/api';
import { IChat, IMessage } from './models';
import { SearchParams } from '@/shared/types';

export const getMessages = async ({ pageParam, query }: SearchParams) => {
  try {
    const { data } = await chatHttp.get<IMessage[]>('/chat/history/messages', {
      params: {
        page: pageParam,
        length: 20,
        receiverId: query,
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
    const { data } = await chatHttp.get<IChat[]>('/chat/find-existing-chats', {
      params: {
        page: pageParam,
        length: 10,
        receiver: query,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
};

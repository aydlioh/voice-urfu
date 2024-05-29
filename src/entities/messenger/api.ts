import { api } from '@/shared/api';

export const getMessages = async ({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) => {
  try {
    const response = await api.get('/chat/history/messages', {
      params: {
        senderId,
        receiverId,
        page: 0,
        length: 5,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

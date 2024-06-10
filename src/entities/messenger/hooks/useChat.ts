/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { IMessage } from '../model';
import dayjs from 'dayjs';
import { useMessages } from '../queries';
import { TokenService } from '@/shared/api/services';

const headers = {
  Authorization: `Bearer ${TokenService.get()?.jwtToken}`,
};

export const useChat = () => {
  // TODO переделать через useNavigate, когда будет работать список
  const { id } = useParams();
  const { login } = useAuthStatus();

  const { data, isFetching } = useMessages({
    senderId: login,
    receiverId: String(id),
  });

  const [messages, setMessages] = useState<IMessage[]>([]);
  const stompClient = useRef<any>(null);

  const sendMessage = (content: string) => {
    const newMessage: IMessage = {
      id: crypto.randomUUID(),
      content,
      sender: login,
      receiver: id ?? '',
      timestamp: dayjs().format(),
    };

    if (id !== login) {
      setMessages((prev) => [newMessage, ...prev]);
    }

    stompClient.current.send(
      `/app/chat/${login}/${id}`,
      {},
      JSON.stringify({ content })
    );
  };

  useEffect(() => {
    setMessages(data || []);
  }, [data]);

  useEffect(() => {
    const socket = new SockJS('https://voice-backend.ru:9003/chat');
    stompClient.current = Stomp.over(() => socket);

    const connect = () => {
      if (!stompClient.current.connected) {
        stompClient.current.connect(headers, () => {
          stompClient.current.subscribe(
            `/topic/chat/${id}/${login}`,
            (output: any) => {
              const message = JSON.parse(output.body);
              setMessages((prev) => [message, ...prev]);
            }
          );
        });
      }
    };

    connect();

    return () => {
      stompClient.current.disconnect();
      setMessages([]);
    };
  }, [id, login]);

  return {
    user: login,
    opponent: id,
    sendMessage,
    messages,
    isLoading: isFetching,
  };
};

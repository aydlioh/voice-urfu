/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { IMessage } from '../models';
import dayjs from 'dayjs';
import { useMessages } from '../queries';
import { TokenService } from '@/shared/api/services';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

const headers = {
  Authorization: `Bearer ${TokenService.get()?.jwtToken}`,
};

export const useChatConnection = () => {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const { login } = useAuthStatus();
  const user = String(username);
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMessages(user);

  const stompClient = useRef<any>(null);

  const addMessage = (message: IMessage) => {
    queryClient.setQueryData<InfiniteData<IMessage[], unknown>>(
      ['messages', user],
      (oldData) => {
        if (!oldData) {
          return { pages: [[message]], pageParams: [] };
        }
        const { pages, pageParams } = oldData;
        const newPages = [...pages];
        newPages[0] = [message, ...newPages[0]];

        return { pages: newPages, pageParams };
      }
    );
  };

  const sendMessage = (content: string) => {
    const newMessage: IMessage = {
      id: crypto.randomUUID(),
      content,
      sender: login,
      receiver: username ?? '',
      timestamp: dayjs().format(),
    };

    if (username !== login) {
      addMessage(newMessage);
    }

    stompClient.current.send(
      `/app/chat/${login}/${username}`,
      {},
      JSON.stringify({ content })
    );
  };

  useEffect(() => {
    const socket = new SockJS('https://voice-backend.ru:9003/chat');
    stompClient.current = Stomp.over(() => socket);

    const connect = () => {
      if (!stompClient.current.connected) {
        stompClient.current.connect(headers, () => {
          stompClient.current.subscribe(
            `/topic/chat/${username}/${login}`,
            (output: any) => {
              const message = JSON.parse(output.body);
              addMessage(message);
            }
          );
        });
      }
    };

    connect();

    return () => {
      stompClient.current.disconnect();
    };
  }, [username, login]);

  return {
    user: login,
    opponent: username,
    sendMessage,
    messages: data,
    isFetching: isFetching && !isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

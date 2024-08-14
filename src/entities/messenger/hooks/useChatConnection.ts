/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { IMessage } from '../models';
import dayjs from 'dayjs';
import { useMessages } from '../queries';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { StompService } from '@/shared/ws';

export const useChatConnection = () => {
  const queryClient = useQueryClient();
  const { username } = useParams();
  const { login } = useAuthStatus();
  const user = String(username);
  const { data, isFetching, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMessages(user);

  const stompClient = useRef<StompService | null>(null);

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

    stompClient.current?.send({
      url: `/app/chat/${login}/${username}`,
      body: { content },
    });
  };

  useEffect(() => {
    stompClient.current = new StompService(
      'https://voice-backend.ru:9003/chat',
      {
        debug: true,
        debugName: `CHAT`,
      }
    );

    const connect = () => {
      if (!stompClient.current?.connected) {
        stompClient.current?.connect(() => {
          stompClient.current?.subscribe(
            { url: `/topic/chat/${username}/${login}` },
            addMessage
          );
        });
      }
    };

    connect();

    return () => {
      stompClient.current?.disconnect();
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef } from 'react';
import { CloseButton, FriendRequest } from '@/features/notification';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { StompService } from '@/shared/ws';
import { TokenService } from '@/shared/api/services';

const headers = {
  Authorization: `Bearer ${TokenService.get()?.jwtToken}`,
}

export const useFriendsConnection = () => {
  const queryClient = useQueryClient();
  const { login } = useAuthStatus();
  const friendshipClient = useRef<StompService | null>(null);

  const sendMessage = ({ user, status }: { user: string; status: string }) => {
    friendshipClient.current?.send({
      url: `/app/friendship/${user}`,
      body: {
        timestamp: new Date().getTime(),
        sender: headers.Authorization,
        status,
      },
    });
  };

  const handleAccept = (receiver: string) => {
    sendMessage({ user: receiver, status: 'accepted' });
    queryClient.invalidateQueries({
      queryKey: ['friendRequests', { belonging: 'receiver', type: 'pending' }],
    });
  };

  const handleRefuse = (receiver: string) => {
    sendMessage({ user: receiver, status: 'refused' });
    queryClient.invalidateQueries({
      queryKey: ['friendRequests', { belonging: 'receiver', type: 'pending' }],
    });
  };

  const handleRequest = (receiver: string) => {
    sendMessage({ user: receiver, status: 'pending' });
  };

  useEffect(() => {
    friendshipClient.current = new StompService(
      'https://voice-backend.ru:9004/friendship',
      {
        debug: true,
        debugName: 'NOTIFICATIONS',
      }
    );

    const connect = () => {
      if (!friendshipClient.current?.connected) {
        friendshipClient.current?.connect(() => {});
      }
    };

    connect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (login && friendshipClient.current?.connected) {
        friendshipClient.current.subscribe<any>(
          { url: `/topic/friendship/${login}` },
          (message) => {
            if (
              message.type === 'friendRequest' &&
              message.status === 'pending'
            ) {
              toast(<FriendRequest message={message} />, {
                closeButton: <CloseButton />,
              });
            } else {
              console.log(message);
            }
          }
        );

        clearInterval(interval);
      }
    }, 100);

    () => {
      clearInterval(interval);
    };
  }, [login]);

  return { handleAccept, handleRefuse, handleRequest };
};

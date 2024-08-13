/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { TokenService } from '@/shared/api/services';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { useEffect, useRef } from 'react';
import { CloseButton, FriendRequest } from '@/features/notification';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const headers = {
  Authorization: `Bearer ${TokenService.get()?.jwtToken}`,
};

export const useFriendsConnection = () => {
  const queryClient = useQueryClient();
  const { login } = useAuthStatus();
  const friendshipClient = useRef<any>(null);

  const sendMessage = ({ user, status }: { user: string; status: string }) => {
    friendshipClient.current.send(
      `/app/friendship/${user}`,
      {},
      JSON.stringify({
        timestamp: new Date().getTime(),
        sender: headers.Authorization,
        status,
      })
    );
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
    const friendshipSocket = new SockJS(
      'https://voice-backend.ru:9004/friendship'
    );
    friendshipClient.current = Stomp.over(() => friendshipSocket);

    const connect = () => {
      if (!friendshipClient.current.connected) {
        friendshipClient.current.connect(headers, () => {});
      }
    };

    connect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (login && friendshipClient.current.connected) {
        friendshipClient.current.subscribe(
          `/topic/friendship/${login}`,
          (output: any) => {
            const message = JSON.parse(output.body);
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

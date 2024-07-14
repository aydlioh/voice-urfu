/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { TokenService } from '@/shared/api/services';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { useEffect, useRef } from 'react';
import { CloseButton, FriendRequest } from '@/features/notification';
import { toast } from 'react-toastify';

const headers = {
  Authorization: `Bearer ${TokenService.get()?.jwtToken}`,
};

export const useFriendsConnection = () => {
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

  const handleAccept = () => {
    sendMessage({ user: login, status: 'accepted' });
  };

  const handleRefuse = () => {
    sendMessage({ user: login, status: 'refused' });
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
        friendshipClient.current.connect(headers, () => {
          friendshipClient.current.subscribe(
            `/topic/friendship/${login}`,
            (output: any) => {
              const message = JSON.parse(output.body);
              toast(
                <FriendRequest
                  handleRefuse={handleRefuse}
                  handleAccept={handleAccept}
                  message={message}
                />,
                {
                  closeButton: <CloseButton />,
                }
              );
            }
          );
        });
      }
    };

    connect();
  }, []);

  return { handleAccept, handleRefuse, handleRequest };
};

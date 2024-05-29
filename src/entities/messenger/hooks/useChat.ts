/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';
import { getMessages } from '../api';
import { IMessage } from '../model';

const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJTaHVrc2hpbm1ha3NpbS5ydUBtYWlsLnJ1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlNodWtzaGlubWFrc2ltLnJ1QG1haWwucnUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcxNjIzMTM3MCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNjYifQ.gl6KyviYyB8hNAQ5fjZ_vGjlR8w4koJjfqHumoSw5m8',
};

export const useChat = () => {
  const { id } = useParams();
  const { login } = useAuthStatus();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const stompClient = useRef<any>(null);

  const sendMessage = (body: string) => {
    stompClient.current.send(
      `/app/chat/${login}/${id}`,
      {},
      JSON.stringify({ body, user: login })
    );
  };

  useEffect(() => {
    getMessages({ receiverId: String(id), senderId: login }).then(console.log);

    const socket = new SockJS('https://voice-backend.ru:8082/chat');
    stompClient.current = Stomp.over(() => socket);

    const connect = () => {
      if (!stompClient.current.connected) {
        stompClient.current.connect(headers, () => {
          stompClient.current.subscribe(
            `/topic/chat/${id}/${login}`,
            (output: any) => {
              const { content } = JSON.parse(output.body);
              setMessages((prev) => [...prev, content]);
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

  return { sendMessage, messages };
};

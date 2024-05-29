/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStatus } from '@/entities/auth';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';

const headers = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJTaHVrc2hpbm1ha3NpbS5ydUBtYWlsLnJ1IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IlNodWtzaGlubWFrc2ltLnJ1QG1haWwucnUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTcxNjIzMTM3MCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI2NiIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcyNjYifQ.gl6KyviYyB8hNAQ5fjZ_vGjlR8w4koJjfqHumoSw5m8',
};

export const useChat = () => {
  const { id } = useParams();
  const { login } = useAuthStatus();

  const [messages, setMessages] = useState<any[]>([]);
  const stompClient = useRef<any>(null);

  const sendMessage = () => {
    stompClient.current.send(
      `/app/chat/${login}/${id}`,
      {},
      JSON.stringify({ content: 'Привет!' })
    );
  };

  useEffect(() => {
    // const getMessages = async () => {
    //   const response = await fetch(
    //     `https://voice-backend.ru:8082/chat/history/messages?senderId=${login}&receiverId=${id}&page=0&length=5`,
    //     {
    //       headers,
    //     }
    //   );

    //   return await response.json();
    // };

    // getMessages().then((res) => console.log(res));

    const socket = new SockJS('https://voice-backend.ru:8082/chat');
    stompClient.current = Stomp.over(() => socket);

    const connect = () => {
      if (!stompClient.current.connected) {
        stompClient.current.connect(headers, () => {
          stompClient.current.subscribe(
            `/topic/chat/${id}/${login}`,
            (message: any) => {
              setMessages((prev) => [...prev, message]);
            }
          );
        });
      }
    };

    connect();
  }, []);

  return { sendMessage, messages };
};

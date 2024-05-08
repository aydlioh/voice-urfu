import { GroupcallContext } from '@/entities/groupcall';
import { PageSpinner } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

export const GroupcallLayout = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket('wss://voice-backend.ru:8082/groupcall');

    ws.onopen = () => {
      console.log('Groupcall connected');
      setIsLoading(false);
    };

    ws.onclose = (event) => {
      console.log('Groupcall disconnected', event);
      setIsLoading(true);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return isLoading ? (
    <PageSpinner />
  ) : (
    <GroupcallContext.Provider value={{ socket }}>
      <Outlet />
    </GroupcallContext.Provider>
  );
};

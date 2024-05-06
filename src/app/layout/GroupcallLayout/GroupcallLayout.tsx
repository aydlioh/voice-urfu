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

    setSocket(ws);

    return () => {
      ws.close();
      console.log('Groupcall disconnected');
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

import { createContext } from 'react';

type GroupcallContextType = {
  socket: WebSocket | null;
};

export const GroupcallContext = createContext<GroupcallContextType>({
  socket: null,
});

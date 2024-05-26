import { SocketContextType } from '@/shared/types';
import { createContext } from 'react';

export const MessengerContext = createContext<SocketContextType>({
  socket: null,
});

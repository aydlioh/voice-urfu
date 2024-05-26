import { SocketContextType } from '@/shared/types';
import { createContext } from 'react';

export const GroupcallContext = createContext<SocketContextType>({
  socket: null,
});

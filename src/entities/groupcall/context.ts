import { SocketContextType } from '@/shared/common/types';
import { createContext } from 'react';

export const GroupcallContext = createContext<SocketContextType>({
  socket: null,
});

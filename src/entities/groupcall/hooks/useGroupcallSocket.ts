import { useContext } from 'react';
import { GroupcallContext } from '@/entities/groupcall';

export const useGroupcallSocket = () => useContext(GroupcallContext);

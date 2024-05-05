import { useContext } from 'react';
import { GroupcallContext } from '@/shared/context';

export const useGroupcall = () => useContext(GroupcallContext);

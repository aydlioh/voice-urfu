import { useContext } from 'react';
import { MessengerContext } from '@/entities/messenger';

export const useMessengerSocket = () => useContext(MessengerContext);

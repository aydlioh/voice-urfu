import { createContext, useContext } from 'react';

type FriendsContextType = {
  handleAccept: (receiver: string) => void;
  handleRefuse: (receiver: string) => void;
  handleRequest: (receiver: string) => void;
};

export const FriendsContext = createContext<FriendsContextType>({
  handleAccept: () => {},
  handleRefuse: () => {},
  handleRequest: () => {},
});

export const useFriendsContext = () => useContext(FriendsContext);

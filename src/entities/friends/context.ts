import { createContext, useContext } from 'react';

type FriendsContextType = {
  handleAccept: (sender: string) => void;
  handleRefuse: (sender: string) => void;
  handleRequest: (receiver: string) => void;
};

export const FriendsContext = createContext<FriendsContextType>({
  handleAccept: () => {},
  handleRefuse: () => {},
  handleRequest: () => {},
});

export const useFriendsContext = () => useContext(FriendsContext);

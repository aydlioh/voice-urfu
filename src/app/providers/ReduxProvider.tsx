import { store } from '@/app/redux';
import { Provider } from 'react-redux';

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

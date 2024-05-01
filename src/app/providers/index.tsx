import { ReduxProvider } from './ReduxProvider';
import { UIProvider } from './UIProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <UIProvider>{children}</UIProvider>
    </ReduxProvider>
  );
};

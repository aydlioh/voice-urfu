import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '../router';
import { ReduxProvider } from './ReduxProvider';
import { TanstackProvider } from './TanstackProvider';
import { UIProvider } from './UIProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <TanstackProvider>
          <UIProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </UIProvider>
        </TanstackProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

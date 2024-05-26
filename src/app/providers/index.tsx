import { ErrorBoundary } from '../router';
import { ReduxProvider } from './ReduxProvider';
import { UIProvider } from './UIProvider';
import { BrowserRouter } from 'react-router-dom';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <UIProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </UIProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
};

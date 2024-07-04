import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { Providers } from './providers';
import { PageSpinner } from '@/shared/ui';
import { RootRouter } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <Suspense fallback={<PageSpinner variant="screen" />}>
      <RootRouter />
    </Suspense>
  </Providers>
);

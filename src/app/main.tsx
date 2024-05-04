import './styles/index.css';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from './providers';
import { PageSpinner } from '@/shared/ui';
import { RootRouter } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <BrowserRouter>
      <Suspense fallback={<PageSpinner />}>
        <RootRouter />
      </Suspense>
    </BrowserRouter>
  </Providers>
);

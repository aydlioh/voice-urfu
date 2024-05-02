import './styles/index.css';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { RootRouter } from './router/RootRouter';
import { Providers } from './providers';
import { PageSpinner } from '@/shared/ui';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Providers>
    <Suspense fallback={<PageSpinner />}>
      <RouterProvider router={RootRouter} />
    </Suspense>
  </Providers>
);

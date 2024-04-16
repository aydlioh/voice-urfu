import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RootRouter } from './router/RootRouter';
import './styles/index.css';
import { UIProvider } from './providers';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <UIProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={RootRouter} />
    </Suspense>
  </UIProvider>
);

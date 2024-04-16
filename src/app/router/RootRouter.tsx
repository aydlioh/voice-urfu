import { HomePage } from '@/pages';
import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';

export const RootRouter = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

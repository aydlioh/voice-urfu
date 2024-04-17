import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';
import { homeRoutes } from '@/pages';
import { roomRoutes } from '@/pages/Room/routes';

export const RootRouter = createBrowserRouter([
  {
    element: <PageLayout />,
    errorElement: <div>Error</div>,
    children: [
      ...homeRoutes,
      ...roomRoutes,
    ],
  },
]);

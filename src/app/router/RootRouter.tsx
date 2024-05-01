import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';
import { mainRoutes, settingsRoutes, roomsRoutes, NotFoundPage } from '@/pages';

export const RootRouter = createBrowserRouter([
  {
    element: <PageLayout />,
    children: [
      ...mainRoutes,
      ...roomsRoutes,
      ...settingsRoutes,
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

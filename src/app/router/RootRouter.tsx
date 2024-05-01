import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';
import { mainRoutes, settingsRoutes, roomsRoutes, NotFoundPage, authRoutes } from '@/pages';
import { AuthGuard, PublicGuard } from './guards';

export const RootRouter = createBrowserRouter([
  {
    element: <AuthGuard />,
    children: [
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
    ],
  },
  {
    element: <PublicGuard />,
    children: [
      ...authRoutes,
    ]
  }
]);

import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from '../layout/PageLayout';
import {
  mainRoutes,
  settingsRoutes,
  roomsRoutes,
  errorsRoutes,
  authRoutes,
} from '@/pages';
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
          ...errorsRoutes,
        ],
      },
    ],
  },
  {
    element: <PublicGuard />,
    children: [...authRoutes],
  },
]);

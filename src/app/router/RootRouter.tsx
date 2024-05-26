import { PageLayout } from '../layout';
import {
  mainRoutes,
  settingsRoutes,
  roomsRoutes,
  errorsRoutes,
  authRoutes,
  messengerRoutes,
} from '@/pages';
import { AuthGuard, PublicGuard } from './guards';
import { useRoutes } from 'react-router-dom';

const routes = [
  {
    element: <PublicGuard />,
    children: [...authRoutes],
  },
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
          ...messengerRoutes,
        ],
      },
    ],
  },
];

export const RootRouter = () => useRoutes(routes);

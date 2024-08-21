import { PageLayout } from '../layout';
import {
  mainRoutes,
  settingsRoutes,
  roomsRoutes,
  errorsRoutes,
  authRoutes,
  messengerRoutes,
  friendsRoutes,
  homeRoutes,
} from '@/pages';
import { AuthGuard, NoAuthGuard } from './guards';
import { useRoutes } from 'react-router-dom';

const routes = [
  {
    element: <NoAuthGuard />,
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
          ...messengerRoutes,
          ...friendsRoutes,
          ...errorsRoutes,
        ],
      },
    ],
  },
  {
    element: null,
    children: [...homeRoutes],
  },
];

export const RootRouter = () => useRoutes(routes);

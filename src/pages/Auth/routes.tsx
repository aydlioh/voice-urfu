import { RouteObject } from 'react-router-dom';
import { LoginPage } from './ui';

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
];

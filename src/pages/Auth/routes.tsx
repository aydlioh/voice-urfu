import { RouteObject } from 'react-router-dom';
import { LoginPage, RegistrationPage } from './pages';

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
];

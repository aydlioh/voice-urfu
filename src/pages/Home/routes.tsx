import { RouteObject } from 'react-router-dom';
import { HomePage } from './ui';

export const homeRoutes: RouteObject[] = [
  {
    path: '',
    element: <HomePage />,
  },
];

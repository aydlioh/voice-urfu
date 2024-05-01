import { RouteObject } from 'react-router-dom';
import { MainPage } from './ui';

export const mainRoutes: RouteObject[] = [
  {
    path: '',
    element: <MainPage />,
  },
];

import { RouteObject } from 'react-router-dom';
import { MainPage } from './pages';

export const mainRoutes: RouteObject[] = [
  {
    path: '',
    element: <MainPage />,
  },
];

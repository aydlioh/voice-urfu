import { RouteObject } from 'react-router-dom';
import { NotFoundPage } from './pages';

export const errorsRoutes: RouteObject[] = [
  {
    path: '',
    children: [
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

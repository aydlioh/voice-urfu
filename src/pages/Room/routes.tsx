import { Navigate, RouteObject } from 'react-router-dom';
import { RoomPage } from './ui';

export const roomRoutes: RouteObject[] = [
  {
    path: 'room',
    children: [
      {
        path: '',
        element: <Navigate to={'/'} replace />,
      },
      {
        path: ':id',
        element: <RoomPage />,
      },
    ],
  },
];

import { RouteObject } from 'react-router-dom';
import { RoomPage, RoomsPage } from './ui';

export const roomsRoutes: RouteObject[] = [
  {
    path: 'rooms',
    children: [
      {
        path: '',
        element: <RoomsPage/>,
      },
      {
        path: ':id',
        element: <RoomPage />,
      },
    ],
  },
];

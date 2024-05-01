import { RouteObject } from 'react-router-dom';
import { RoomPage, RoomsPage } from './pages';

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

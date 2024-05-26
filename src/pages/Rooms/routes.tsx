import { RouteObject } from 'react-router-dom';
import { RoomPage, RoomsPage } from './pages';
import { GroupcallLayout } from '@/app/layout';

export const roomsRoutes: RouteObject[] = [
  {
    element: <GroupcallLayout/>,
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

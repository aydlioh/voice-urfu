import { NestedLayout } from '@/app/layout';
import { RouteObject } from 'react-router-dom';
import {
  AddFriendPage,
  FriendsPage,
  IncomingFriendPage,
  OutgoingFriendPage,
} from './pages';
import { friendsNestedSidebarLinks } from '@/shared/common/const/nestedLinks';

export const friendsRoutes: RouteObject[] = [
  {
    path: '/friends',
    element: <NestedLayout nestedLinks={friendsNestedSidebarLinks} />,
    children: [
      {
        path: '',
        element: <FriendsPage />,
      },
      {
        path: 'all',
        element: <FriendsPage />,
      },
      {
        path: 'add',
        element: <AddFriendPage />,
      },
      {
        path: 'incoming',
        element: <IncomingFriendPage />,
      },
      {
        path: 'outgoing',
        element: <OutgoingFriendPage />,
      },
    ],
  },
];

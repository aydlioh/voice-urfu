import { NestedLayout } from '@/app/layout';
import { RouteObject } from 'react-router-dom';
import {
  AddFriendPage,
  FriendsPage,
  IncomingFriendRequests,
  OutgoingFriendRequests,
} from './pages';
import { friendsNestedSidebarLinks } from '@/shared/const/nestedLinks';

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
        element: <IncomingFriendRequests />,
      },
      {
        path: 'outgoing',
        element: <OutgoingFriendRequests />,
      },
    ],
  },
];

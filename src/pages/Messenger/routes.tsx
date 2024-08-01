import { RouteObject } from 'react-router-dom';
import { EmptyChatPage, ChatPage, VideocallPage } from './pages';
import { MessengerLayout } from '@/app/layout';

export const messengerRoutes: RouteObject[] = [
  {
    element: <MessengerLayout />,
    path: 'messenger',
    children: [
      {
        path: '',
        element: <EmptyChatPage />,
      },
      {
        path: ':username',
        element: <ChatPage />,
      },
      {
        path: ':username/videocall',
        element: <VideocallPage />,
      },
    ],
  },
];

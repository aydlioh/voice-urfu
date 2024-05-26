import { RouteObject } from 'react-router-dom';
import { EmptyChatPage, ChatPage } from './pages';
import { MessengerLayout } from '@/app/layout';

export const messengerRoutes: RouteObject[] = [
  {
    element: <MessengerLayout/>,
    path: 'messenger',
    children: [
      {
        path: '',
        element: <EmptyChatPage/>,
      },
      {
        path: ':id',
        element: <ChatPage />,
      },
    ],
  },
];

import { RouteObject } from 'react-router-dom';
import { OverviewPage, WelcomePage } from './pages';
import GetStartedPage from './pages/GetStartedPage';

export const homeRoutes: RouteObject[] = [
  {
    path: '/welcome',
    element: <WelcomePage />,
  },
  {
    path: '/overview',
    element: <OverviewPage />,
  },
  {
    path: '/get-started',
    element: <GetStartedPage />,
  },
];

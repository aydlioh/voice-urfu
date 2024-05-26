import { RouteObject } from 'react-router-dom';
import { SettingsPage } from './pages';

export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: <SettingsPage />,
  },
];

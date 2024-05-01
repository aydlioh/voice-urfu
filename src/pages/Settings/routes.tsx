import { RouteObject } from 'react-router-dom';
import { SettingsPage } from './ui';

export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: <SettingsPage />,
  },
];

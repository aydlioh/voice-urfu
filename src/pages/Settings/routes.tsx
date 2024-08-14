import { NestedLayout } from '@/app/layout';
import { RouteObject } from 'react-router-dom';
import {
  CameraSettingsPage,
  EmptySettingsPage,
  MicrophoneSettingsPage,
  ProfileSettingsPage,
  SecuritySettingsPage,
  ThemeSettingsPage,
} from './pages';
import { settingsNestedSidebarLinks } from '@/shared/common/const/nestedLinks';

export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: (
      <NestedLayout
        backPath="/settings"
        nestedLinks={settingsNestedSidebarLinks}
        withLogout
      />
    ),
    children: [
      {
        path: '',
        element: <EmptySettingsPage />,
      },
      {
        path: 'microphone',
        element: <MicrophoneSettingsPage />,
      },
      {
        path: 'camera',
        element: <CameraSettingsPage />,
      },
      {
        path: 'security',
        element: <SecuritySettingsPage />,
      },
      {
        path: 'profile',
        element: <ProfileSettingsPage />,
      },
      {
        path: 'theme',
        element: <ThemeSettingsPage />,
      },
    ],
  },
];

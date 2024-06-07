import { lazy } from 'react';

export const EmptySettingsPage = lazy(() => import('./EmptySettingsPage'));

export * from './MicrophoneSettingsPage';
export * from './CameraSettingsPage';
export * from './SecuritySettingsPage';
export * from './ProfileSettingsPage';
export * from './ThemeSettingsPage';

import { lazy } from 'react';

export const EmptySettingsPage = lazy(() => import('./EmptySettingsPage'));
export const MicrophoneSettingsPage = lazy(() => import('./MicrophoneSettingsPage'));
export const CameraSettingsPage = lazy(() => import('./CameraSettingsPage'));
export const SecuritySettingsPage = lazy(() => import('./SecuritySettingsPage'));
export const ProfileSettingsPage = lazy(() => import('./ProfileSettingsPage'));
export const ThemeSettingsPage = lazy(() => import('./ThemeSettingsPage'));

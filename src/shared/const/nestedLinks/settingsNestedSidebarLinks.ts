import { SidebarLink } from "@/shared/types";

export const settingsNestedSidebarLinks: Omit<SidebarLink, 'icon'>[] = [
  {
    label: 'Микрофон',
    path: '/settings/microphone',
  },
  {
    label: 'Камера',
    path: '/settings/camera',
  },
  {
    label: 'Настройки конфиденциальности',
    path: '/settings/security',
  },
  {
    label: 'Настройки профиля',
    path: '/settings/profile',
  },
  {
    label: 'Тема',
    path: '/settings/theme',
  },
];

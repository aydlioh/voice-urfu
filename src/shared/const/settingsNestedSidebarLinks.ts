import { SidebarLink } from "../types";

export const settingsNestedSidebarLinks: Omit<SidebarLink, 'icon'>[] = [
  {
    label: 'Микрофон',
    path: 'microphone'
  },
  {
    label: 'Камера',
    path: 'camera'
  },
  {
    label: 'Настройки конфиденциальности',
    path: 'security'
  },
  {
    label: 'Настройки профиля',
    path: 'profile'
  },
  {
    label: 'Тема',
    path: 'theme'
  },
]
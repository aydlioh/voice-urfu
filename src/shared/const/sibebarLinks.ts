import { MdVideoChat } from 'react-icons/md';
import { FaUserFriends } from "react-icons/fa";
import { RiSettings5Fill } from 'react-icons/ri';
import { SidebarLink } from '../types';

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Комнаты',
    path: '/rooms',
    icon: MdVideoChat,
  },
  {
    label: 'Чаты',
    path: '/messenger',
    icon: FaUserFriends,
  },
  {
    label: 'Настройки',
    path: '/settings',
    icon: RiSettings5Fill,
  },
];

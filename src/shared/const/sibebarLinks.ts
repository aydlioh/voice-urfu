import { MdVideoChat } from 'react-icons/md';
import { FaUserFriends } from "react-icons/fa";
import { RiSettings5Fill } from 'react-icons/ri';

export const sidebarLinks = [
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

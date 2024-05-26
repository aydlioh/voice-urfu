import { MdVideoChat } from 'react-icons/md';
import { FaUserFriends } from "react-icons/fa";
import { RiSettings5Fill } from 'react-icons/ri';

export const sidebarLinks = [
  {
    name: 'Комнаты',
    path: '/rooms',
    icon: MdVideoChat,
  },
  {
    name: 'Чаты',
    path: '/messenger',
    icon: FaUserFriends,
  },
  {
    name: 'Настройки',
    path: '/settings',
    icon: RiSettings5Fill,
  },
];

import { MdVideoChat } from 'react-icons/md';
import { IoMail } from 'react-icons/io5';
import { RiSettings5Fill } from 'react-icons/ri';

export const sidebarLinks = [
  {
    name: 'Комнаты',
    path: '/rooms',
    icon: MdVideoChat,
  },
  {
    name: 'Чаты',
    path: '/chat',
    icon: IoMail,
  },
  {
    name: 'Настройки',
    path: '/settings',
    icon: RiSettings5Fill,
  },
];

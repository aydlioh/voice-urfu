import { MdVideoChat } from 'react-icons/md';
import { FaUserFriends } from "react-icons/fa";
import { RiSettings5Fill } from 'react-icons/ri';
import { IoChatboxEllipses } from "react-icons/io5";
import { SidebarLink } from '../types';

export const sidebarLinks: SidebarLink[] = [
  {
    label: 'Друзья',
    path: '/friends',
    icon: FaUserFriends,
  },
  {
    label: 'Комнаты',
    path: '/rooms',
    icon: MdVideoChat,
  },
  {
    label: 'Чаты',
    path: '/messenger',
    icon: IoChatboxEllipses,
  },
  {
    label: 'Настройки',
    path: '/settings',
    icon: RiSettings5Fill,
  },
];

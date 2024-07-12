import { SidebarLink } from "@/shared/types";

export const friendsNestedSidebarLinks: Omit<SidebarLink, 'icon'> [] = [
  {
    label: 'Все друзья',
    path: '/friends',
    otherPath: '/friends/all'
  },
  {
    label: 'Добавить друга',
    path: '/friends/add'
  },
  {
    label: 'Входящие заявки',
    path: '/friends/incoming'
  },
  {
    label: 'Исходящие заявки',
    path: '/friends/outgoing'
  },
]
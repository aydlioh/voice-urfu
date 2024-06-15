import { ChatItem, ChatSearch } from '@/features/messenger';
import { UserProps } from '@/shared/types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css';

const mock = [
  {
    id: 'aydlioh',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Pavel',
    lastMessage: '',
    lastMessageTime: '10:42',
  },
  {
    id: 'aydlioh1',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Pavel 2',
    lastMessage: '',
    lastMessageTime: '10:42',
  },
];

export const ChatList = ({ isChat = false }: { isChat?: boolean }) => {
  const navigate = useNavigate();

  const handleNavigate = (user: UserProps) => {
    navigate(`${user.id}`, {
      state: { user },
    });
  };

  return (
    <aside
      className={clsx(
        styles.chatSidebar,
        isChat && styles.active
      )}
    >
      <div className={styles.wrapper}>
        <ChatSearch />
        <ul className={styles.chatList}>
          {mock.map((user) => (
            <ChatItem onClick={handleNavigate} user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

import { ChatItem, ChatSearch } from '@/features/messenger';
import { UserProps } from '@/shared/types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css';

const mock = [
  {
    id: '1',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Panda',
    lastMessage: 'Привет, как дела?',
    lastMessageTime: '10:42',
  },
  {
    id: 'pavel',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Pavel',
    lastMessage: 'Привет! Да вроде норм',
    lastMessageTime: '10:42',
  },
  {
    id: '3',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Panda',
    lastMessage: 'А у иебя?',
    lastMessageTime: '10:42',
  },
  {
    id: '4',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Panda',
    lastMessage: 'Да тож норм',
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

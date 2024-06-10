import { UserProps } from '@/shared/types';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ui.module.css';

type Props = {
  user: UserProps;
  onClick: (user: UserProps) => void;
};

export const ChatItem = ({ user, onClick }: Props) => {
  const { id: currentId } = useParams();

  return (
    <li
      onClick={() => onClick(user)}
      className={clsx(
        styles.chatItemWrapper,
        currentId === user.id && styles.active
      )}
    >
      <div className={styles.innerWrapper}>
        <img
          src={user.imgSrc}
          alt="avatar"
          className={styles.userImg}
        />
        <div className={styles.userWrapper}>
          <p className={styles.name}>{user.name}</p>
          <div className={styles.lastMessageWrapper}>
            <p className={styles.message}>{user.lastMessage}</p>
            <p className={styles.time}>{user.lastMessageTime}</p>
          </div>
        </div>
      </div>
    </li>
  );
};

import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ChatItem.module.css';
import { IChat } from '@/entities/messenger';
import { useAuthStatus } from '@/entities/auth';
import { formatTime } from '@/shared/utils';

type Props = {
  data: IChat;
  onClick: (user: string) => void;
};

export const ChatItem = ({ data, onClick }: Props) => {
  const { login } = useAuthStatus();
  const { id, user, lastMessage } = data;
  const { username } = useParams();

  return (
    <li
      onClick={() => onClick(user)}
      className={clsx(
        styles.chatItemWrapper,
        username === id && styles.active
      )}
    >
      <div className={styles.innerWrapper}>
        <img
          src="https://avatars.mds.yandex.net/get-entity_search/44973/850162673/orig"
          alt="avatar"
          className={styles.userImg}
        />
        <div className={styles.userWrapper}>
          <p className={styles.name}>{user}</p>
          <div className={styles.lastMessageWrapper}>
            <p className={styles.message}>
              <span className='font-normal'>
                {login === lastMessage.sender ? 'Вы' : lastMessage.sender}:
              </span>{' '}
              {lastMessage.content}
            </p>
            <p className={styles.time}>
              {formatTime(lastMessage.timestamp)}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

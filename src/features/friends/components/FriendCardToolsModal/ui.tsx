import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css';
import { useDeleteFriend } from '@/entities/friends';
import clsx from 'clsx';

type Props = {
  withDelete: boolean;
  user: {
    username: string;
  };
};

export const FriendCardToolsModal = ({ user, withDelete }: Props) => {
  const { mutate } = useDeleteFriend();
  const navigate = useNavigate();

  const handleWrite = () => navigate(`/messenger/${user.username}`);
  const handleCall = () => navigate(`/messenger/${user.username}/videocall`);
  const handleDelete = () => mutate({ friend: user.username });

  return (
    <ul className={styles.modalWrapper}>
      <li onClick={handleWrite} className={styles.modalElement}>
        Написать
      </li>
      <li onClick={handleCall} className={styles.modalElement}>
        Позвонить
      </li>
      {withDelete && (
        <li
          onClick={handleDelete}
          className={clsx(styles.modalElement, 'w-[160px]')}
        >
          Удалить из друзей
        </li>
      )}
    </ul>
  );
};

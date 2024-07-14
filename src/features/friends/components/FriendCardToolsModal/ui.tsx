import { useClickOutside } from '@/shared/hooks';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css';
import { useDeleteFriend } from '@/entities/friends';
import clsx from 'clsx';

type Props = {
  close: () => void;
  isOpen: boolean;
  withDelete: boolean;
  user: {
    username: string;
  };
};

export const FriendCardToolsModal = ({
  close,
  isOpen,
  user,
  withDelete,
}: Props) => {
  const { mutate } = useDeleteFriend();
  const navigate = useNavigate();

  const handleWrite = () => navigate(`/messenger/${user.username}`);
  const handleCall = () => navigate(`/messenger/${user.username}/videocall`);
  const handleDelete = () => mutate({ friend: user.username });

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(close, modalRef, isOpen);

  return (
    <div ref={modalRef} className={styles.modalContainer}>
      <div className={styles.triangle} />
      <ul className={styles.wrapper}>
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
    </div>
  );
};

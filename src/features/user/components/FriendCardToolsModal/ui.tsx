import { useClickOutside } from '@/shared/hooks';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css';

type Props = {
  close: () => void;
  isOpen: boolean;
  user: {
    login: string;
  };
};

export const FriendCardToolsModal = ({ close, isOpen, user }: Props) => {
  const navigate = useNavigate();
  const handleWrite = () => navigate(`/messenger/${user.login}`);
  const handleCall = () => navigate(`/messenger/${user.login}/videocall`);

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
      </ul>
    </div>
  );
};

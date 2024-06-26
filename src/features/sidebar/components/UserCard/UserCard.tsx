import { AiFillEdit } from 'react-icons/ai';
import { Button } from '@/shared/ui';
import { TiUser } from 'react-icons/ti';
import { useModal } from '@/entities/modal';
import styles from './ui.module.css';

type Props = {
  user: {
    login: string;
    fullname: string;
    email: string;
  };
};

export const UserCard = ({ user }: Props) => {
  const { open } = useModal();

  return (
    <div className={styles.userCardContainer}>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.iconWrapper}>
            <TiUser className={styles.icon} />
          </div>
          <button className={styles.editBtn}>
            <AiFillEdit />
          </button>
        </div>
        <div className={styles.userInfoWrapper}>
          <div className={styles.userInfo}>
            <p className={styles.accentUserInfo}>Логин</p>
            <p>{user.login}</p>
          </div>
          <div className={styles.userInfo}>
            <p className={styles.accentUserInfo}>ФИО</p>
            <p>{user.fullname}</p>
          </div>
          <div className={styles.userInfo}>
            <p className={styles.accentUserInfo}>E-mail</p>
            <p>{user.email}</p>
          </div>
        </div>
        <Button onClick={open} className="w-full" color="primary">
          Сменить аккаунт
        </Button>
      </div>
    </div>
  );
};

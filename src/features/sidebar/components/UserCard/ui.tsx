import { AiFillEdit } from 'react-icons/ai';
import { Button } from '@/shared/ui';
import { TiUser } from 'react-icons/ti';
import { useModal } from '@/entities/modal';
import styles from './ui.module.css';
import { IUserInfo } from '@/entities/auth';

type Props = {
  user: IUserInfo;
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
        <Button onClick={open} className='w-full'>
          Сменить аккаунт
        </Button>
      </div>
    </div>
  );
};

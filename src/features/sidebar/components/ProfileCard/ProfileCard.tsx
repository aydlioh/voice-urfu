import { AiFillEdit } from 'react-icons/ai';
import { Button } from '@/shared/ui';
import { FaUser } from 'react-icons/fa';
import { useModal } from '@/entities/modal';
import { IUserInfo } from '@/entities/auth';
import styles from './ProfileCard.module.css';

type Props = {
  user: IUserInfo;
};

export const ProfileCard = ({ user }: Props) => {
  const { open } = useModal();

  return (
    <div className={styles.userCardContainer}>
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <div className={styles.iconWrapper}>
            <FaUser className={styles.icon} />
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

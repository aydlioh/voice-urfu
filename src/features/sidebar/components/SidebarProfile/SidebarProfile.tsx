import { useAuthStatus } from '@/entities/auth';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ProfileCard } from '../ProfileCard';
import styles from './SidebarProfile.module.css';

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const SidebarProfile = ({ isOpen, toggleSidebar }: Props) => {
  const user = useAuthStatus();
  const [isActive, setIsActive] = useState(false);

  const handleProfileToggle = () => {
    if (!isOpen) {
      toggleSidebar();
    }
    setIsActive((current: boolean) => !current);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
    }
  }, [isOpen]);

  return (
    <div className={clsx(isOpen && styles.profileActive)}>
      {isActive && <ProfileCard user={user} />}
      <div onClick={handleProfileToggle} className={styles.profileWrapper}>
        <div className={styles.userIconWrapper}>
          <FaUser
            className={clsx(styles.userIcon, isOpen && styles.userIconActive)}
          />
        </div>
        {isOpen && (
          <div className={styles.userInfoWrapper}>
            <p className={styles.userLogin}>{user.login}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

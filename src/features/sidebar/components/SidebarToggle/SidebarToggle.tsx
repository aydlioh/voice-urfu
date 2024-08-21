import { TfiMenuAlt } from 'react-icons/tfi';
import styles from './SidebarToggle.module.css';
import { Link } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const SidebarToggle = ({ isOpen, toggleSidebar }: Props) => {
  return (
    <div className={styles.toggleBtnWrapper}>
      <button onClick={toggleSidebar} className={styles.toggleBtn}>
        <TfiMenuAlt />
      </button>
      {isOpen && (
        <Link to={'/welcome'} className={styles.logo}>
          Voice
        </Link>
      )}
    </div>
  );
};

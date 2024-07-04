import styles from './ui.module.css';
import { TfiMenuAlt } from 'react-icons/tfi';

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
      {isOpen && <h1 className={styles.logo}>Voice</h1>}
    </div>
  );
};

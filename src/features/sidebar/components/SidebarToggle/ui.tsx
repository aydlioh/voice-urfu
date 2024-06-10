import { HiMenu } from 'react-icons/hi';
import { VoiceSvg } from '@/shared/assets/svgs';
import styles from './ui.module.css';

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const SidebarToggle = ({ isOpen, toggleSidebar }: Props) => {
  return (
    <div className={styles.toggleBtnWrapper}>
      <button onClick={toggleSidebar} className={styles.toggleBtn}>
        <HiMenu />
      </button>
      {isOpen && <img src={VoiceSvg} alt="Voice" />}
    </div>
  );
};

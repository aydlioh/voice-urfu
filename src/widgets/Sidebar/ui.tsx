import {
  SidebarContent,
  SidebarProfile,
  SidebarToggle,
} from '@/features/sidebar';
import { useState } from 'react';
import styles from './ui.module.css';
import clsx from 'clsx';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((current) => !current);
  };

  return (
    <aside
      className={clsx(styles.sidebar, isOpen ? styles.active : styles.disabled)}
    >
      <div className={styles.wrapper}>
        <div className={styles.innerWrapper}>
          <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <SidebarContent isOpen={isOpen} />
        </div>
        <SidebarProfile isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </aside>
  );
};

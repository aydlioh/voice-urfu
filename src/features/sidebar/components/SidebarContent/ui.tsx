import { sidebarLinks } from '@/shared/const';
import { SidebarLink } from '../SidebarLink';
import styles from './ui.module.css';

export const SidebarContent = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <nav>
      <ul className={styles.contentWrapper}>
        {sidebarLinks.map(({ path, icon, label }, index) => (
          <li key={index}>
            <SidebarLink
              isSidebarOpen={isOpen}
              to={path}
              Icon={icon}
              label={label}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

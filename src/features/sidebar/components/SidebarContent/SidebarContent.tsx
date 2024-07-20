import { sidebarLinks } from '@/shared/const';
import { SidebarLink } from '../SidebarLink';
import styles from './SidebarContent.module.css';

type Props = {
  isOpen: boolean;
  closeSidebar: () => void;
};

export const SidebarContent = ({ isOpen, closeSidebar }: Props) => {
  return (
    <nav>
      <ul className={styles.contentWrapper}>
        {sidebarLinks.map(({ path, icon, label }, index) => (
          <li key={index}>
            <SidebarLink
              closeSidebar={closeSidebar}
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

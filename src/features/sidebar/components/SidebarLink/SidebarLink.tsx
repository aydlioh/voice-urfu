import clsx from 'clsx';
import { IconType } from 'react-icons';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './SidebarLink.module.css';

type Props = NavLinkProps & {
  Icon: IconType;
  label: string;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
};

export const SidebarLink = ({
  Icon,
  label,
  isSidebarOpen,
  closeSidebar,
  ...props
}: Props) => {
  return (
    <NavLink
      {...props}
      onClick={closeSidebar}
      className={({ isActive }) =>
        clsx(styles.sidebarLink, isActive && styles.active)
      }
    >
      <div className={styles.linkIcon}>
        <Icon />
      </div>
      {isSidebarOpen && <span>{label}</span>}
    </NavLink>
  );
};

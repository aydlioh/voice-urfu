import clsx from 'clsx';
import { IconType } from 'react-icons';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './ui.module.css';

type Props = NavLinkProps & {
  Icon: IconType;
  label: string;
  isSidebarOpen: boolean;
};

export const SidebarLink = ({
  Icon,
  label,
  isSidebarOpen,
  ...props
}: Props) => {
  return (
    <NavLink
      {...props}
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

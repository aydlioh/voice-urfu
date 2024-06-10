import clsx from 'clsx';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './ui.module.css';

type Props = NavLinkProps & {
  label: string;
};

export const NestedSidebarLink = ({ label, ...props }: Props) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        clsx(styles.nestedSidebarLink, isActive && styles.active)
      }
    >
      {label}
    </NavLink>
  );
};

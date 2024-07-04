import clsx from 'clsx';
import { LinkProps, Link, useLocation } from 'react-router-dom';
import styles from './ui.module.css';

type Props = LinkProps & {
  label: string;
};

export const NestedSidebarLink = ({ label, ...props }: Props) => {
  const { pathname } = useLocation();
  const isActive = pathname === props.to;

  return (
    <Link
      {...props}
      className={clsx(styles.nestedSidebarLink, isActive && styles.active)}
    >
      {label}
    </Link>
  );
};

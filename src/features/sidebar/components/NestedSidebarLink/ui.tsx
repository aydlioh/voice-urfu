import { LinkProps, Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from '@/shared/hooks';
import clsx from 'clsx';
import styles from './ui.module.css';

type Props = LinkProps & {
  label: string;
  otherPath?: string;
};

export const NestedSidebarLink = ({
  label,
  to,
  otherPath,
  ...props
}: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width:768px)' });
  const { pathname } = useLocation();
  const path = otherPath && isMobile ? otherPath : to;

  const isActive = pathname === path;

  return (
    <Link
      {...props}
      to={path}
      className={clsx(styles.nestedSidebarLink, isActive && styles.active)}
    >
      {label}
    </Link>
  );
};

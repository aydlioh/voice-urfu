import { BackButton } from '@/features/sidebar';
import { PageSpinner } from '@/shared/ui';
import { NestedSidebar } from '@/widgets/main';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SidebarLink } from '@/shared/types';
import styles from './NestedLayout.module.css';
import clsx from 'clsx';

type Props = {
  backPath?: string;
  nestedLinks: Omit<SidebarLink, 'icon'>[];
  withLogout?: boolean;
};

export const NestedLayout = ({
  backPath,
  nestedLinks,
  withLogout = false,
}: Props) => {
  const { pathname } = useLocation();
  const isActive = pathname.slice(1).split('/').length > 1;

  return (
    <section className={styles.nestedContainer}>
      <NestedSidebar
        isActive={isActive}
        nestedLinks={nestedLinks}
        withLogout={withLogout}
      />
      <div className={clsx(styles.nestedWrapper, !isActive && styles.active)}>
        {backPath && (
          <BackButton
            to={backPath}
            className={clsx(styles.backBtn, 'absolute top-2 left-1')}
          />
        )}
        <Suspense fallback={<PageSpinner variant='sidebar' />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};

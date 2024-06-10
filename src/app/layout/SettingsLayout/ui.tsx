import { BackButton } from '@/features/sidebar';
import { settingsNestedSidebarLinks } from '@/shared/const/settingsNestedSidebarLinks';
import { PageSpinner } from '@/shared/ui';
import { NestedSidebar } from '@/widgets';
import clsx from 'clsx';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './ui.module.css';

export const SettingsLayout = () => {
  const { pathname } = useLocation();
  const isActive = pathname.slice(1).split('/').length > 1;

  return (
    <section className={styles.settingsContainer}>
      <NestedSidebar
        isActive={isActive}
        nestedLinks={settingsNestedSidebarLinks}
      />
      <div className={clsx(styles.settingsWrapper, !isActive && styles.active)}>
        <BackButton to="/settings" className={styles.backBtn} />
        <Suspense fallback={<PageSpinner variant="sidebar" />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};

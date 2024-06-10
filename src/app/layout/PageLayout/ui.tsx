import { Sidebar, PageInfo, Modal } from '@/widgets';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { PageSpinner } from '@/shared/ui';
import styles from './ui.module.css';

export const PageLayout = () => {
  return (
    <main className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.pageWrapper}>
        <PageInfo />
        <Suspense fallback={<PageSpinner variant="sidebar" />}>
          <Outlet />
        </Suspense>
      </div>
      <Modal />
    </main>
  );
};

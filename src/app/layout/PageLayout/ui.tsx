import { Sidebar, PageInfo, Modal, Notification } from '@/widgets';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { PageSpinner } from '@/shared/ui';
import styles from './ui.module.css';
import { useFriendsConnection } from '@/entities/user/hooks';
import { FriendsContext } from '@/entities/user';

export const PageLayout = () => {
  const { handleAccept, handleRefuse, handleRequest } = useFriendsConnection();

  return (
    <FriendsContext.Provider value={{ handleAccept, handleRefuse, handleRequest }}>
      <main className={styles.pageContainer}>
        <Sidebar />
        <div className={styles.pageWrapper}>
          <PageInfo />
          <Suspense fallback={<PageSpinner variant="sidebar" />}>
            <Outlet />
          </Suspense>
        </div>
        <Modal />
        <Notification />
      </main>
    </FriendsContext.Provider>
  );
};

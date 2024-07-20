import { Modal, PageInfo, Sidebar, Notification } from '@/widgets/main';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { PageSpinner } from '@/shared/ui';
import { useFriendsConnection } from '@/entities/friends';
import { FriendsContext } from '@/entities/friends';
import styles from './PageLayout.module.css';

export const PageLayout = () => {
  const { handleAccept, handleRefuse, handleRequest } = useFriendsConnection();

  return (
    <FriendsContext.Provider
      value={{ handleAccept, handleRefuse, handleRequest }}
    >
      <main className={styles.pageContainer}>
        <Sidebar />
        <div className={styles.pageWrapper}>
          <PageInfo />
          <Suspense fallback={<PageSpinner variant='sidebar' />}>
            <Outlet />
          </Suspense>
        </div>
        <Modal />
        <Notification />
      </main>
    </FriendsContext.Provider>
  );
};

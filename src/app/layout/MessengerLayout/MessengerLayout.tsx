import { Outlet, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { PageSpinner } from '@/shared/ui';
import { ChatSidebar } from '@/widgets/messenger';
import clsx from 'clsx';
import styles from './MessengerLayout.module.css';

export const MessengerLayout = () => {
  const { username } = useParams();

  return (
    <section className={styles.messengerContainer}>
      <ChatSidebar isChat={Boolean(username)} />
      <div className={clsx(styles.chatWrapper, !username && styles.active)}>
        <Suspense fallback={<PageSpinner variant="sidebar" />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};

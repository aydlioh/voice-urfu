import { Outlet, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { PageSpinner } from '@/shared/ui';
import { ChatList } from '@/widgets/messenger';
import clsx from 'clsx';
import styles from './MessengerLayout.module.css';

export const MessengerLayout = () => {
  const { id } = useParams();

  return (
    <section className={styles.messengerContainer}>
      <ChatList isChat={Boolean(id)} />
      <div className={clsx(styles.chatWrapper, !id && styles.active)}>
        <Suspense fallback={<PageSpinner variant='sidebar' />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};

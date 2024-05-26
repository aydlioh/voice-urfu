import { Outlet, useParams } from 'react-router-dom';
import { Suspense } from 'react';
import { PageSpinner } from '@/shared/ui';
import { Chats } from '@/widgets';
import clsx from 'clsx';

export const MessengerLayout = () => {
  const { id } = useParams();
  
  return (
    <section className='h-[calc(100%-40px)] flex flex-row'>
      <Chats isChat={Boolean(id)}/>
      <div className={clsx("w-full h-full", {'md:flex hidden' : !id})}>
        <Suspense fallback={<PageSpinner variant="sidebar" />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};

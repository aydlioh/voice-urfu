import { Sidebar, PageInfo } from '@/widgets';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { PageSpinner } from '@/shared/ui';

export const PageLayout = () => {
  return (
    <main className="h-screen flex flex-row">
      <Sidebar />
      <div className="md:pl-0 pl-16 w-full">
        <PageInfo />
        <Suspense fallback={<PageSpinner variant="sidebar" />}>
          <Outlet />
        </Suspense>
      </div>
    </main>
  );
};

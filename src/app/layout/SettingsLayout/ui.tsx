import { settingsNestedSidebarLinks } from '@/shared/const/settingsNestedSidebarLinks';
import { PageSpinner } from '@/shared/ui';
import { NestedSidebar } from '@/widgets';
import clsx from 'clsx';
import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const SettingsLayout = () => {
  const { pathname } = useLocation();
  const isActive = pathname.slice(1).split('/').length > 1;

  return (
    <section className="h-[calc(100%-40px)] flex flex-row">
      <NestedSidebar
        isActive={isActive}
        nestedLinks={settingsNestedSidebarLinks}
      />
      <div className={clsx('w-full h-full', { 'md:flex hidden': !isActive })}>
        <Suspense fallback={<PageSpinner variant="sidebar" />}>
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};

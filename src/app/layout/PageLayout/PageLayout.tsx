import { Sidebar } from '@/widgets/Sidebar';
import { Outlet } from 'react-router-dom';

export const PageLayout = () => {
  return (
    <main className="h-screen flex flex-row">
      <Sidebar />
      <div className="md:pl-0 pl-16 w-full">
        <Outlet />
      </div>
    </main>
  );
};

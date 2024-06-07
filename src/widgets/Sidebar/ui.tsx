import {
  SidebarContent,
  SidebarProfile,
  SidebarToggle,
} from '@/features/sidebar';
import { useState } from 'react';
import clsx from 'clsx';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((current) => !current);
  };

  return (
    <aside
      className={clsx(
        'bg-sidebar duration-200 overflow-hidden lg:relative fixed top-0 left-0 bottom-0 z-20',
        isOpen ? 'min-w-[300px] w-[300px]' : 'min-w-16 w-16'
      )}
    >
      <div className="h-full py-3 flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <SidebarToggle isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <SidebarContent isOpen={isOpen} />
        </div>
        <SidebarProfile isOpen={isOpen} toggleSidebar={toggleSidebar} />
      </div>
    </aside>
  );
};

import { Navbar, NavbarProfile, NavbarToggle } from '@/features';
import { useState } from 'react';
import clsx from 'clsx';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toogleSidebar = () => {
    setIsOpen((current) => !current);
  };

  return (
    <aside
      className={clsx(
        'bg-sidebar duration-200 overflow-hidden md:relative fixed top-0 left-0 bottom-0',
        isOpen ? 'min-w-[300px] w-[300px]' : 'min-w-16 w-16'
      )}
    >
      <div className="h-full py-3 flex flex-col justify-between">
        <div className="flex flex-col gap-10">
          <NavbarToggle isOpen={isOpen} toogleSidebar={toogleSidebar} />
          <Navbar isOpen={isOpen} />
        </div>
        <NavbarProfile isOpen={isOpen} />
      </div>
    </aside>
  );
};

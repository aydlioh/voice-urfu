import { sidebarLinks } from '@/shared/const';
import { SidebarLink } from '../SidebarLink';

export const SidebarContent = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <nav className="flex flex-col text-background text-[20px]">
      {sidebarLinks.map((link, index) => (
        <SidebarLink
          isSidebarOpen={isOpen}
          key={index}
          to={link.path}
          Icon={link.icon}
          label={link.label}
        />
      ))}
    </nav>
  );
};

import { sidebarLinks } from '@/shared/const';
import { SidebarLink } from '../SidebarLink';

export const SidebarContent = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <nav className="flex flex-col text-background text-[20px]">
      {sidebarLinks.map(({ path, icon, label }, index) => (
        <SidebarLink
          isSidebarOpen={isOpen}
          key={index}
          to={path}
          Icon={icon}
          label={label}
        />
      ))}
    </nav>
  );
};

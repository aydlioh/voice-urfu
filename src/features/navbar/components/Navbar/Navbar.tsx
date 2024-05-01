import { sidebarLinks } from '@/shared/const';
import { NavbarLink } from '../NavbarLink';

export const Navbar = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <nav className="flex flex-col text-background text-[20px]">
      {sidebarLinks.map((link, index) => (
        <NavbarLink
          isNavbarOpen={isOpen}
          key={index}
          to={link.path}
          Icon={link.icon}
          title={link.name}
        />
      ))}
    </nav>
  );
};

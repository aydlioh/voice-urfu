import clsx from 'clsx';
import { IconType } from 'react-icons';
import { NavLink, NavLinkProps } from 'react-router-dom';

type NavbarLinkProps = NavLinkProps & {
  Icon: IconType;
  title: string;
  isNavbarOpen: boolean;
};

export const NavbarLink = ({
  Icon,
  title,
  isNavbarOpen,
  ...props
}: NavbarLinkProps) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        clsx(
          'flex gap-4 py-3 duration-200 hover:bg-sidebarActiveHover px-4',
          isActive ? 'bg-sidebarActiveLink' : ''
        )
      }
    >
      <div className="text-[32px]">
        <Icon />
      </div>
      {isNavbarOpen && <span>{title}</span>}
    </NavLink>
  );
};

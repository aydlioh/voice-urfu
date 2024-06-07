import clsx from 'clsx';
import { IconType } from 'react-icons';
import { NavLink, NavLinkProps } from 'react-router-dom';

type Props = NavLinkProps & {
  Icon: IconType;
  label: string;
  isSidebarOpen: boolean;
};

export const SidebarLink = ({
  Icon,
  label,
  isSidebarOpen,
  ...props
}: Props) => {
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
      {isSidebarOpen && <span>{label}</span>}
    </NavLink>
  );
};

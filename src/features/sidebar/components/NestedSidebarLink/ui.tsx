import clsx from "clsx";
import { NavLink, NavLinkProps } from "react-router-dom";

type Props = NavLinkProps & {
  label: string;
};

export const NestedSidebarLink = ({ label, ...props }: Props) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        clsx(
          'flex gap-4 py-3 rounded-sm duration-200 hover:bg-background px-4',
          isActive ? 'bg-background' : ''
        )
      }
    >
      {label}
    </NavLink>
  );
};

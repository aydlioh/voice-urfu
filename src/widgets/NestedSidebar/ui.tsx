import { useModal } from '@/entities/modal';
import { NestedSidebarLink } from '@/features/sidebar';
import { NestedLink } from '@/shared/types';
import clsx from 'clsx';

type Props = {
  nestedLinks: NestedLink[];
  isActive: boolean;
};

export const NestedSidebar = ({ nestedLinks, isActive }: Props) => {
  const { open } = useModal();

  return (
    <aside
      className={clsx(
        'bg-sidebarNested md:max-w-[300px] w-full text-secondary',
        {
          'md:flex hidden': isActive,
        }
      )}
    >
      <div className="p-2 w-full">
        <ul className="py-1 flex flex-col gap-0.5 ">
          {nestedLinks.map((link, index) => (
            <NestedSidebarLink to={link.path} label={link.label} key={index} />
          ))}
          <li
            onClick={open}
            className="cursor-pointer rounded-sm flex gap-4 py-3 duration-200 hover:bg-background px-4"
          >
            Выйти из аккаунта
          </li>
        </ul>
      </div>
    </aside>
  );
};

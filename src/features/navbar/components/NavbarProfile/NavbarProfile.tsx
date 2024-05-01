import { useAuth } from '@/entities/auth';
import clsx from 'clsx';
import { TiUser } from 'react-icons/ti';

export const NavbarProfile = ({ isOpen }: { isOpen: boolean }) => {
  const { name, email } = useAuth();

  return (
    <div className="pt-3 px-4 flex gap-4">
      <div className="rounded-full bg-background self-end">
        <TiUser
          className={clsx(
            'duration-250 text-sidebar',
            isOpen ? 'text-[36px]' : 'text-[32px]'
          )}
        />
      </div>
      {isOpen && (
        <div className="flex flex-col">
          <p className="font-medium text-[20px] line-clamp-1">{name}</p>
          <p className="text-[14px] text-links line-clamp-1">{email}</p>
        </div>
      )}
    </div>
  );
};

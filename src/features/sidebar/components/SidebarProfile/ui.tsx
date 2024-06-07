import { useAuthStatus } from '@/entities/auth';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TiUser } from 'react-icons/ti';
import { AiFillEdit } from 'react-icons/ai';
import { Button } from '@/shared/ui';
import { useModal } from '@/entities/modal';

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const SidebarProfile = ({ isOpen, toggleSidebar }: Props) => {
  const { open } = useModal();
  const { login, email, fullname } = useAuthStatus();
  const [isActive, setIsActive] = useState(false);

  const handleProfileToggle = () => {
    if (!isOpen) {
      toggleSidebar();
    }
    setIsActive((current: boolean) => !current);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
    }
  }, [isOpen]);

  return (
    <div className={clsx(isOpen ? 'p-1' : '')}>
      {isActive && (
        <div className="w-full mb-3">
          <div className="bg-pageNested px-4 py-3 text-secondary rounded-md">
            <div className="flex justify-between items-center">
              <div className="rounded-full bg-background self-end">
                <TiUser
                  className={clsx(
                    'duration-250 text-sidebar',
                    isOpen ? 'text-[36px]' : 'text-[32px]'
                  )}
                />
              </div>
              <button className="sm:h-12 sm:w-12 h-10 w-10 flex justify-center items-center p-2 rounded-full hover:bg-page duration-200 cursor-pointer">
                <AiFillEdit className="text-[26px]" />
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-3 mb-6">
              <div className="flex flex-row gap-3">
                <p className="text-secondary/50">Логин</p>
                <p>{login}</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="text-secondary/50">ФИО</p>
                <p>{fullname}</p>
              </div>
              <div className="flex flex-row gap-3">
                <p className="text-secondary/50">E-mail</p>
                <p>{email}</p>
              </div>
            </div>
            <Button onClick={open} className="w-full" color="primary">
              Сменить аккаунт
            </Button>
          </div>
        </div>
      )}
      <div
        onClick={handleProfileToggle}
        className="py-3 px-4 flex items-center gap-4 hover:bg-primary/10 cursor-pointer rounded-md"
      >
        <div className="rounded-full bg-background">
          <TiUser
            className={clsx(
              'duration-250 text-sidebar',
              isOpen ? 'text-[36px]' : 'text-[32px]'
            )}
          />
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <p className="font-medium text-[20px] line-clamp-1">{login}</p>
            <p className="text-[14px] text-links line-clamp-1">{email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

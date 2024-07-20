import { Spinner } from '@/shared/ui';
import { useState } from 'react';
import { MdPersonAddAlt1 } from 'react-icons/md';
import clsx from 'clsx';

type Props = {
  onClick: () => void;
};

export const FriendAddButton = ({ onClick }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    onClick();
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <button
      onClick={clickHandler}
      disabled={isLoading}
      className={clsx(
        'flex justify-center items-center p-2.5 rounded-full duration-200 sm:text-[26px] text-[20px] text-green-700',
        !isLoading && 'hover:bg-green-700/10'
      )}
    >
      {isLoading ? <Spinner label='' size='sm' /> : <MdPersonAddAlt1 />}
    </button>
  );
};

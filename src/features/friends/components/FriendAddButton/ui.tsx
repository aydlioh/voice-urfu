import { Spinner } from '@/shared/ui';
import clsx from 'clsx';
import { useState } from 'react';
import { MdPersonAddAlt1 } from 'react-icons/md';

type Props = {
  handleRequest: () => void;
};

export const FriendAddButton = ({ handleRequest }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const requestHandler = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleRequest();
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <button
      onClick={requestHandler}
      disabled={isLoading}
      className={clsx(
        'flex justify-center items-center p-2 rounded-full duration-200 sm:text-[26px] text-[24px] text-green-700',
        !isLoading && 'hover:bg-green-700/10'
      )}
    >
      {isLoading ? <Spinner label='' size='sm' /> : <MdPersonAddAlt1 />}
    </button>
  );
};

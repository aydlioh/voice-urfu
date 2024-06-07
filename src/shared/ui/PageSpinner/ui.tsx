import clsx from 'clsx';
import { Spinner } from '../Spinner';

export const PageSpinner = ({ variant }: { variant: 'screen' | 'sidebar' }) => {
  return (
    <div
      className={clsx(
        'flex justify-center items-center',
        variant === 'screen' ? 'w-screen h-[calc(100vh-40px)]' : 'w-full h-[calc(100%-40px)]'
      )}
    >
      <Spinner />
    </div>
  );
};

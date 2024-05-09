import clsx from 'clsx';
import { Spinner } from '../Spinner';

export const PageSpinner = ({ variant }: { variant: 'screen' | 'sidebar' }) => {
  return (
    <div
      className={clsx(
        'flex justify-center items-center',
        variant === 'screen' ? 'w-screen h-screen' : 'w-full h-full'
      )}
    >
      <Spinner />
    </div>
  );
};

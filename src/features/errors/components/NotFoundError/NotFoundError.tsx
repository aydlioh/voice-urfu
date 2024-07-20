import clsx from 'clsx';

type Props = {
  message: string;
  containerClassName?: string;
};

export const NotFoundError = ({ message, containerClassName }: Props) => {
  return (
    <div
      className={clsx(
        'h-[calc(100vh-240px)] flex justify-center items-center',
        containerClassName
      )}
    >
      <div className='flex flex-col items-center'>
        <h2 className='font-minecraft text-accent text-[28px]'>
          404
        </h2>
        <p className='text-[14px] text-secondary/60'>{message}</p>
      </div>
    </div>
  );
};

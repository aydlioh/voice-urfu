import { PandaSleepSvg } from '@/shared/assets/svgs';
import { forwardRef } from 'react';

type Props = { name?: string; isReady?: boolean };

export const UserVideo = forwardRef(
  (
    { name, isReady = true }: Props,
    ref: React.ForwardedRef<HTMLVideoElement>
  ) => {
    if (!isReady) {
      return (
        <div className="flex justify-center items-center rounded-lg h-full min-h-[300px] overflow-hidden relative group lg:w-1/2 w-full bg-page">
          <div className='flex justify-center items-center flex-col gap-3'>
            <img src={PandaSleepSvg} alt="sleep" className="w-[350px]" />
            <h3 className='font-minecraft'>Ваш собеседник ещё не подключился...</h3>
          </div>
        </div>
      );
    }

    return (
      <div className="rounded-lg min-h-[300px] overflow-hidden relative group lg:w-1/2 w-full bg-page">
        {name && (
          <div className="sm:group-hover:block sm:hidden text-[16px] absolute bottom-2 right-2 bg-background bg-opacity-40 px-4 py-1.5 rounded-md">
            <p>{name}</p>
          </div>
        )}
        <video autoPlay playsInline muted ref={ref} className="w-full h-full" />
      </div>
    );
  }
);

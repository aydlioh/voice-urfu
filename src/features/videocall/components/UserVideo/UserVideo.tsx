import { forwardRef } from 'react';

type Props = { name?: string; };

export const UserVideo = forwardRef(
  (
    { name }: Props,
    ref: React.ForwardedRef<HTMLVideoElement>
  ) => {
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

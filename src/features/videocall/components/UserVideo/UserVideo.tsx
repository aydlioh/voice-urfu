import { forwardRef } from "react";

export const UserVideo = forwardRef(
  (props: { name?: string }, ref: React.ForwardedRef<HTMLVideoElement>) => {
    return (
      <div className="rounded-lg h-full overflow-hidden relative group lg:w-1/2 w-full bg-page">
        {props.name && (
          <div className="sm:group-hover:block sm:hidden text-[16px] absolute bottom-2 right-2 bg-background bg-opacity-40 px-4 py-1.5 rounded-md">
            <p>{props.name}</p>
          </div>
        )}
        <video autoPlay playsInline muted ref={ref} className="w-full h-full" />
      </div>
    );
  }
);
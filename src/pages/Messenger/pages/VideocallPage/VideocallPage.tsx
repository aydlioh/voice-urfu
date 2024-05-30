import { VideocallTools } from '@/widgets';
import { useVideocall } from '@/entities/messenger';
import { UserVideo } from '@/features/videocall';

export const VideocallPage = () => {
  const { user, opponent, userVideo, opponentVideo } = useVideocall();

  return (
    <section className="max-w-[1050px] px-4 text-primaryText mx-auto">
      <div className="h-[calc(100vh-40px)] w-full flex flex-col justify-center items-center relative">
        <div className="w-full flex lg:flex-row flex-col justify-center items-center gap-4">
          <UserVideo ref={userVideo} name={user} />
          <UserVideo ref={opponentVideo} name={opponent} />
        </div>
        <VideocallTools />
      </div>
    </section>
  );
};

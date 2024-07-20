import { FriendCard, FriendCardTool } from '@/features/friends';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoChatboxEllipses } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { IFriend } from '@/entities/friends';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  data: any;
};

export const FriendList = ({ data }: Props) => {
  const navigate = useNavigate();
  const handleWrite = (user: string) => navigate(`/messenger/${user}`);
  const handleCall = (user: string) => navigate(`/messenger/${user}/videocall`);

  return (
    <ul className='flex flex-col gap-1 overflow-y-auto h-[calc(100vh-200px)] pr-1.5 rounded-scroll'>
      {data?.map((user: IFriend, index: number) => (
        <FriendCard
          withDelete
          key={index}
          user={user}
          endContent={
            <div className='sm:flex flex-row gap-1 hidden'>
              <FriendCardTool
                onClick={() => handleWrite(user.username)}
                Icon={IoChatboxEllipses}
              />
              <FriendCardTool
                onClick={() => handleCall(user.username)}
                Icon={BsTelephoneFill}
              />
            </div>
          }
        />
      ))}
    </ul>
  );
};

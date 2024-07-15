import { useFriendsContext } from '@/entities/friends';
import { IUser } from '@/entities/users';
import {
  FriendAddButton,
  FriendCard,
  FriendCardTool,
} from '@/features/friends';
import { MdPersonRemoveAlt1 } from 'react-icons/md';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  data: any;
};

export const IncomingFriendList = ({ data }: Props) => {
  const { handleAccept, handleRefuse } = useFriendsContext();

  return (
    <ul className='flex flex-col gap-1 overflow-y-auto h-[calc(100vh-130px)] pr-1.5 rounded-scroll'>
      {data.map((user: IUser, index: number) => (
        <FriendCard
          key={index}
          user={user}
          endContent={
            <div className='flex flex-row sm:gap-1'>
              <FriendAddButton onClick={handleAccept} />
              <FriendCardTool
                onClick={handleRefuse}
                Icon={MdPersonRemoveAlt1}
              />
            </div>
          }
        />
      ))}
    </ul>
  );
};

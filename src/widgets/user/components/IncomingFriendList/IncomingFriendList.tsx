import { useFriendsContext } from '@/entities/friends';
import { IUser } from '@/entities/users';
import {
  FriendAddButton,
  FriendCard,
  FriendCardTool,
} from '@/features/friends';
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdPersonRemoveAlt1 } from 'react-icons/md';

type Props = {
  data: IUser[];
};

export const IncomingFriendList = ({ data }: Props) => {
  const [isAccept, setIsAccept] = useState(false);
  const { handleAccept, handleRefuse } = useFriendsContext();

  const acceptHandler = (username: string) => {
    handleAccept(username);
    setIsAccept(true);
  };

  return (
    <ul className="flex flex-col gap-1 overflow-y-auto h-[calc(100vh-130px)] pr-1.5 rounded-scroll">
      {data.map((user: IUser, index: number) => (
        <FriendCard
          key={index}
          user={user}
          endContent={
            <div className="flex flex-row sm:gap-1">
              {isAccept ? (
                <FriendCardTool Icon={FaCheck} />
              ) : (
                <FriendAddButton onClick={() => acceptHandler(user.username)} />
              )}
              <FriendCardTool
                onClick={() => handleRefuse(user.username)}
                Icon={MdPersonRemoveAlt1}
              />
            </div>
          }
        />
      ))}
    </ul>
  );
};

import { FriendCard, FriendCardTool } from '@/features/friends';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoChatboxEllipses } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { IFriend } from '@/entities/friends';
import { InfiniteData } from '@tanstack/react-query';
import { Fragment, memo } from 'react';
import { useObserver } from '@/shared/hooks';
import { Spinner } from '@/shared/ui';

type Props = {
  data?: InfiniteData<IFriend[], unknown>;
  isFetching: boolean;
  hasNext: boolean;
  fetchNext: () => Promise<unknown>;
};

export const FriendList = memo(({ data, fetchNext, isFetching, hasNext }: Props) => {
  const observerRef = useObserver(fetchNext);
  
  const navigate = useNavigate();
  const handleWrite = (user: string) => navigate(`/messenger/${user}`);
  const handleCall = (user: string) => navigate(`/messenger/${user}/videocall`);

  return (
    <ul className="flex flex-col gap-1 overflow-y-auto h-[calc(100vh-200px)] pr-1.5 rounded-scroll">
      {data?.pages.map((group: IFriend[], index: number) => (
        <Fragment key={index}>
          {group.map((friend: IFriend, userIndex: number) => (
            <FriendCard
              withDelete
              key={userIndex}
              user={friend}
              endContent={
                <div className="sm:flex flex-row gap-1 hidden">
                  <FriendCardTool
                    onClick={() => handleWrite(friend.username)}
                    Icon={IoChatboxEllipses}
                  />
                  <FriendCardTool
                    onClick={() => handleCall(friend.username)}
                    Icon={BsTelephoneFill}
                  />
                </div>
              }
            />
          ))}
        </Fragment>
      ))}
      {isFetching && (
        <li className="w-full flex justify-center items-center py-14">
          <Spinner />
        </li>
      )}
      {hasNext && <li ref={observerRef} />}
    </ul>
  );
});

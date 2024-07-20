import { IUser } from '@/entities/users';
import { Fragment } from 'react';
import { useObserver } from '@/shared/hooks/useObserver';
import { Spinner } from '@/shared/ui';
import { InfiniteData } from '@tanstack/react-query';
import { useFriendsContext } from '@/entities/friends';
import { FriendAddButton, FriendCard } from '@/features/friends';

type Props = {
  data?: InfiniteData<IUser[], unknown>;
  isFetching: boolean;
  hasNext: boolean;
  fetchNext: () => Promise<unknown>;
};

export const UserList = ({ data, fetchNext, isFetching, hasNext }: Props) => {
  const { handleRequest } = useFriendsContext();
  const observerRef = useObserver(fetchNext);

  return (
    <ul className='flex flex-col gap-1 overflow-y-auto sm:h-[calc(100vh-280px)] h-[calc(100vh-238px)] pr-1.5 rounded-scroll'>
      {data?.pages.map((group: IUser[], index: number) => (
        <Fragment key={index}>
          {group.map((user: IUser, userIndex: number) => (
            <FriendCard
              key={user.id || userIndex}
              user={user}
              endContent={
                <FriendAddButton onClick={() => handleRequest(user.username)} />
              }
            />
          ))}
        </Fragment>
      ))}
      {isFetching && (
        <li className='w-full flex justify-center items-center py-14'>
          <Spinner label='' />
        </li>
      )}
      {hasNext && <li ref={observerRef} />}
    </ul>
  );
};

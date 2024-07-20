import { IUser } from '@/entities/users';
import { FriendCard } from '@/features/friends';
import { Button } from '@/shared/ui';

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  data: any;
};

export const OutgoingFriendList = ({ data }: Props) => {
  return (
    <ul className='flex flex-col gap-1 overflow-y-auto h-[calc(100vh-130px)] pr-1.5 rounded-scroll'>
      {data.map((user: IUser, index: number) => (
        <FriendCard
          key={index}
          user={user}
          endContent={
            <Button
              color='secondary'
              size='md'
              className='uppercase text-[12px] rounded-md'
            >
              Отменить заявку
            </Button>
          }
        />
      ))}
    </ul>
  );
};

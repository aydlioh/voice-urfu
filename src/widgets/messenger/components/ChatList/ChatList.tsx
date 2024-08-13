import { ChatItem } from '@/features/messenger';
import { useNavigate } from 'react-router-dom';
import { IChat } from '@/entities/messenger';
import styles from './ChatList.module.css';
import { Fragment, memo } from 'react';
import { InfiniteData } from '@tanstack/react-query';
import { Button, Spinner } from '@/shared/ui';
import { useObserver } from '@/shared/hooks';
import { FaUsers } from 'react-icons/fa';

type Props = {
  data?: InfiniteData<IChat[], unknown>;
  isFetchingNext: boolean;
  hasNext: boolean;
  fetchNext: () => Promise<unknown>;
};

export const ChatList = memo(
  ({ data, fetchNext, isFetchingNext, hasNext }: Props) => {
    const observerRef = useObserver(fetchNext);
    const navigate = useNavigate();

    const handleNavigate = (user: string) => {
      navigate(`${user}`, {
        state: { user },
      });
    };

    return (
      <ul className={styles.chatList}>
        {data?.pages[0].length ? (
          data?.pages.map((group: IChat[], index: number) => (
            <Fragment key={index}>
              {group.map((item) => (
                <ChatItem onClick={handleNavigate} data={item} key={item.id} />
              ))}
            </Fragment>
          ))
        ) : (
          <div>
            <div className="flex flex-col items-center mt-8">
              <h2 className="text-[70px]">
                <FaUsers />
              </h2>
              <p className="text-[16px] text-secondary/60 mb-4">
                Список друзей пуст!
              </p>
              <Button
                size="md"
                onClick={() => navigate('/friends/add')}
              >
                Добавить друга
              </Button>
            </div>
          </div>
        )}
        {isFetchingNext && (
          <li className="w-full flex justify-center items-center py-14">
            <Spinner />
          </li>
        )}
        {hasNext && <li ref={observerRef} />}
      </ul>
    );
  }
);

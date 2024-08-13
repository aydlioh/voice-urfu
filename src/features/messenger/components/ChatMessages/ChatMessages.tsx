import { IMessage } from '@/entities/messenger';
import { ChatMessage } from '@/features/messenger';
import { Spinner } from '@/shared/ui';
import styles from './ChatMessages.module.css';
import { InfiniteData } from '@tanstack/react-query';
import { Fragment } from 'react';
import { useObserver } from '@/shared/hooks';

type ChatMessagesProps = {
  data?: InfiniteData<IMessage[], unknown>;
  currentUser: string;
  isFetching: boolean;
  isFetchingNext: boolean;
  hasNext: boolean;
  fetchNext: () => Promise<unknown>;
};

export const ChatMessages = ({
  data,
  currentUser,
  isFetching,
  hasNext,
  fetchNext,
  isFetchingNext,
}: ChatMessagesProps) => {
  const observerRef = useObserver(fetchNext);

  if (isFetching) {
    return (
      <div className={styles.chatSpinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.chatWrapper}>
      <ul className={styles.messagesWrapper}>
        {data?.pages.map((group: IMessage[], index: number) => (
          <Fragment key={index}>
            {group.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                currentUser={currentUser}
              />
            ))}
          </Fragment>
        ))}
        {isFetchingNext && (
          <li className="w-full flex justify-center items-center">
            <Spinner />
          </li>
        )}
        {hasNext && <li ref={observerRef} />}
      </ul>
    </div>
  );
};

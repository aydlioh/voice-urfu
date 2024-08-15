import { useChats } from '@/entities/messenger';
import clsx from 'clsx';
import { useState } from 'react';
import { SearchInput, Spinner } from '@/shared/ui';
import { ChatList } from '../ChatList';
import styles from './ChatSidebar.module.css';

export const ChatSidebar = ({ isChat = false }: { isChat?: boolean }) => {
  const [search, setSearch] = useState<string| null>('');
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useChats(search);

  return (
    <aside className={clsx(styles.chatSidebar, isChat && styles.active)}>
      <div className={styles.wrapper}>
        <SearchInput
          setDebounceValue={setSearch}
          placeholder="Имя пользователя"
        />
        {isLoading ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <ChatList
            data={data}
            isFetchingNext={isFetchingNextPage}
            hasNext={hasNextPage}
            fetchNext={fetchNextPage}
          />
        )}
      </div>
    </aside>
  );
};

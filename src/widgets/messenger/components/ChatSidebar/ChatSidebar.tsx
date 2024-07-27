import { useChats } from '@/entities/messenger';
import clsx from 'clsx';
import { useState } from 'react';
import { useDebounce } from '@/shared/hooks';
import { SearchInput, Spinner } from '@/shared/ui';
import { ChatList } from '../ChatList';
import styles from './ChatSidebar.module.css';

export const ChatSidebar = ({ isChat = false }: { isChat?: boolean }) => {
  const [search, setSearch] = useState('');
  const debounceQuery = useDebounce(search, 300);
  const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
    useChats(debounceQuery);

  return (
    <aside className={clsx(styles.chatSidebar, isChat && styles.active)}>
      <div className={styles.wrapper}>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
          isClearable={false}
          placeholder="Имя пользователя"
        />
        {isLoading ? (
          <div className="w-full h-[250px] flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <ChatList
            data={data}
            isFetching={!isLoading && isFetching}
            hasNext={hasNextPage}
            fetchNext={fetchNextPage}
          />
        )}
      </div>
    </aside>
  );
};

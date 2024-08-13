import { UserList } from '@/widgets/user';
import { FetchError } from '@/features/errors';
import { useUserList } from '@/entities/users';
import { SearchInput, Spinner } from '@/shared/ui';
import { useState } from 'react';
import { useDebounce } from '@/shared/hooks';
import styles from './AddFriendPage.module.css';

export const AddFriendPage = () => {
  const [search, setSearch] = useState<string | null>(null);
  const debounceQuery = useDebounce(search, 300);
  const { data, isError, isLoading,  hasNextPage, fetchNextPage, isFetchingNextPage } =
    useUserList(debounceQuery);

  if (isError) {
    return <FetchError message='Ошибка получения списка пользователей' />;
  }

  return (
    <section className={styles.container}>
      <div>
        <div className='flex flex-col xl:items-start items-center gap-5 pt-5 sm:pb-5 pb-0'>
          <h2 className='font-minecraft xl:text-[30px] lg:text-[26px] sm:text-[22px] text-[20px]'>
            Введите имя друга
          </h2>
          <div className='max-w-[450px] sm:px-0 px-1.5 w-full'>
            <SearchInput
              value={search ? search : ''}
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch(null)}
              isClearable={false}
              placeholder='ФИО / Логин'
              color='secondary'
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className='sm:h-[calc(100vh-280px)] h-[calc(100vh-238px)] w-full flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div className='overflow-hidden'>
          <h4 className='sm:text-[18px] pb-6 pt-5 xl:pl-0 pl-6'>
            Найдено пользователей — {data?.totalCount || 0}
          </h4>
          <UserList
            data={data}
            isFetchingNext={isFetchingNextPage}
            hasNext={hasNextPage}
            fetchNext={fetchNextPage}
          />
        </div>
      )}
    </section>
  );
};

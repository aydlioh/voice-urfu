import { FriendList } from '@/widgets/user';
import { FetchError } from '@/features/errors';
import { IFriend } from '@/entities/friends';
import { SearchInput, Spinner } from '@/shared/ui';
import { useState } from 'react';
import styles from './ui.module.css';

const mockUsers: IFriend[] = [
  {
    id: 1,
    username: 'Ivan777',
    fullname: 'Иванов Иван',
  },
  {
    id: 2,
    username: 'Stepashka',
    fullname: 'Степан Степанов',
  },
  {
    id: 3,
    username: 'Olga_Sokol',
    fullname: 'Ольга Соколова',
  },
  {
    id: 4,
    username: 'Timamakar',
    fullname: 'Тимофей Макаров',
  },
];

export const FriendsPage = () => {
  const [search, setSearch] = useState<string | null>(null);
  const mockIsError = false;
  const mockIsLoading = false;
  const mockCount = 4;

  if (mockIsError) {
    return <FetchError message='Ошибка получения списка друзей' />;
  }

  return (
    <section className={styles.container}>
      <div className='flex flex-row justify-end pt-5'>
        <SearchInput
          color='secondary'
          className='md:max-w-[400px]'
          placeholder='Найти друга'
          value={search ? search : ''}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>
      {mockIsLoading ? (
        <div className='h-[calc(100vh-160px)] w-full flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div className='overflow-hidden'>
          <h4 className='sm:text-[18px] pb-6 pt-5 md:pl-0 pl-6'>
            Друзей в списке — {mockCount}
          </h4>
          <FriendList data={mockUsers} />
        </div>
      )}
    </section>
  );
};

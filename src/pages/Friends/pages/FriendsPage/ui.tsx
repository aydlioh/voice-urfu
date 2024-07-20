import { FriendList } from '@/widgets/user';
import { FetchError } from '@/features/errors';
import { useFriends } from '@/entities/friends';
import { Button, SearchInput, Spinner } from '@/shared/ui';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css';

export const FriendsPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string | null>(null);
  const { data, isError, isLoading } = useFriends();
  const mockCount = 4;

  if (isError) {
    return <FetchError message="Ошибка получения списка друзей" />;
  }

  return (
    <section className={styles.container}>
      <div className="flex flex-row justify-end pt-5">
        <SearchInput
          color="secondary"
          className="md:max-w-[400px]"
          placeholder="Найти друга"
          value={search ? search : ''}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>
      {isLoading ? (
        <div className="h-[calc(100vh-160px)] w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="overflow-hidden">
          <h4 className="sm:text-[18px] pb-6 pt-5 xl:pl-0 pl-6">
            Друзей в списке — {mockCount}
          </h4>
          {data?.length ? (
            <FriendList data={data} />
          ) : (
            <div className="h-[calc(100vh-240px)] flex justify-center items-center">
              <div className="flex flex-col items-center">
                <h2 className="text-[100px]">
                  <FaUsers />
                </h2>
                <p className="text-[16px] text-secondary/60 mb-4">
                  Список друзей пуст!
                </p>
                <Button size='md' color="secondary" onClick={() => navigate('/friends/add')}>
                  Добавить друга
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

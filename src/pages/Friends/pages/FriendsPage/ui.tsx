import { useUserList } from '@/entities/user';
import { SearchInput, Spinner } from '@/shared/ui';

export const FriendsPage = () => {
  const { users, setSearch, search, isLoading, isError } = useUserList();

  if (isError) {
    return (
      <section className='h-[calc(100vh-40px)] flex justify-center items-center'>
        <div className='flex flex-col items-center'>
          <h2 className='font-minecraft text-rose-500 text-[22px]'>Fetch Error</h2>
          <p className='text-[14px] text-secondary/60'>Ошибка получения списка друзей</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div>
        <div className="bg-page p-1.5">
          <SearchInput
            placeholder="Имя пользователя"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch('')}
          />
        </div>
        {isLoading ? (
          <div className="h-[calc(100vh-160px)] w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <ul>
              {users?.map((user: any, index: number) => (
                <li key={index}>{user.username}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

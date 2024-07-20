import { FetchError, NotFoundError } from '@/features/errors';
import { Spinner } from '@/shared/ui';
import { IncomingFriendList } from '@/widgets/user';
import { useFriendRequest } from '@/entities/friends';
import styles from './IncomingFriendPage.module.css';

export const IncomingFriendPage = () => {
  const { isLoading, isError, data } = useFriendRequest({
    belonging: 'receiver',
    type: 'pending',
  });

  if (isError) {
    return <FetchError message='Ошибка получения входящих заявок' />;
  }

  if (isLoading) {
    return (
      <div className='h-[calc(100vh-40px)] w-full flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className='overflow-hidden'>
        <h4 className='sm:text-[18px] pb-6 pt-5 xl:pl-0 pl-6'>
          Входящих заявок — {data?.length}
        </h4>
        {data?.length ? (
          <IncomingFriendList data={data} />
        ) : (
          <NotFoundError message='Входящие заявки не найдены!' />
        )}
      </div>
    </section>
  );
};

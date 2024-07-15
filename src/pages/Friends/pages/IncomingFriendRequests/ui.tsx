import { FetchError, NotFoundError } from '@/features/errors';
import { Spinner } from '@/shared/ui';
import { IncomingFriendList } from '@/widgets/user';
import styles from './ui.module.css';
import { useFriendRequest } from '@/entities/friends';

export const IncomingFriendRequests = () => {
  const { isLoading, isError, data } = useFriendRequest({
    belonging: 'receiver',
    type: 'pending',
  });

  if (isError) {
    return <FetchError message='Ошибка получения исходящих заявок' />;
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
        <h4 className='sm:text-[18px] pb-6 pt-5 md:pl-0 pl-6'>
          Входящих заявок — {data?.length}
        </h4>
        {data?.length ? (
          <IncomingFriendList data={data} />
        ) : (
          <NotFoundError message='Исходящие заявки не найдены!' />
        )}
      </div>
    </section>
  );
};

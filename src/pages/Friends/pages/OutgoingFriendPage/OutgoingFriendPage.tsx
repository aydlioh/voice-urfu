import { OutgoingFriendList } from '@/widgets/user';
import { useFriendRequest } from '@/entities/friends';
import { FetchError, NotFoundError } from '@/features/errors';
import { RequestSwitcher } from '@/features/friends';
import { Spinner } from '@/shared/ui';
import { useState } from 'react';
import styles from './OutgoingFriendPage.module.css';

export const OutgoingFriendPage = () => {
  const [selected, setSelected] = useState<'pending' | 'accepted' | 'refused'>(
    'pending'
  );

  const { isLoading, isError, data } = useFriendRequest({
    belonging: 'sender',
    type: selected,
  });

  if (isError) {
    return <FetchError message='Ошибка получения исходящих заявок' />;
  }

  return (
    <section className={styles.container}>
      <RequestSwitcher selected={selected} setSelected={setSelected} />
      {isLoading ? (
        <div className='h-[calc(100vh-40px)] w-full flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div className='overflow-hidden'>
          <h4 className='sm:text-[18px] pb-6 pt-5 xl:pl-0 pl-6'>
            {selected === 'pending'
              ? 'Ожидающих'
              : selected === 'accepted'
              ? 'Принятых'
              : 'Отклоненных'}{' '}
            заявок — {data?.length}
          </h4>
          {data?.length ? (
            <OutgoingFriendList data={data} />
          ) : (
            <NotFoundError message='Исходящие заявки не найдены!' />
          )}
        </div>
      )}
    </section>
  );
};

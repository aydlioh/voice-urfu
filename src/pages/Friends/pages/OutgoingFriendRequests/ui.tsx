import { useFriendRequest } from '@/entities/friends';
import { FetchError, NotFoundError } from '@/features/errors';
import { Spinner, Tabs } from '@/shared/ui';
import { OutgoingFriendList } from '@/widgets/user';
import { Key, useState } from 'react';
import styles from './ui.module.css';
import { Tab } from '@nextui-org/react';

export const OutgoingFriendRequests = () => {
  const [selected, setSelected] = useState<'pending' | 'accepted' | 'refused'>(
    'pending'
  );

  const handleSelect = (key: Key) => {
    setSelected(key as 'pending' | 'accepted' | 'refused');
  };

  const { isLoading, isError, data } = useFriendRequest({
    belonging: 'sender',
    type: selected,
  });

  if (isError) {
    return <FetchError message='Ошибка получения исходящих заявок' />;
  }

  return (
    <section className={styles.container}>
      <div>
        <Tabs
          color='primary'
          variant='underlined'

          radius='sm'
          size='lg'
          selectedKey={selected}
          onSelectionChange={handleSelect}
        >
          <Tab key='pending' title='Ожидающие' />
          <Tab key='accepted' title='Принятые' />
          <Tab key='refused' title='Отклоненные' />
        </Tabs>
      </div>
      {isLoading ? (
        <div className='h-[calc(100vh-40px)] w-full flex justify-center items-center'>
          <Spinner />
        </div>
      ) : (
        <div className='overflow-hidden'>
          <h4 className='sm:text-[18px] pb-6 pt-5 xl:pl-0 pl-6'>
            Входящих заявок — {data?.length}
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

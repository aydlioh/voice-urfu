import { IUser } from '@/entities/users';
import { FetchError } from '@/features/errors';
import { Spinner } from '@/shared/ui';
import { IncomingFriendList } from '@/widgets/user';
import styles from './ui.module.css';

const mockUsers: IUser[] = [
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

export const IncomingFriendRequests = () => {
  const mockIsError = false;
  const mockIsLoading = false;
  const mockCount = 4;

  if (mockIsError) {
    return <FetchError message='Ошибка получения исходящих заявок' />;
  }

  if (mockIsLoading) {
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
          Входящих заявок — {mockCount}
        </h4>
        <IncomingFriendList data={mockUsers} />
      </div>
    </section>
  );
};

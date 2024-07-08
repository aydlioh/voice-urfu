import { SearchInput, Spinner } from '@/shared/ui';
import { useState } from 'react';
import styles from './ui.module.css';
import { FriendCard } from '@/widgets';
import { BsTelephoneFill } from 'react-icons/bs';
import { IoChatboxEllipses } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const mockUsers = [
  {
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    login: 'Ivan777',
    fullname: 'Иванов Иван',
  },
  {
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    login: 'Stepashka',
    fullname: 'Степан Степанов',
  },
  {
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    login: 'Olga_Sokol',
    fullname: 'Ольга Соколова',
  },
  {
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    login: 'Timamakar',
    fullname: 'Тимофей Макаров',
  },
];

export const FriendsPage = () => {
  const navigate = useNavigate();
  const handleWrite = (user: string) => navigate(`/messenger/${user}`);
  const handleCall = (user: string) => navigate(`/messenger/${user}/videocall`);

  const [search, setSearch] = useState<string | null>(null);
  const mockIsError = false;
  const mockIsLoading = false;
  const mockCount = 4;

  if (mockIsError) {
    return (
      <section className="h-[calc(100vh-40px)] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <h2 className="font-minecraft text-rose-500 text-[22px]">
            Fetch Error
          </h2>
          <p className="text-[14px] text-secondary/60">
            Ошибка получения списка друзей
          </p>
        </div>
      </section>
    );
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
      {mockIsLoading ? (
        <div className="h-[calc(100vh-160px)] w-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div>
          <h4 className="sm:text-[18px] pb-6 pt-5 md:pl-0 pl-6">
            Друзей в списке — {mockCount}
          </h4>
          <ul className="flex flex-col gap-1">
            {mockUsers?.map((user: any, index: number) => (
              <FriendCard
                key={index}
                user={user}
                endContent={
                  <div className="sm:flex flex-row gap-1 hidden">
                    <button
                      onClick={() => handleWrite(user.login)}
                      className="flex justify-center items-center p-2.5 rounded-full hover:bg-background/70 duration-200 text-[22px] text-primaryText/70"
                    >
                      <IoChatboxEllipses />
                    </button>
                    <button
                      onClick={() => handleCall(user.login)}
                      className="flex justify-center items-center p-2.5 rounded-full hover:bg-background/70 duration-200 text-[22px] text-primaryText/70"
                    >
                      <BsTelephoneFill />
                    </button>
                  </div>
                }
              />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

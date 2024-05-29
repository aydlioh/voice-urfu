import { ChatItem, ChatSearch } from '@/features/messenger';
import { UserProps } from '@/shared/types';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const mock = [
  {
    id: '1',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Panda Русская',
    lastMessage: 'Привет, как дела? Хорошо, что ты здесь qweqwe qweqwe qwe',
    lastMessageTime: '10:42',
  },
  {
    id: '2',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Panda Русская',
    lastMessage: 'Привет, как дела? Хорошо, что ты здесь qweqwe qweqwe qwe',
    lastMessageTime: '10:42',
  },
  {
    id: '3',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Panda Русская',
    lastMessage: 'Привет, как дела? Хорошо, что ты здесь qweqwe qweqwe qwe',
    lastMessageTime: '10:42',
  },
  {
    id: '4',
    imgSrc:
      'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
    name: 'Panda Русская',
    lastMessage: 'Привет, как дела? Хорошо, что ты здесь qweqwe qweqwe qwe',
    lastMessageTime: '10:42',
  },
];

export const Chats = ({ isChat = false }: { isChat?: boolean }) => {
  const navigate = useNavigate();

  const handleNavigate = (user: UserProps) => {
    navigate(`${user.id}`, {
      state: { user },
    });
  };

  return (
    <aside
      className={clsx(
        'bg-sidebarNested md:max-w-[340px] w-full text-secondary',
        {
          'md:flex hidden': isChat,
        }
      )}
    >
      <div className="p-2">
        <ChatSearch />
        <ul className="py-1 flex flex-col gap-0.5">
          {mock.map((user) => (
            <ChatItem onClick={handleNavigate} user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </aside>
  );
};

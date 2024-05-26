import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';

type Props = {
  user: {
    id: string;
    imgSrc: string;
    name: string;
    lastMessage: string;
    lastMessageTime: string;
  };
};

export const ChatItem = ({ user }: Props) => {
  const { id: currentId } = useParams();

  return (
    <Link to={user.id}>
      <li
        className={clsx('p-2 hover:bg-background duration-200 rounded-sm', {
          'bg-background': currentId === user.id,
        })}
      >
        <div className="flex flex-row items-center gap-2">
          <div className="min-w-10">
            <img
              src={user.imgSrc}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div className="w-full">
            <p className="leading-[20px]">{user.name}</p>
            <div className="leading-[16px] text-[12px] font-light flex flex-row justify-between">
              <p className="line-clamp-1 md:w-5/6 w-4/6">{user.lastMessage}</p>
              <p className="line-clamp-1">{user.lastMessageTime}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
};

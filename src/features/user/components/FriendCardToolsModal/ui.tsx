import { useClickOutside } from '@/shared/hooks';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  close: () => void;
  isOpen: boolean;
  user: {
    login: string;
  };
};

export const FriendCardToolsModal = ({ close, isOpen, user }: Props) => {
  const navigate = useNavigate();
  const handleWrite = () => navigate(`/messenger/${user.login}`);
  const handleCall = () => navigate(`/messenger/${user.login}/videocall`);

  const modalRef = useRef<HTMLDivElement>(null);
  useClickOutside(close, modalRef, isOpen);

  return (
    <div
      className="absolute right-0 bg-pageNested py-2 px-1 rounded-md z-10"
      ref={modalRef}
    >
      <div className="border-solid border-b-pageNested border-b-8 border-x-transparent border-x-[6px] border-t-0 absolute right-[15px] -top-[7px]" />
      <ul className="flex flex-col gap-1">
        <li
          onClick={handleWrite}
          className="hover:bg-background p-1 px-2 rounded-md duration-200 w-full cursor-pointer sm:text-[16px] text-[15px]"
        >
          Написать
        </li>
        <li
          onClick={handleCall}
          className="hover:bg-background p-1 px-2 rounded-md duration-200 w-full cursor-pointer sm:text-[16px] text-[15px]"
        >
          Позвонить
        </li>
      </ul>
    </div>
  );
};

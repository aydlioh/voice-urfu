import { SearchInput } from '@/shared/ui';
import { BsTelephoneFill } from 'react-icons/bs';
import { RiSettings5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/features/sidebar';

const mockUser = {
  imgSrc:
    'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
};

export const ChatTools = ({ userName }: { userName: string | undefined }) => {
  const navigate = useNavigate();

  const handleVideocall = () => {
    navigate('videocall');
  };

  return (
    <div className="bg-pageNested p-3 flex justify-between items-center">
      <div className="flex flex-row gap-3 items-center">
        <BackButton to='/messenger' />
        <div className="min-w-10">
          <img
            src={mockUser.imgSrc}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <h3>{userName}</h3>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <SearchInput placeholder="Поиск" className="xl:block hidden" />
        <div className="flex flex-row gap-1">
          <button
            onClick={handleVideocall}
            className="sm:h-12 sm:w-12 h-10 w-10 flex justify-center items-center p-2 rounded-full hover:bg-page duration-200 cursor-pointer"
          >
            <BsTelephoneFill className="sm:text-[24px] text-[20px]" />
          </button>
          <div className="sm:h-12 sm:w-12 h-10 w-10 flex justify-center items-center p-2 rounded-full hover:bg-page duration-200 cursor-pointer">
            <RiSettings5Fill className="sm:text-[28px] text-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

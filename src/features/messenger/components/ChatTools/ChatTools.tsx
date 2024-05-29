import { SearchInput } from '@/shared/ui';
import { BsTelephoneFill } from 'react-icons/bs';
import { RiSettings5Fill } from 'react-icons/ri';

const mockUser = {
  imgSrc:
    'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
};

export const ChatTools = ({ userName }: { userName: string | undefined }) => {
  return (
    <div className="bg-pageNested p-3 flex justify-between items-center">
      <div className="flex flex-row gap-3 items-center">
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
        <SearchInput placeholder="Поиск" />
        <div className="flex flex-row gap-1">
          <div className="h-12 w-12 flex justify-center items-center p-2 rounded-full hover:bg-page duration-200 cursor-pointer">
            <BsTelephoneFill size={24} />
          </div>
          <div className="h-12 w-12 flex justify-center items-center p-2 rounded-full hover:bg-page duration-200 cursor-pointer">
            <RiSettings5Fill size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

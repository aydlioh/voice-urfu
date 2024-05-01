import { HiMenu } from 'react-icons/hi';
import { VoiceIcon } from '@/shared/assets/svgs';

export const NavbarToggle = ({
  isOpen,
  toogleSidebar,
}: {
  isOpen: boolean;
  toogleSidebar: () => void;
}) => {
  return (
    <div className="flex flex-row items-center px-3 gap-10">
      <button
        onClick={toogleSidebar}
        className="text-[30px] bg-background text-sidebar p-1 rounded-xl flex justify-center items-center hover:bg-opacity-80 duration-200"
      >
        <HiMenu />
      </button>

      {isOpen && <img src={VoiceIcon} alt="Voice" width={130} />}
    </div>
  );
};

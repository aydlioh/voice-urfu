import { HiMenu } from 'react-icons/hi';
import { VoiceSvg } from '@/shared/assets/svgs';

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export const SidebarToggle = ({
  isOpen,
  toggleSidebar,
}: Props) => {
  return (
    <div className="flex flex-row items-center px-3 gap-10">
      <button
        onClick={toggleSidebar}
        className="text-[30px] bg-background text-sidebar p-1 rounded-xl flex justify-center items-center hover:bg-opacity-80 duration-200"
      >
        <HiMenu />
      </button>

      {isOpen && <img src={VoiceSvg} alt="Voice" width={130} />}
    </div>
  );
};

import { FaPhoneSlash } from 'react-icons/fa6';
import { PiMicrophoneSlashFill, PiMicrophoneFill  } from "react-icons/pi";
import { PiVideoCameraFill, PiVideoCameraSlashFill } from 'react-icons/pi';
import { LuMonitor, LuMonitorOff } from 'react-icons/lu';
import { VideocallTool } from '@/features/videocall';
import { useNavigate } from 'react-router-dom';

export const VideocallTools = () => {
  const navigate = useNavigate();

  const handleMicroToggle = () => {
    console.log('Micro switch');
  };

  const handleVideoToggle = () => {
    console.log('Video switch');
  };

  const handleScreenDemoToggle = () => {
    console.log('Screen Demo switch');
  };

  const handleDisconnect = () => {
    navigate(-1);
  };

  return (
    <div className="absolute bottom-24 flex justify-center gap-1">
      <VideocallTool
        activeIcon={PiMicrophoneFill}
        disabledIcon={PiMicrophoneSlashFill}
        handleToggle={handleMicroToggle}
      />
      <VideocallTool
        activeIcon={PiVideoCameraFill}
        disabledIcon={PiVideoCameraSlashFill}
        handleToggle={handleVideoToggle}
      />
      <VideocallTool
        defaultActive={false}
        activeIcon={LuMonitor}
        disabledIcon={LuMonitorOff}
        handleToggle={handleScreenDemoToggle}
      />
      <button
        onClick={handleDisconnect}
        className="h-12 w-12 flex justify-center items-center p-2 rounded-full hover:bg-rose-500/10 duration-200 cursor-pointer"
      >
        <FaPhoneSlash className="text-rose-500 text-[26px]" />
      </button>
    </div>
  );
};

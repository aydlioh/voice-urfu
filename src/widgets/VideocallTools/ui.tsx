import { FaPhoneSlash } from 'react-icons/fa6';
import { PiMicrophoneSlashFill, PiMicrophoneFill  } from "react-icons/pi";
import { PiVideoCameraFill, PiVideoCameraSlashFill } from 'react-icons/pi';
import { LuMonitor, LuMonitorOff } from 'react-icons/lu';
import { VideocallTool } from '@/features/videocall';
import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css'

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
    <div className={styles.toolsContainer}>
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
        className={styles.disconnectBtn}
      >
        <FaPhoneSlash className={styles.disconnectIcon} />
      </button>
    </div>
  );
};

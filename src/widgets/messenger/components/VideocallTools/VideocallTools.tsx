import { FaPhoneSlash } from 'react-icons/fa6';
import { PiMicrophoneSlashFill, PiMicrophoneFill } from 'react-icons/pi';
import { PiVideoCameraFill, PiVideoCameraSlashFill } from 'react-icons/pi';
import { LuMonitor, LuMonitorOff } from 'react-icons/lu';
import { VideocallTool } from '@/features/videocall';
import { useNavigate } from 'react-router-dom';
import styles from './VideocallTools.module.css';

type Props = {
  toggleCamera: () => void;
  toggleMicrophone: () => void;
  isCamera: boolean;
  isMicrophone: boolean;
};

export const VideocallTools = ({
  toggleMicrophone,
  toggleCamera,
  isCamera,
  isMicrophone,
}: Props) => {
  const navigate = useNavigate();

  const handleMicroToggle = () => {
    toggleMicrophone();
  };

  const handleVideoToggle = () => {
    toggleCamera();
  };

  const handleScreenDemoToggle = () => {
    console.log('Screen Demo switch');
  };

  const handleDisconnect = () => {
    navigate(-1);
  };

  return (
    <div className={styles.toolsContainer}>
      <div className={styles.toolsWrapper}>
        <VideocallTool
          defaultActive={isMicrophone}
          activeIcon={PiMicrophoneFill}
          disabledIcon={PiMicrophoneSlashFill}
          handleToggle={handleMicroToggle}
        />
        <VideocallTool
          defaultActive={isCamera}
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
        <button onClick={handleDisconnect} className={styles.disconnectBtn}>
          <FaPhoneSlash className={styles.disconnectIcon} />
        </button>
      </div>
    </div>
  );
};

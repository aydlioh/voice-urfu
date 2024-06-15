import { VideocallTools } from '@/widgets';
import { useVideocall } from '@/entities/messenger';
import { UserVideo } from '@/features/videocall';
import styles from './ui.module.css';

const VideocallPage = () => {
  const {
    user,
    opponent,
    userVideo,
    opponentVideo,
    toggleMicrophone,
    toggleCamera,
    isMicrophone,
    isCamera,
  } = useVideocall();

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.videoWrapper}>
          <UserVideo ref={userVideo} name={user} />
          <UserVideo muted={false} ref={opponentVideo} name={opponent} />
        </div>
        <VideocallTools
          isMicrophone={isMicrophone}
          isCamera={isCamera}
          toggleMicrophone={toggleMicrophone}
          toggleCamera={toggleCamera}
        />
      </div>
    </section>
  );
};

export default VideocallPage;

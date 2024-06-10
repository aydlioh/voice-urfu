import { VideocallTools } from '@/widgets';
import { useVideocall } from '@/entities/messenger';
import { UserVideo } from '@/features/videocall';
import styles from './ui.module.css'

const VideocallPage = () => {
  const { user, opponent, userVideo, opponentVideo } = useVideocall();

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.videoWrapper}>
          <UserVideo ref={userVideo} name={user} />
          <UserVideo ref={opponentVideo} name={opponent} />
        </div>
        <VideocallTools />
      </div>
    </section>
  );
};

export default VideocallPage;

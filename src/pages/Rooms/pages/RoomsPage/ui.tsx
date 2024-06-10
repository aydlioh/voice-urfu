import { CreateRoom, Rooms } from '@/features/groupcall';
import styles from './ui.module.css';

const RoomsPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Текущие комнаты</h1>
        <CreateRoom />
        <Rooms />
      </div>
    </section>
  );
};

export default RoomsPage;

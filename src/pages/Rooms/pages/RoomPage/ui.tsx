/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGroupcall } from '@/entities/groupcall';
import { Button } from '@/shared/ui';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ui.module.css';
import clsx from 'clsx';

const RoomPage = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const { users, provideMediaRef } = useGroupcall(roomId || '');

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Комната: {roomId}</h2>
        <Button onClick={() => navigate('/rooms')} size="lg" color="danger">
          Выйти
        </Button>
        <div className={styles.innerWrapper}>
          <ul className={styles.usersGrid}>
            {users.map((user: any, index: number) => (
              <li key={index} className={clsx(styles.userWrapper, 'group')}>
                <div className={clsx(styles.userName, 'sm:group-hover:block ')}>
                  <p>{user}</p>
                </div>
                <video
                  ref={(instance) => {
                    provideMediaRef(user, instance);
                  }}
                  className={styles.userVideo}
                  autoPlay
                  playsInline
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RoomPage;

import { Button } from '@/shared/ui';
import styles from './HomePage.module.css';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoAddCircleOutline } from 'react-icons/io5';
import { v4 } from 'uuid';
import socket, { ACTIONS } from '@/shared/socket';

export const HomePage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<string[]>([]);
  const rootNode = useRef(null);

  useEffect(() => {
    socket.on(ACTIONS.SHARE_ROOMS, ({ rooms }) => {
      if (rootNode.current) {
        setRooms(rooms);
      }
    });
  }, []);

  return (
    <section className={styles.homePage} ref={rootNode}>
      <Button
        onClick={() => navigate(`/room/${v4()}`)}
        size="lg"
        color="primary"
        radius="md"
        className="w-[200px]"
      >
        <div className="flex justify-center items-center gap-2">
          <p>Создать комнату</p>
          <IoAddCircleOutline size={25} />
        </div>
      </Button>
      <ul className={styles.roomList}>
        {rooms.map((room) => (
          <li key={room} className={styles.room}>
            <p>Комната № {room}</p>
            <Link to={`/room/${room}`}>
              <Button size="lg" radius="md">
                Войти
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

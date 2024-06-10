import { useGroupcallSocket } from '@/entities/groupcall';
import { ACTIONS } from '@/shared/socket/groupcall';
import { Button } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css';

export const Rooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const { socket } = useGroupcallSocket();

  useEffect(() => {
    if (socket) {
      socket.send(JSON.stringify({ id: ACTIONS.GET_ROOMS }));

      socket.onmessage = (e) => {
        const message = JSON.parse(e.data);
        if (message.id === ACTIONS.SHOW_ROOMS) {
          setRooms(message.data);
        }
      };
    }
  }, [socket]);

  return (
    <ul className={styles.roomsWrapper}>
      {rooms.map((room, index) => (
        <li key={index} className={styles.room}>
          <p>Комната № {room}</p>
          <Button onClick={() => navigate(`/rooms/${room}`)} color="secondary">
            Войти
          </Button>
        </li>
      ))}
    </ul>
  );
};

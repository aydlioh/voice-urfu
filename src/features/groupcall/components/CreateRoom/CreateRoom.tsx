import { Button, Input } from '@/shared/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateRoom.module.css'

export const CreateRoom = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/rooms/${roomId}`);
    setRoomId('');
  };

  return (
    <form
      onSubmit={createRoom}
      className={styles.createRoomForm}
    >
      <Input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        label="Номер комнаты"
        className={styles.createRoomInput}
      />
      <Button type="submit" color="success" className={styles.createRoomBtn}>
        Создать
      </Button>
    </form>
  );
};

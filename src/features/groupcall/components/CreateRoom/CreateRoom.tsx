import { Button, Input } from '@/shared/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      className="flex sm:flex-row flex-col items-center gap-4"
    >
      <Input
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        label="Номер комнаты"
        className="max-w-80"
      />
      <Button type="submit" color="success" className="sm:w-auto w-full">
        Создать
      </Button>
    </form>
  );
};

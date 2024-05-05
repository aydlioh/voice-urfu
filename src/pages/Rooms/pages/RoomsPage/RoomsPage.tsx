import { useGroupcall } from '@/shared/hooks';
import { ACTIONS } from '@/shared/socket/groupcall';
import { Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RoomsPage = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const { socket } = useGroupcall();

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
    <section className="h-full w-full text-primaryText">
      <div className="p-8">
        <h1 className="text-2xl font-bold">Текущие комнаты</h1>
        <ul>
          {rooms.map((room, index) => (
            <li key={index}>
              <p>Комната № {room}</p>
              <Button
                size="lg"
                radius="md"
                onClick={() => navigate(`/rooms/${room}`)}
              >
                Войти
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGroupcall } from '@/entities/groupcall';
import { Button } from '@/shared/ui';
import { useNavigate, useParams } from 'react-router-dom';

export const RoomPage = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const { users, provideMediaRef } = useGroupcall(roomId || '');

  return (
    <section className="h-full w-full text-primaryText">
      <div className="sm:p-8 p-4">
        <h2 className="text-2xl mb-3">Комната: {roomId}</h2>
        <Button onClick={() => navigate('/rooms')} size="lg" color="danger">
          Выйти
        </Button>
        <div className="mt-4">
          <ul className="gap-4 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {users.map((user: any, index: number) => (
              <li
                key={index}
                className="border-secondary relative border-2 rounded-lg overflow-hidden group"
              >
                <div className="group-hover:block hidden text-[16px] absolute bottom-2 right-2 bg-background bg-opacity-40 px-4 py-1.5 rounded-md">
                  <p>{user}</p>
                </div>
                <video
                  ref={(instance) => {
                    provideMediaRef(user, instance);
                  }}
                  className="w-full"
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

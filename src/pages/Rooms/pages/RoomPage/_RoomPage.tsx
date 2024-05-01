import { useNavigate, useParams } from 'react-router-dom';
import { useWebRTC } from '@/shared/hooks';
import { Button } from '@/shared/ui';

export const RoomPage = () => {
  const { id: roomId } = useParams();
  const navigate = useNavigate();

  if (!roomId) {
    navigate('/');
  }

  const { clients, provideMediaRef } = useWebRTC(roomId || '');
  return (
    <section>
      <div className="border p-5 my-5 flex items-center justify-between">
        <h2>Комната: {roomId}</h2>
        <Button onClick={() => navigate('/')}>Выйти</Button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        {clients.map((clientId: string) => (
          <div key={clientId}>
            <h3>
              {clientId === 'LOCAL_VIDEO'
                ? 'Это вы'
                : `Пользователь ${clientId}`}
            </h3>
            <video
              className="w-full rounded-md"
              ref={(instance) => {
                provideMediaRef(clientId, instance);
              }}
              autoPlay
              playsInline
              muted={clientId === 'LOCAL_VIDEO'}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

import { CreateRoom, Rooms } from '@/features/groupcall';

const RoomsPage = () => {
  return (
    <section className="h-[calc(100%-40px)] w-full text-primaryText">
      <div className="sm:p-8 p-4">
        <h1 className="text-2xl font-bold mb-8">Текущие комнаты</h1>
        <CreateRoom />
        <Rooms />
      </div>
    </section>
  );
};

export default RoomsPage;

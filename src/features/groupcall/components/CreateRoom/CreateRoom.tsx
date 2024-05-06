import { Button, Input } from '@/shared/ui';

export const CreateRoom = () => {
  return (
    <form className="flex sm:flex-row flex-col items-center gap-4">
      <Input label="Номер комнаты" className="max-w-80" />
      <Button color="success" className="sm:w-auto w-full">
        Создать
      </Button>
    </form>
  );
};

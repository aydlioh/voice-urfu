import { Button, Input } from '@/shared/ui';

export const CreateRoom = () => {
  return (
    <form className="flex items-center gap-4">
      <Input label="Номер комнаты" className="max-w-80" />
      <Button color="success">Создать</Button>
    </form>
  );
};

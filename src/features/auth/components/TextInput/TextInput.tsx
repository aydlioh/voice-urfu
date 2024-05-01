import { Input } from '@/shared/ui';
import { InputProps } from '@nextui-org/react';

export const TextInput = (props: InputProps) => {
  return (
    <Input
      variant="bordered"
      size="lg"
      {...props}
      classNames={{
        inputWrapper:
          'border-default-400 data-[hover=true]:border-background group-data-[focus=true]:border-background',
      }}
    />
  );
};

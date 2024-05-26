import { forwardRef } from 'react';
import { Input as InputNextUI, InputProps } from '@nextui-org/react';

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputNextUI
      {...props}
      ref={ref}
      autoComplete="off"
      classNames={{
        inputWrapper:
          'border-default-400 data-[hover=true]:border-background group-data-[focus=true]:border-background',
      }}
    />
  );
});

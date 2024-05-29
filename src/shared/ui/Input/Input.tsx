import { forwardRef } from 'react';
import { Input as InputNextUI, InputProps } from '@nextui-org/react';

const classNames = {
  main: {
    input:
      'data-[has-start-content=true]:ps-4 bg-primary text-secondary placeholder:text-secondary group-data-[has-value=true]:text-secondary',
    innerWrapper: 'bg-primary py-1',
    inputWrapper:
      'rounded-md bg-primary data-[hover=true]:bg-primary group-data-[focus=true]:bg-primary',
  },
  border: {
    inputWrapper:
      'border-default-400 data-[hover=true]:border-background group-data-[focus=true]:border-background',
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <InputNextUI
      {...props}
      ref={ref}
      autoComplete="off"
      classNames={{
        ...(props.variant === 'bordered' ? classNames.border : {}),
        ...(props.variant === 'flat' ? classNames.main : {}),
      }}
    />
  );
});

export type { InputProps };

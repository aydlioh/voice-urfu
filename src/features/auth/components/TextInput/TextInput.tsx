import { forwardRef } from 'react';
import { Input } from '@/shared/ui';
import { InputProps } from '@nextui-org/react';
import { FieldError } from 'react-hook-form';

type TextInputProps = InputProps & {
  error: FieldError | undefined;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ error, ...props }, ref) => {
    return (
      <Input
        isInvalid={error !== undefined}
        color={error !== undefined ? 'danger' : 'default'}
        errorMessage={error?.message}
        variant="bordered"
        {...props}
        ref={ref}
      />
    );
  }
);

TextInput.displayName = 'TextInput';

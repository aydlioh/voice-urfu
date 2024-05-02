import { Input } from '@/shared/ui';
import { InputProps } from '@nextui-org/react';
import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi2';

type PasswordInputProps = InputProps & {
  error: FieldError | undefined;
};
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <Input
        isInvalid={error !== undefined}
        color={error !== undefined ? 'danger' : 'default'}
        errorMessage={error?.message}
        {...props}
        variant="bordered"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <HiLockOpen className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <HiLockClosed className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        ref={ref}
        type={isVisible ? 'text' : 'password'}
      />
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

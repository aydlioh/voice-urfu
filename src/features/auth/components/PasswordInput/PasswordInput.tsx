import { Input } from '@/shared/ui';
import { InputProps } from '@nextui-org/react';
import { useState } from 'react';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi2';

export const PasswordInput = (props: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
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
      type={isVisible ? 'text' : 'password'}
      size="lg"
      classNames={{
        inputWrapper:
          'border-default-400 data-[hover=true]:border-background group-data-[focus=true]:border-background',
      }}
    />
  );
};

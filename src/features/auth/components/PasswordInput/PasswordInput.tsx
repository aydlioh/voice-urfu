import { Input, InputProps } from '@/shared/ui';
import { forwardRef, useState } from 'react';
import { HiLockClosed, HiLockOpen } from 'react-icons/hi2';
import styles from './PasswordInput.module.css';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <Input
        {...props}
        variant="bordered"
        endContent={
          <button
            className={styles.changeVisibleBtn}
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <HiLockOpen className="pointer-events-none" />
            ) : (
              <HiLockClosed className="pointer-events-none" />
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

import { Button as ButtonNextUI, ButtonProps } from '@nextui-org/react';
import styles from './ui.module.css';
import clsx from 'clsx';

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <ButtonNextUI
      {...props}
      className={clsx(
        props.color === 'primary' && styles.primary,
        props.color === 'danger' && styles.danger,
        props.color === 'secondary' && styles.secondary,
        (props.color === 'primary' && props.variant === 'bordered') && styles.bordered,
        className
      )}
    />
  );
};

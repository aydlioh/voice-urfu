import { Button as ButtonNextUI, ButtonProps } from '@nextui-org/react';
import styles from './Button.module.css';
import clsx from 'clsx';

export const Button = (props: ButtonProps) => {
  return <ButtonNextUI {...props} className={clsx(styles.button)} />;
};

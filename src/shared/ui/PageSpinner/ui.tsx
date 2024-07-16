import clsx from 'clsx';
import { Spinner } from '../Spinner';
import styles from './ui.module.css';

type Props = {
  variant: 'screen' | 'sidebar';
  className?: string;
};

export const PageSpinner = ({ variant, className }: Props) => {
  return (
    <div
      className={clsx(
        variant === 'screen'
          ? styles.spinnerWrapperScreen
          : styles.spinnerWrapper,
        className
      )}
    >
      <Spinner label='Загрузка...' />
    </div>
  );
};

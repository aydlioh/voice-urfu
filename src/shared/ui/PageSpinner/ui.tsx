import clsx from 'clsx';
import { Spinner } from '../Spinner';
import styles from './ui.module.css';

export const PageSpinner = ({ variant }: { variant: 'screen' | 'sidebar' }) => {
  return (
    <div
      className={clsx(
        variant === 'screen'
          ? styles.spinnerWrapperScreen
          : styles.spinnerWrapper
      )}
    >
      <Spinner />
    </div>
  );
};

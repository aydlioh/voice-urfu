import { forwardRef } from 'react';
import styles from './ui.module.css';
import clsx from 'clsx';

type Props = { name?: string };

export const UserVideo = forwardRef(
  ({ name }: Props, ref: React.ForwardedRef<HTMLVideoElement>) => {
    return (
      <div className={clsx(styles.videoWrapper, 'group')}>
        {name && (
          <div className={clsx(styles.userName, 'sm:group-hover:block')}>
            <p>{name}</p>
          </div>
        )}
        <video
          autoPlay
          playsInline
          muted
          ref={ref}
          className={styles.userVideo}
        />
      </div>
    );
  }
);

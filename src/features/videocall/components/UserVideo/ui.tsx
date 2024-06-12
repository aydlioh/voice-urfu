import { forwardRef } from 'react';
import styles from './ui.module.css';
import clsx from 'clsx';

type Props = { name?: string; muted?: boolean };

export const UserVideo = forwardRef(
  ({ name, muted = true }: Props, ref: React.ForwardedRef<HTMLVideoElement>) => {
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
          muted={muted}
          ref={ref}
          className={styles.userVideo}
        />
      </div>
    );
  }
);

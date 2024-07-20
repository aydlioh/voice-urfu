import { useMediaQuery } from '@/shared/hooks';
import { Slide, ToastContainer, Zoom } from 'react-toastify';
import styles from './Notification.module.css';

export const Notification = () => {
  const isMobile = useMediaQuery({ query: '(max-width:480px)' });

  return (
    <ToastContainer
      draggable
      position={isMobile ? 'top-center' : 'bottom-right'}
      stacked
      hideProgressBar
      autoClose={isMobile ? 1500 : 3000}
      limit={isMobile ? 1 : 6}
      transition={isMobile ? Slide : Zoom}
      draggableDirection={isMobile ? 'y' : 'x'}
      draggablePercent={25}
      toastClassName={styles.toastContainer}
    />
  );
};

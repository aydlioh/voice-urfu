import { MdClose } from 'react-icons/md';
import styles from './CloseButton.module.css';

type Props = {
  closeToast?: () => void;
};

export const CloseButton = ({ closeToast }: Props) => {
  const closeHandler = () => {
    if (closeToast) {
      closeToast();
    }
  };

  return (
    <div>
      <div onClick={closeHandler} className={styles.closeBtn}>
        <MdClose />
      </div>
    </div>
  );
};

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './FriendRequest.module.css';
import clsx from 'clsx';

type Props = {
  closeToast?: () => void;
  handleAccept: (receiver: string) => void;
  handleRefuse: (receiver: string) => void;
  message: {
    sender: string;
  };
};

export const FriendRequest = ({
  handleAccept,
  handleRefuse,
  closeToast,
  message,
}: Props) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    if (closeToast) {
      closeToast();
    }
    setTimeout(toast.dismiss, 500);
    navigate('/friends/incoming');
  };

  const acceptHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleAccept(message.sender);
    if (closeToast) {
      closeToast();
    }
    toast.success('Вы приняли заявку в друзья');
  };

  const refuseHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleRefuse(message.sender);
    if (closeToast) {
      closeToast();
    }
    toast.error('Вы отклонили заявку в друзья');
  };

  return (
    <div className={styles.container} onMouseUp={handleOpen}>
      <div className={styles.wrapper}>
        <p>Заявка в друзья от {message.sender}</p>
        <div className={styles.btnsWrapper}>
          <button
            onClick={acceptHandler}
            className={clsx(styles.btn, 'bg-green-300')}
          >
            Принять
          </button>
          <button
            onClick={refuseHandler}
            className={clsx(styles.btn, 'bg-rose-300')}
          >
            Отклонить
          </button>
        </div>
      </div>
    </div>
  );
};

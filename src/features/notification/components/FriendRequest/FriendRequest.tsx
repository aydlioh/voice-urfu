import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './FriendRequest.module.css';

type Props = {
  closeToast?: () => void;
  message: {
    sender: string;
  };
};

export const FriendRequest = ({ closeToast, message }: Props) => {
  const navigate = useNavigate();

  const handleOpen = () => {
    if (closeToast) {
      closeToast();
    }
    setTimeout(toast.dismiss, 500);
    navigate('/friends/incoming');
  };

  return (
    <div className={styles.container} onMouseUp={handleOpen}>
      <div className={styles.wrapper}>
        <p>Заявка в друзья от {message.sender}</p>
      </div>
    </div>
  );
};

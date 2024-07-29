import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './NewMessage.module.css';

type Props = {
  closeToast?: () => void;
  message: {
    redirect: string;
    author: string;
    body: string;
    imageSrc?: string;
  };
};

export const NewMessage = ({ closeToast, message }: Props) => {
  const navigate = useNavigate();
  const openChatHandler = () => {
    if (closeToast) {
      closeToast();
    }
    setTimeout(toast.dismiss, 500);
    navigate(message.redirect);
  };

  return (
    <div className={styles.container} onMouseUp={openChatHandler}>
      <div className={styles.imgWrapper}>
        <img
          src="https://avatars.mds.yandex.net/get-entity_search/44973/850162673/orig"
          alt="Logo"
          className={styles.avatar}
        />
      </div>
      <div className={styles.message}>
        <h4 className={styles.author}>{message.author}</h4>
        <p className={styles.body}>{message.body}</p>
      </div>
    </div>
  );
};

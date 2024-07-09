import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './ui.module.css';

type Props = {
  closeToast?: () => void;
  message: {
    redirect: string;
    author: string;
    body: string;
    imageSrc?: string;
  };
};

export const Message = ({ closeToast, message }: Props) => {
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
          src="https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg"
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

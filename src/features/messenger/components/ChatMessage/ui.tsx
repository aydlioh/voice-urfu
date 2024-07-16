import { IMessage } from '@/entities/messenger';
import clsx from 'clsx';
import dayjs from 'dayjs';
import styles from './ui.module.css';

type ChatMessageProps = {
  message: IMessage;
  currentUser: string;
};

export const ChatMessage = ({ message, currentUser }: ChatMessageProps) => {
  const messageStyle =
    message.sender === currentUser ? styles.current : styles.opponent;

  return (
    <li className={clsx(styles.message, messageStyle)}>
      <div className={styles.messageInfoWrapper}>
        <p className={styles.messageName}>{message.sender}</p>
        <p className={styles.messageTime}>
          {dayjs(message.timestamp).format('HH:mm')}
        </p>
      </div>
      <p className={styles.messageBody}>{message.content}</p>
    </li>
  );
};

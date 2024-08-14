import { IMessage } from '@/entities/messenger';
import clsx from 'clsx';
import styles from './ChatMessage.module.css';
import { formatTime } from '@/shared/common/utils';

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
          {formatTime(message.timestamp)}
        </p>
      </div>
      <p className={styles.messageBody}>{message.content}</p>
    </li>
  );
};

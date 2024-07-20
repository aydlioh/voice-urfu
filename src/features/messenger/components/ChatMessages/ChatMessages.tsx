import { IMessage } from '@/entities/messenger';
import { ChatMessage } from '@/features/messenger';
import { Spinner } from '@/shared/ui';
import styles from './ChatMessages.module.css';

type ChatMessagesProps = {
  messages: IMessage[];
  currentUser: string;
  isLoading: boolean;
};

export const ChatMessages = ({
  messages,
  currentUser,
  isLoading,
}: ChatMessagesProps) => {
  if (!messages || isLoading) {
    return (
      <div className={styles.chatSpinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.chatWrapper}>
      <ul className={styles.messagesWrapper}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            currentUser={currentUser}
          />
        ))}
      </ul>
    </div>
  );
};

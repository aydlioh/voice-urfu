import styles from './Chat.module.css';
import { useChatConnection } from '@/entities/messenger';
import { ChatInput, ChatMessages, ChatTools } from '@/features/messenger';

export const Chat = () => {
  const { user, opponent, messages, sendMessage, isLoading } = useChatConnection();

  return (
    <div className={styles.chatContainer}>
      <ChatTools userName={opponent} />
      <ChatMessages
        messages={messages}
        currentUser={user}
        isLoading={isLoading}
      />
      <ChatInput onSubmit={sendMessage} />
    </div>
  );
};

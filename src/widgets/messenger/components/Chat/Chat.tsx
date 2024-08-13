import styles from './Chat.module.css';
import { useChatConnection } from '@/entities/messenger';
import { ChatInput, ChatMessages, ChatTools } from '@/features/messenger';

export const Chat = () => {
  const {
    user,
    opponent,
    messages,
    sendMessage,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useChatConnection();

  return (
    <div className={styles.chatContainer}>
      <ChatTools userName={opponent} />
      <ChatMessages
        data={messages}
        currentUser={user}
        isFetching={isFetching}
        hasNext={hasNextPage}
        fetchNext={fetchNextPage}
        isFetchingNext={isFetchingNextPage}
      />
      <ChatInput onSubmit={sendMessage} />
    </div>
  );
};

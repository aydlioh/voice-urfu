import { useChat } from '@/entities/messenger';
import { ChatInput, ChatMessages, ChatTools } from '@/features/messenger';

export const Chat = () => {
  const { user, opponent, messages, sendMessage } = useChat();

  return (
    <div className="m-1.5 rounded-sm overflow-hidden">
      <ChatTools userName={opponent} />
      <ChatMessages messages={messages} currentUser={user} />
      <ChatInput onSubmit={sendMessage} />
    </div>
  );
};

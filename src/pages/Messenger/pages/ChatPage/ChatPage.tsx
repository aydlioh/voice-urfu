import { useChat } from '@/entities/messenger';
import { Button } from '@/shared/ui';

export const ChatPage = () => {
  const { messages, sendMessage } = useChat();
  return (
    <section className="h-full w-full text-primaryText">
      <h1 className="text-2xl">
        <Button onClick={sendMessage}>Privet</Button>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </h1>
    </section>
  );
};

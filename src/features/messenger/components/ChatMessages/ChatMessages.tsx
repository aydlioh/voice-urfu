import { IMessage } from '@/entities/messenger';
import { ChatMessage } from '@/features/messenger';

type ChatMessagesProps = {
  messages: IMessage[];
  currentUser: string;
};

export const ChatMessages = ({ messages, currentUser }: ChatMessagesProps) => {
  return (
    <div className="bg-page sm:h-[calc(100vh-195px)] h-[calc(100vh-180px)] flex pl-4">
      <ul className='flex flex-col-reverse w-full py-10 gap-3 pr-4 overflow-y-auto '>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} currentUser={currentUser} />
        ))}
      </ul>
    </div>
  );
};

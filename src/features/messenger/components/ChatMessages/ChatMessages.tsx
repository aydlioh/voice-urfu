import { IMessage } from '@/entities/messenger';
import { ChatMessage } from '@/features/messenger';
import { Spinner } from '@/shared/ui';

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
  if (isLoading) {
    return (
      <div className='sm:h-[calc(100vh-195px)] h-[calc(100vh-180px)] flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-page sm:h-[calc(100vh-195px)] h-[calc(100vh-180px)] flex pl-4">
      <ul className="flex flex-col-reverse w-full py-10 gap-3 pr-4 overflow-y-auto ">
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

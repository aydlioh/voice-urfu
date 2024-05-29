import { IMessage } from '@/entities/messenger';
import { ChatTools } from '@/features/messenger';
import { useParams } from 'react-router-dom';

const messages: IMessage[] = [
  {
    id: 1,
    content: 'This is a sample message.',
    receiver: '1',
    sender: '2',
    timestamp: '2023-04-01T12:00:00Z',
  },
  {
    id: 2,
    content: 'Another sample message.',
    receiver: '2',
    sender: '1',
    timestamp: '2023-04-02T15:30:00Z',
  },
  {
    id: 3,
    content: 'Third sample message.',
    receiver: '2',
    sender: '1',
    timestamp: '2023-04-03T18:45:00Z',
  },
  {
    id: 4,
    content: 'Fourth sample message.',
    receiver: '1',
    sender: '2',
    timestamp: '2023-04-04T21:20:00Z',
  },
];

export const Chat = () => {
  const { id } = useParams();
  // const { messages, sendMessage } = useChat();

  return (
    <div className="m-1.5 rounded-sm overflow-hidden">
      <ChatTools userName={id} />
      <div className="bg-page">
        <ul>
          {messages.map((message) => (
            <li key={message.id}>{message.content}</li>
          ))}
        </ul>
      </div>
      <div>
        
      </div>
    </div>
  );
};

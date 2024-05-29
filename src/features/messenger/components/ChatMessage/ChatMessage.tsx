import { IMessage } from '@/entities/messenger';
import clsx from 'clsx';
import dayjs from 'dayjs';

type ChatMessageProps = {
  message: IMessage;
  currentUser: string;
};

const styles = {
  current: 'bg-currentUser self-end',
  opponent: 'bg-opponent self-start',
};

export const ChatMessage = ({ message, currentUser }: ChatMessageProps) => {
  const messageStyle =
    message.sender === currentUser ? styles.current : styles.opponent;

  return (
    <li
      className={clsx(
        'lg:min-w-[300px] lg:max-w-[350px] sm:min-w-[250px] sm:max-w-[300px] min-w-[175px] max-w-[200px] rounded-md py-2 px-3',
        messageStyle
      )}
    >
      <div className="flex justify-between items-center sm:text-[16px] text-[14px]">
        <p>{message.sender}</p>
        <p>{dayjs(message.timestamp).locale('ru').format('hh:mm')}</p>
      </div>
      <p className="leading-[20px] sm:text-[14px] text-[12px] font-light">{message.content}</p>
    </li>
  );
};

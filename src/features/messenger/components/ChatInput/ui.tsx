import { GoPaperclip } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';
import { Input } from '@/shared/ui';
import { useState } from 'react';

export const ChatInput = ({
  onSubmit,
}: {
  onSubmit: (message: string) => void;
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      onSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-pageNested p-3 flex gap-1.5 justify-between items-center">
        <div className="sm:h-12 sm:w-12 h-10 w-10 flex justify-center items-center p-3 rounded-full hover:bg-page duration-200 cursor-pointer">
          <GoPaperclip className="sm:text-[24px] text-[20px]" />
        </div>
        <Input
          variant="flat"
          placeholder="Введите сообщение"
          endContent={
            <button
              type="submit"
              className="hover:bg-pageNested duration-200 rounded-full h-8 w-8 p-2 flex justify-center items-center"
            >
              <IoSend className="" />
            </button>
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </form>
  );
};

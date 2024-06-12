import { GoPaperclip } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';
import { Textarea } from '@/shared/ui';
import { useState } from 'react';
import styles from './ui.module.css';

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
      <div className={styles.wrapper}>
        <button className={styles.fileBtn}>
          <GoPaperclip />
        </button>
        <Textarea
          minRows={1}
          variant="flat"
          placeholder="Введите сообщение"
          endContent={
            <button type="submit" className={styles.submitBtn}>
              <IoSend />
            </button>
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
    </form>
  );
};

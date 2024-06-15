import { IoSend } from 'react-icons/io5';
import { Textarea } from '@/shared/ui';
import { useEffect, useRef, useState } from 'react';
import styles from './ui.module.css';
import { Filepicker } from '../Filepicker';

export const ChatInput = ({
  onSubmit,
}: {
  onSubmit: (message: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      onSubmit(message);
      setMessage('');

      console.log(file); // TODO
    }
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const submitBtn = submitRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitBtn?.click();
      }
    };
    textarea?.addEventListener('keydown', handleKeyDown);
    return () => {
      textarea?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.wrapper}>
        <Filepicker setFile={setFile} />
        <Textarea
          ref={textareaRef}
          minRows={1}
          variant="flat"
          placeholder="Введите сообщение"
          endContent={
            <button type="submit" className={styles.submitBtn} ref={submitRef}>
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

import { GoPaperclip } from 'react-icons/go';
import { IoSend } from 'react-icons/io5';
import { Textarea } from '@/shared/ui';
import { useEffect, useRef, useState } from 'react';
import styles from './ui.module.css';

export const ChatInput = ({
  onSubmit,
}: {
  onSubmit: (message: string) => void;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const filepicker = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message) {
      onSubmit(message);
      setMessage('');

      console.log(file) // TODO
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFilePick = () => {
    if (filepicker.current) {
      filepicker.current.click();
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
        <button
          type="button"
          onClick={handleFilePick}
          className={styles.fileBtn}
        >
          <input
            onChange={handleFileSelect}
            ref={filepicker}
            className="hidden"
            type="file"
            accept="image/*, video/*, .pdf, .docx"
          />
          <GoPaperclip />
        </button>
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

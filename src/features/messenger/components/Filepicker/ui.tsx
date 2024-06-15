import { useRef } from 'react';
import { GoPaperclip } from 'react-icons/go';
import styles from './ui.module.css';

type Props = {
  setFile: (file: File) => void;
};

export const Filepicker = ({ setFile }: Props) => {
  const filepicker = useRef<HTMLInputElement>(null);

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

  return (
    <button type="button" onClick={handleFilePick} className={styles.fileBtn}>
      <input
        onChange={handleFileSelect}
        ref={filepicker}
        className="hidden"
        type="file"
        accept="image/*, video/*, .pdf, .docx"
      />
      <GoPaperclip />
    </button>
  );
};

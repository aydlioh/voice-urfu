import { Chat } from '@/widgets';
import styles from './ui.module.css';

const ChatPage = () => {
  return (
    <section className={styles.container}>
      <Chat />
    </section>
  );
};

export default ChatPage;

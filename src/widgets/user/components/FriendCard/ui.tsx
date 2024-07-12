import { FriendCardTools } from '@/features/friends';
import styles from './ui.module.css';

type Props = {
  user: {
    imgSrc?: string;
    id: string | number;
    username: string;
    fullname: string;
  };
  endContent?: React.ReactNode;
};

export const FriendCard = ({ user, endContent }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardInfoWrapper}>
          <div className={styles.imgWrapper}>
            <img
              src='https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg'
              alt='avatar'
              className={styles.avatar}
            />
          </div>
          <div>
            <h5 className={styles.fullname}>{user.fullname}</h5>
            <p className={styles.username}>{user.username}</p>
          </div>
        </div>
        <div className={styles.toolsWrapper}>
          {endContent}
          <FriendCardTools user={user} />
        </div>
      </div>
    </div>
  );
};

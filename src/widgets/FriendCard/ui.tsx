import { FriendCardTools } from '@/features/user';
import styles from './ui.module.css';

type Props = {
  user: {
    imgSrc: string;
    login: string;
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
            <img src={user.imgSrc} alt="avatar" className={styles.avatar} />
          </div>
          <div>
            <h5 className={styles.fullname}>{user.fullname}</h5>
            <p className={styles.login}>{user.login}</p>
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

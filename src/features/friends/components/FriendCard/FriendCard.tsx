import { FriendCardTools } from '@/features/friends';
import styles from './FriendCard.module.css';

type Props = {
  user: {
    imgSrc?: string;
    id: string | number;
    username: string;
    fullname: string;
  };
  endContent?: React.ReactNode;
  withDelete?: boolean;
};

export const FriendCard = ({ user, endContent, withDelete = false }: Props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardInfoWrapper}>
          <div className={styles.imgWrapper}>
            <img
              src='https://avatars.mds.yandex.net/get-entity_search/44973/850162673/orig'
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
          <FriendCardTools withDelete={withDelete} user={user} />
        </div>
      </div>
    </div>
  );
};

import { SearchInput } from '@/shared/ui';
import { BsTelephoneFill } from 'react-icons/bs';
import { RiSettings5Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@/features/sidebar';
import styles from './ui.module.css';

const mockUser = {
  imgSrc:
    'https://chudo-prirody.com/uploads/posts/2023-04/1682578522_chudo-prirody-com-p-kak-spit-panda-foto-1.jpg',
};

export const ChatTools = ({ userName }: { userName: string | undefined }) => {
  const navigate = useNavigate();

  const handleVideocall = () => {
    navigate('videocall');
  };

  return (
    <div className={styles.toolsWrapper}>
      <div className={styles.innerWrapper}>
        <BackButton to='/messenger' />
        <div className={styles.userInfoWrapper}>
          <img src={mockUser.imgSrc} alt='avatar' className={styles.userImg} />
          <h3>{userName}</h3>
        </div>
      </div>
      <div className={styles.innerWrapper}>
        <SearchInput placeholder='Поиск' className={styles.search} size='md' />
        <div className={styles.btnsWrapper}>
          <button onClick={handleVideocall} className={styles.btn}>
            <BsTelephoneFill className={styles.telephoneIcon} />
          </button>
          <button className={styles.btn}>
            <RiSettings5Fill className={styles.settingsIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

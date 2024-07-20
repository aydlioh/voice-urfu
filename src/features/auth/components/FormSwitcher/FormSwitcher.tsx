import { PandaSvg } from '@/shared/assets/svgs';
import { Link } from 'react-router-dom';
import styles from './FormSwitcher.module.css';

type FormSwitcherProps = {
  title: string;
  subtitle: string;
  linkTo: string;
};

export const FormSwitcher = ({
  title,
  subtitle,
  linkTo,
}: FormSwitcherProps) => {
  return (
    <div className={styles.formSwitcherWrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.triangle}>
          <p>{title}</p>
          <Link className={styles.link} to={linkTo}>
            {subtitle}
          </Link>
        </div>
      </div>
      <div className={styles.imgWrapper}>
        <img src={PandaSvg} alt="Panda" />
      </div>
    </div>
  );
};

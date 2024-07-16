import { FaSearch } from 'react-icons/fa';
import { Input, InputProps } from '../Input';
import styles from './ui.module.css';

export const SearchInput = (props: InputProps) => {
  return (
    <Input
      color='primary'
      size='lg'
      {...props}
      startContent={
        <button type='submit'>
          <FaSearch className={styles.searchIcon} />
        </button>
      }
      isClearable
      autoComplete='off'
    />
  );
};

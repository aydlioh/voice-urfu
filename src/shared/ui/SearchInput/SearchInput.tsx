import { FaSearch } from 'react-icons/fa';
import { Input, InputProps } from '../Input';
import styles from './SearchInput.module.css';
import { useState } from 'react';
import { useDebounce } from '@/shared/hooks';

type SearchInputProps = InputProps & {
  setDebounceValue: (v: string | null) => void;
};

export const SearchInput = ({
  setDebounceValue,
  ...props
}: SearchInputProps) => {
  const [value, setValue] = useState<string | null>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setDebounceValue(null);
    setValue(null);
  };

  useDebounce<string| null>(value, setDebounceValue);

  return (
    <Input
      value={value ?? ''}
      onChange={handleChange}
      onClear={handleClear}
      color="primary"
      size="lg"
      isClearable
      {...props}
      startContent={
        <button type="submit">
          <FaSearch className={styles.searchIcon} />
        </button>
      }
      autoComplete="off"
    />
  );
};

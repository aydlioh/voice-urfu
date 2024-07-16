import { SearchInput } from '@/shared/ui';
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ui.module.css';

export const ChatSearch = () => {
  // TODO Когда будет работать список чатов, нужно переделать на поиск по этому списку и убрать функциональность перехода на другую страницу.
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(search);
    setSearch('');
  };

  const handleClear = () => {
    setSearch('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className={styles.formSearch}>
      <SearchInput
        value={search}
        onClear={handleClear}
        onChange={handleChange}
        placeholder='Название чата'
      />
    </form>
  );
};

import { SearchInput } from '@/shared/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChatSearch = () => {
  // TODO Когда будет работать список чатов, нужно переделать на поиск по этому списку и убрать функциональность перехода на другую страницу.
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(search);
    setSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-row gap-2">
      <SearchInput
        placeholder="Название чата"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

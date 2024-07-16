import { useMediaQuery } from '@/shared/hooks';
import { Tabs } from '@/shared/ui';
import { Tab } from '@nextui-org/react';
import { Key } from 'react';

type Props = {
  selected: 'pending' | 'accepted' | 'refused';
  setSelected: (value: 'pending' | 'accepted' | 'refused') => void;
};

export const OutgoingRequestSwitcher = ({ selected, setSelected }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 435px)' });
  const handleSelect = (key: Key) => {
    setSelected(key as 'pending' | 'accepted' | 'refused');
  };

  return (
    <div className='flex sm:justify-start justify-center items-center'>
      <Tabs
        size={isMobile ? 'md' : 'lg'}
        selectedKey={selected}
        onSelectionChange={handleSelect}
      >
        <Tab key='pending' title='Ожидающие' />
        <Tab key='accepted' title='Принятые' />
        <Tab key='refused' title='Отклоненные' />
      </Tabs>
    </div>
  );
};

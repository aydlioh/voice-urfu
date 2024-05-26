import { ChatSearch } from '@/features/messenger';
import clsx from 'clsx';

export const ChatList = ({ isChat = false }: { isChat?: boolean }) => {
  return (
    <aside
      className={clsx(
        'bg-sidebarNested md:max-w-[260px] w-full text-secondary',
        {
          'md:flex hidden': isChat,
        }
      )}
    >
      <div className="p-4">
        <ChatSearch />
        <ul></ul>
      </div>
    </aside>
  );
};

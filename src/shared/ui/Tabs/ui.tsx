import { Tabs as TabsNextUI, TabsProps } from '@nextui-org/react';

export const Tabs = (props: TabsProps) => {
  return <TabsNextUI
    classNames={{
      tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-divider',
      cursor: 'w-full bg-[#22d3ee]',
      tab: 'max-w-fit px-0 h-12',
      tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
    }}
    {...props}
  />;
};

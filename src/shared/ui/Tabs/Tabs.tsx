import {
  extendVariants,
  Tabs as TabsNextUI,
  TabsProps,
} from '@nextui-org/react';

export const Tabs = extendVariants(TabsNextUI, {
  variants: {
    variant: {
      underlined: {
        tabList:
          'gap-6 w-full relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full bg-accent',
        tab: 'max-w-fit px-0 h-12',
        tabContent: 'group-data-[selected=true]:text-accent text-secondary',
      },
    },
  },
  defaultVariants: {
    variant: 'underlined',
    size: 'lg',
  },
});

export type { TabsProps };

import {
  extendVariants,
  Tooltip as TooltipNextUI,
  TooltipProps,
} from '@nextui-org/react';

export const Tooltip = extendVariants(TooltipNextUI, {
  variants: {
    color: {
      primary: {
        content: 'bg-pageNested',
        base: 'before:bg-pageNested',
      },
    },
    placement: {
      'bottom-end': {
        base: 'data-[placement=bottom-end]:before:right-[17px]',
      },
    },
  },
  defaultVariants: {
    color: 'primary',
    radius: 'sm',
    size: 'lg',
  },
});

export type { TooltipProps };

import { RefObject, useEffect } from 'react';

type Handler = (e: MouseEvent) => void;

export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  handler: Handler,
  ref: RefObject<T>,
  isOpen: boolean
): void => {
  useEffect(() => {
    const handleEvent = (e: MouseEvent) => {
      e.stopPropagation()
      const el = ref?.current;

      if (!el || el.contains(e.target as Node)) {
        return;
      }

      handler(e);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleEvent);

      return () => {
        document.removeEventListener('mousedown', handleEvent);
      };
    }
  }, [handler, ref, isOpen]);
};

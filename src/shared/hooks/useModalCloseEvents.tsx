import { useEffect, useRef } from 'react';

type Props = {
  close: () => void;
  isOpen: boolean;
};

export const useModalCloseEvents = ({ close, isOpen }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    const handleEvent = (e: MouseEvent) => {
      e.stopPropagation();
      const modal = modalRef?.current;
      const container = containerRef?.current;

      if (
        !modal ||
        modal.contains(e.target as Node) ||
        !container ||
        container.contains(e.target as Node)
      ) {
        return;
      }

      close();
    };

    if (isOpen) {
      document.addEventListener('keyup', handleKeyPress);
      document.addEventListener('mousedown', handleEvent);

      return () => {
        document.removeEventListener('keyup', handleKeyPress);
        document.removeEventListener('mousedown', handleEvent);
      };
    }
  }, [close, modalRef, isOpen]);

  return { containerRef, modalRef };
};

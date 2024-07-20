import { useModalCloseEvents } from '@/shared/hooks';
import { Tooltip } from '@/shared/ui';

type Props = {
  close: () => void;
  isOpen: boolean;
  content: React.ReactNode;
  children: React.ReactNode;
};

export const FriendTooltip = ({ close, isOpen, content, children }: Props) => {
  const { modalRef, containerRef } = useModalCloseEvents({
    close,
    isOpen,
  });

  return (
    <div ref={containerRef} className="relative">
      <Tooltip
        placement="bottom-end"
        showArrow
        isOpen={isOpen}
        content={<div ref={modalRef}>{content}</div>}
      >
        {children}
      </Tooltip>
    </div>
  );
};

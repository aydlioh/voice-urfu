import { useLogout } from '@/entities/auth';
import { useModal } from '@/entities/modal';
import { PandaLogoutSvg } from '@/shared/assets/svgs';
import { Button } from '@/shared/ui';
import {
  Modal as ModalNextUI,
  ModalBody,
  ModalContent,
} from '@nextui-org/react';
import { useEffect } from 'react';

export const Modal = () => {
  const { isOpen, close } = useModal();
  const { logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    return () => {
      close();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalNextUI placement="center" size="xl" isOpen={isOpen} onClose={close}>
      <ModalContent>
        <ModalBody>
          <div className="py-5">
            <div className="flex flex-row justify-center items-center gap-1">
              <div>
                <img src={PandaLogoutSvg} alt="panda logout" />
              </div>
              <div className="max-w-[300px] w-full">
                <h3 className="font-minecraft sm:text-[30px] text-[24px] text-center">
                  Выйти из аккаунта?
                </h3>
              </div>
            </div>
            <div className="flex flex-row px-4 gap-3 mt-10">
              <Button
                isLoading={isPending}
                onClick={handleLogout}
                className="w-1/2"
                color="primary"
              >
                Да, выйти
              </Button>
              <Button
                onClick={close}
                className="w-1/2"
                variant="bordered"
                color="primary"
              >
                Отмена
              </Button>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </ModalNextUI>
  );
};

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
import styles from './ui.module.css';

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
    <ModalNextUI placement='center' size='xl' isOpen={isOpen} onClose={close}>
      <ModalContent>
        <ModalBody>
          <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
              <div>
                <img src={PandaLogoutSvg} alt='panda logout' />
              </div>
              <div className={styles.titleWrapper}>
                <h3 className={styles.title}>Выйти из аккаунта?</h3>
              </div>
            </div>
            <div className={styles.btnsWrapper}>
              <Button
                isLoading={isPending}
                onClick={handleLogout}
                className='w-1/2'
              >
                Да, выйти
              </Button>
              <Button
                onClick={close}
                className='w-1/2'
                variant='bordered'
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

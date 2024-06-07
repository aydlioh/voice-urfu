import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from './modalSlice';
import { RootState } from '@/app/redux';

export const useModal = () => {
  const { isOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const open = () => {
    dispatch(openModal());
  };

  const close = () => {
    dispatch(closeModal());
  };

  return { isOpen, open, close };
};

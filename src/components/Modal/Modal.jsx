import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';
import IconButton from 'components/shared/IconButton';
import { Backdrop, ModalWindow } from './Modal.styled';
import useLockBodyScroll from './useLockBodyScroll';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClick, children }) => {
  const closeModal = useCallback(
    ({ code, target, currentTarget }) => {
      if (target === currentTarget || code === 'Escape') {
        onClick();
      }
    },
    [onClick]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal, onClick]);

  useLockBodyScroll();

  return createPortal(
    <Backdrop onClick={closeModal}>
      <ModalWindow>
        <IconButton
          icon={CgClose}
          iconSize={20}
          ariaLable="close button"
          onClick={onClick}
          round={true}
        />
        {children}
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
};

export default Modal;

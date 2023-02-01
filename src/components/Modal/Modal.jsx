import { Component } from 'react';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';
import { InfinitySpin } from 'react-loader-spinner';
import IconButton from 'components/shared/IconButton';
import theme from 'theme';
import { Backdrop, ModalWindow } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { onClick } = this.props;
    if (e.code === 'Escape') {
      onClick();
    }
  };

  handleBackdropClick = e => {
    const { onClick } = this.props;
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  render() {
    const { onClick, children } = this.props;
    return createPortal(
      <Backdrop onClick={e => this.handleBackdropClick(e)}>
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
  }
}

export default Modal;

import React, { useCallback, useEffect } from 'react';
import  {createPortal}  from 'react-dom';
import PropTypes from 'prop-types';
import style from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({onClose, largeImage}) => {
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        return onClose();
      }
    },[onClose]
  ) 

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown);
  },[handleKeyDown])

    return createPortal(
      <div className={style.Overlay} onClick={handleBackdropClick}>
        <div className={style.Modal}>
          <img src={largeImage} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
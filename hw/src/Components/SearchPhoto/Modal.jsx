import React, { useEffect } from 'react';

const Modal = ({ imageURL, closeModal }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={imageURL} alt="Enlarged content" />
      </div>
    </div>
  );
};

export default Modal;

import { ModalProps } from '@shared/interfaces';
import './Modal.scss';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
    return (
      <div className="modal-overlay" role="dialog" aria-modal="true" onClick={handleOverlayClick}>
        <div className="modal">
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
          <div className="modal-header">
            <h2 className="modal-title">Detalles</h2>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    );
  };

export default Modal;
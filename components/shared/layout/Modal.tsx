import styles from "./Modal.module.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  color?: string;
};

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  color = "var(--snackbar-error-color)",
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          <button className="action-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`action-button ${styles.confirmButton}`}
            onClick={onConfirm}
            style={{ backgroundColor: color, borderColor: color }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

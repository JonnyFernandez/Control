// ModalLanding.jsx
import styles from './Modal.module.css';

export const Modal = ({ isOpen, toggleOpen, children }) => (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} onClick={toggleOpen}>
        <div className={styles.modal}>{children}</div>
    </div>
);

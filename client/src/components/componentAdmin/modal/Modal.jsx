// ModalLanding.jsx
import styles from './Modal.module.css';

const Modal = ({ isOpen, toggleOpen, children }) => (

    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}  >

        <div className={styles.modal} >
            <button onClick={toggleOpen}>x</button>
            {children}
        </div>

    </div>
);


export default Modal
// ModalLanding.jsx
import styles from './Modal.module.css';

const Modal = ({ isOpen, toggleOpen, children }) => {

    return (

        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}  >

            <button onClick={toggleOpen} className={styles.close}>X</button>
            <div className={styles.modal} >
                {children}
            </div>

        </div>
    )
};


export default Modal
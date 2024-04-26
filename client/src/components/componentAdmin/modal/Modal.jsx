// ModalLanding.jsx
import styles from './Modal.module.css';

const Modal = ({ isOpen, toggleOpen }) => (

    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`} >

        <div className={styles.modal}>
            <button onClick={toggleOpen}>x</button>
            <label htmlFor="">Nombre</label>
            <label htmlFor="">image</label>
            <label htmlFor="">description</label>
            <label htmlFor="">brand</label>
            <label htmlFor="">distributor</label>
            <label htmlFor="">stock</label>
            <label htmlFor="">cost</label>
            <label htmlFor="">off</label>
            <label htmlFor="">category</label>
            <label htmlFor="">iva</label>
            <label htmlFor="">iibb</label>
            <label htmlFor="">others</label>
            <label htmlFor="">gain</label>
        </div>

    </div>
);


export default Modal
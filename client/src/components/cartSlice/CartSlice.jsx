import { useState } from 'react';
import styles from './CartSlice.module.css';
import ShoppingCard from '../shoppingCardSlice/ShoppingCard';
import { useSelector, useDispatch } from 'react-redux';
import { cleanCart } from '../../redux/prodSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'


const CartSlice = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);
    const cart = useSelector(state => state.prod.shoppingCart)

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };


    const showCards = () => {
        if (cart.length >= 1) {
            return cart.map(item => (
                <div key={item.id}>
                    <ShoppingCard id={item.id} name={item.name} price={item.price} image={item.image} stock={item.stock} />
                </div>
            ));
        } else {
            return <h2>No hay Productos que mostrar </h2>;
        }
    }
    // volver a cargar los prod desde el back y hacer un dispatca con la info
    const cleanShoppingCard = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres limpiar el carrito? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, limpiar carrito'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, limpiar el carrito
                setIsOpen(!isOpen);
                dispatch(cleanCart());
                localStorage.removeItem('cart');
                navigate('/login')
                Swal.fire(
                    '¡Limpieza exitosa!',
                    'El carrito ha sido limpiado.',
                    'success'
                );
            }
        });
    }
    return (
        <div className={`${styles.cartSlice} ${isOpen ? styles.open : ''}`}>
            <button className={styles.toggleButton} onClick={toggleCart}>
                {isOpen ? 'Cerrar Carrito' : 'Abrir Carrito'}
            </button>
            <div className={styles.content}>
                <h2>Carrito</h2>
                <div className={styles.items}>
                    {showCards()}



                </div>
                <div className={styles.footer}>
                    <div className={styles.total}> <h3>Total</h3> </div>
                    <div className={styles.buttons}>
                        <h3 onClick={cleanShoppingCard}> vaciar carrito</h3>
                        <h3> pagar</h3>
                    </div>
                    <p>Wsp para envios</p>
                </div>
            </div>
        </div>
    );
};

export default CartSlice;

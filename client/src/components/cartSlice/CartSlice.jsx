import { useEffect, useState } from 'react';
import styles from './CartSlice.module.css';
import ShoppingCard from '../shoppingCardSlice/ShoppingCard';
import { useSelector, useDispatch } from 'react-redux';
import { cleanCart, priceFinal } from '../../redux/prodSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';


const CartSlice = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const [isOpen, setIsOpen] = useState(false);
    const { shoppingCart, prodQuantity } = useSelector(state => state.prod)
    const [refresh, setRefresh] = useState(true)

    console.log(prodQuantity);
    useEffect(() => {
        dispatch(priceFinal())
    }, [dispatch])

    const toggleCart = () => {
        if (!isAuthenticated) {
            Swal.fire({
                title: 'Debes estar registrado',
                text: 'Debes estar registrado para comprar en la plataforma.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ir al inicio de sesión'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirige al usuario al inicio de sesión
                    window.location.href = '/login';
                }
            });
            return; // Termina la ejecución de la función si no está autenticado
        }
        setIsOpen(!isOpen);
        dispatch(priceFinal())
        { isOpen && navigate('/login') }
    };


    const showCards = () => {
        if (shoppingCart.length >= 1) {
            return shoppingCart.map(item => (
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

    const total = () => {
        let num = 0;
        for (let i = 0; i < prodQuantity.length; i++) {
            const product = shoppingCart.find(item => item.id === prodQuantity[i].id);
            if (product) num += prodQuantity[i].count * product.price

        }
        return num
    }
    let totalPrice = total()
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

                    <div className={styles.total} onClick={() => setRefresh(prev => !prev)}>
                        {refresh && <h4>Total: ${totalPrice.toLocaleString('es-ES')}</h4>}
                    </div>

                    <div className={styles.buttons}>
                        <h3 onClick={cleanShoppingCard} className={styles.itemButton1}> vaciar carrito</h3>
                        <h3 className={styles.itemButton2}> pagar</h3>
                    </div>
                    <p>Wsp para envios</p>
                </div>
            </div>
        </div>
    );
};

export default CartSlice;

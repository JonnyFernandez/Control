import { useState } from 'react';
import styles from './CartSlice.module.css';
import ShoppingCard from '../shoppingCardSlice/ShoppingCard';
import { useSelector, useDispatch } from 'react-redux';
import { cleanCart } from '../../redux/prodSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { api_post_cart } from '../../api/prod';

const CartSlice = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const [isOpen, setIsOpen] = useState(false);
    const { shoppingCart, prodQuantity } = useSelector(state => state.prod)

    console.log(prodQuantity);

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
                    navigate('/login');
                }
            });
            return; // Termina la ejecución de la función si no está autenticado
        }
        setIsOpen(!isOpen);
        if (isOpen) {
            navigate('/login');
        }
    };

    const showCards = () => {
        if (shoppingCart.length >= 1) {
            return shoppingCart.map(item => (
                <div key={item.id}>
                    <ShoppingCard id={item.id} name={item.name} price={item.price} image={item.image} stock={item.stock} />
                </div>
            ));
        } else {
            return <h2 className={styles.empty}>No hay Productos que mostrar </h2>;
        }
    }

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
                dispatch(cleanCart());
                localStorage.removeItem('cart');
                localStorage.removeItem('quanty');
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
            if (product) num += prodQuantity[i].count * product.price;
        }
        return num;
    };
    const totalPrice = total();

    const pay = async () => {
        try {
            const aux = await api_post_cart({ items: prodQuantity, total: totalPrice });
            // console.log(aux.data);
            if (aux.status === 201) {
                dispatch(cleanCart());
                localStorage.removeItem('cart');
                localStorage.removeItem('quanty');

                Swal.fire({
                    title: '¡Compra realizada!',
                    text: '¡Tu compra se ha completado exitosamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/login');
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    let prodNumber = shoppingCart.length > 0 ? shoppingCart.length : ''
    return (
        <div className={`${styles.cartSlice} ${isOpen ? styles.open : ''} `}>
            <button className={styles.toggleButton} onClick={toggleCart}>
                {isOpen
                    ? "✖️"
                    : <div className={styles.cartIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-cart4" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                        </svg>
                        <p className={styles.numProds}>{prodNumber}</p>
                    </div>

                }
            </button>
            <div className={styles.content}>
                <div className={styles.titleCart}>Carrito</div>
                <div className={styles.items}>
                    {showCards()}
                </div>
                <div className={styles.footer}>
                    <div className={styles.total}>
                        <h4>Total: ${totalPrice.toLocaleString('es-ES')}</h4>
                    </div>
                    <div className={styles.buttons}>
                        <h3 className={styles.itemButton2} onClick={pay}>Pagar</h3>
                        <h4 onClick={cleanShoppingCard} className={styles.itemButton1}>Vaciar Carrito</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSlice;

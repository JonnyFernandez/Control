import { useState } from 'react';
import styles from './CartSlice.module.css';
import ShoppingCard from '../shoppingCardSlice/ShoppingCard';

const CartSlice = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    let cart = [
        {
            id: 1,
            name: "Johnny walker black label",
            image: "https://i.pinimg.com/564x/44/a6/a7/44a6a7fcc7ea3c53c9a7a2b80cc955f8.jpg",
            price: 123.12,
            stock: 22
        },
        {
            id: 2,
            name: "Chivas regal mizunara 700 cc",
            image: "https://carrefourar.vtexassets.com/arquivos/ids/186088-800-auto?v=637468596382930000&width=800&height=auto&aspect=true",
            price: 123.12,
            stock: 22
        },

    ]

    const showCards = () => {
        if (cart.length >= 1) {
            return cart.map(item => (
                <div key={item.id}>
                    <ShoppingCard id={item.id} name={item.name} price={item.price} image={item.image} status={item.stock} />
                </div>
            ));
        } else {
            return <h2>No hay Productos que mostrar </h2>;
        }
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
                        <h3> vaciar carrito</h3>
                        <h3> pagar</h3>
                    </div>
                    <p>Wsp para envios</p>
                </div>
            </div>
        </div>
    );
};

export default CartSlice;

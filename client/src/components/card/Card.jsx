import React from "react";
import { Link } from 'react-router-dom';
import style from './Card.module.css';
import { useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/slices/productsData';

const Card = (products) => {
    const { id, name, price, image } = products;

    const dispatch = useDispatch();
    const handleAddToCart = () => {
        // dispatch(addToCart(products));
        alert('cart')
    };

    return (
        <div className={style.card}>
            <div className={style.cardContent}>
                <Link to={`/detail/${id}`} className={`${style['text-decoration-none']}`}>
                    <img src={image} alt="product" className={style.image} />
                    <div className={style.textcenter}>
                        <h4>{name}</h4>
                        <p>Precio: {price}</p>
                    </div>
                </Link>
                <button className={`${style.buttonCard} ${style.addEffect}`} onClick={handleAddToCart}>Añadir</button>
            </div>
        </div>
    );
}

export default Card;
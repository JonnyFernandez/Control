import React from 'react';
import c from './Card2.module.css';
import { NavLink } from 'react-router-dom'

const Card2 = (props) => {
    const { id, code, name, price, category, stock, likes, reviews } = props;
    let stockStyle = c.cardList;

    if (stock < 10 && stock > 0) {
        stockStyle = c.cardListYellow;
    } else if (stock <= 0) {
        stockStyle = c.cardListRed;
    }

    return (
        <div className={`${c.card} ${stockStyle}`}>
            <div className={c.item1}>Cod: {code || "Codigo"}</div>
            <div className={c.item1}>{name || "Nombre"}</div>
            <div className={c.item1}>Precio: {price || "Sin Precio"}</div>
            <div className={c.item1}>Categoria: {category || "Categoria"}</div>
            <div className={c.item1}>Stock: {stock}</div>
            <div className={c.item1}>Like: {likes.length}</div>
            <div className={c.item1}>Reseña: {reviews.length}</div>
            <div className={c.item1}> <NavLink to={`/details-card2/${id}`}>detalle</NavLink> </div>
        </div>
    );
};

export default Card2;

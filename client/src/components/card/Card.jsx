import React, { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import style from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav, addCart, removeCard, addQuantity, deleteQuantity } from "../../redux/prodSlice";
import { api_Like, api_DisLike } from "../../api/prod";
import { useAuth } from '../../context/AuthContext'
import Swal from 'sweetalert2'


const Card = (products) => {
    const { isAuthenticated } = useAuth()
    const { id, name, price, image, stock } = products;


    const data = {
        "id": id,
        "count": 1
    }
    // console.log(data);
    const numeroFormateado = Number(price).toLocaleString('es-ES');
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
    const storedQuantity = JSON.parse(localStorage.getItem('quanty')) || [];

    const dispatch = useDispatch();
    const { favorites, shoppingCart, } = useSelector(state => state.prod)

    const [fav, setFav] = useState(false)
    const [cart, setCart] = useState(false)
    // post like


    useEffect(() => {
        favorites.forEach((el) => {
            if (el.id === id) {
                setFav(true);
            }
        });
    }, [favorites]);

    useEffect(() => {
        shoppingCart.forEach((item) => {
            if (item.id === id) {
                setCart(true);
            }
        });
    }, [shoppingCart]);



    const handleFav = async () => {
        if (!isAuthenticated) {
            Swal.fire({
                title: 'Debes estar registrado',
                text: 'Debes estar registrado para operar en la plataforma.',
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
        if (fav) {
            setFav(false)
            dispatch(removeFav(id))
            await api_DisLike(id)
        } else {
            setFav(true)
            dispatch(addFav(products))
            await api_Like(data)

        };

        const updatedFav = fav
            ? storedFav.filter(item => item.id !== id)
            : [...storedFav, products];
        localStorage.setItem('fav', JSON.stringify(updatedFav));
    };


    const handleCart = () => {
        if (!isAuthenticated) {
            Swal.fire({
                title: 'Debes estar registrado',
                text: 'Debes estar registrado para operar en la plataforma.',
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
        if (cart) {
            setCart(false)
            dispatch(removeCard(id))
            dispatch(deleteQuantity(id))

        } else {
            setCart(true)
            dispatch(addCart({ id, name, price, image, stock, quanty: 1 }))
            dispatch(addQuantity(data))
        }

        const updatedCart = cart
            ? storedCart.filter(item => item.id !== id)
            : [...storedCart, products];
        const updatedQuanty = cart
            ? storedQuantity.filter(item => item.id !== id)
            : [...storedQuantity, data];

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        localStorage.setItem('quanty', JSON.stringify(updatedQuanty));
    }



    return (
        <div className={style.card}>
            <div className={style.cardContent}>
                <Link to={`/detail/${id}`} className={`${style['text-decoration-none']}`}>
                    {image ? <img src={image} alt="product" className={style.image} /> : <img src="https://i.pinimg.com/564x/c9/36/cd/c936cdc3b4004f05bf4f5cfa0a671524.jpg" alt="image" className={style.image} />}
                    <div className={style.textcenter}>
                        <h4>{name}</h4>
                        {<p>Precio: {numeroFormateado}</p>}

                    </div>
                </Link>
                <div>
                    {<button className={`${style.buttonChat} ${style.ChatEffect}`} value={'review'} onClick={handleCart}>
                        {cart
                            ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(41, 132, 244)" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            )
                            : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            )
                        }
                    </button>}
                    <NavLink to={`/detail/${id}`} className={style.buy}>
                        <button className={`${style.buttonCard} ${style.addEffect}`}  >
                            Comprar
                        </button>
                    </NavLink>
                    {<button className={`${style.buttonChat} ${style.ChatEffect}`} value={'mark'} onClick={handleFav}>
                        {
                            fav ?
                                (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="rgb(41, 132, 244)" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>)
                                : (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                </svg>)
                        }
                    </button>}
                </div>


            </div>
        </div>
    );
}

export default Card;
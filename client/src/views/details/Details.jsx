import z from './Details.module.css';
import { useParams, NavLink } from "react-router-dom";
import { postDetails, removeCard, addCart } from '../../redux/prodSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { api_prod_details, api_post_review, api_post_cart } from '../../api/prod';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';

const Details = () => {
    const { id } = useParams();

    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const { isAuthenticated } = useAuth()

    const [data, setData] = useState();
    const [cart, setCart] = useState(false)
    const [update, setUpdate] = useState(0)
    const [openComments, setOpenComments] = useState(false);
    const [quantityOptions, setQuantityOptions] = useState([]);
    const [commentInputOpen, setCommentInputOpen] = useState(false);


    const { details, shoppingCart } = useSelector(state => state.prod)
    const uniqueLikes = new Set(details.likes?.map(like => like.like));
    const numUniqueLikes = uniqueLikes.size > 0 ? uniqueLikes.size : '';
    const prodComment = details.reviews?.length || ''
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];

    // console.log(shoppingCart);

    useEffect(() => {
        shoppingCart.forEach((item) => {
            if (item.id === Number(id)) {
                setCart(true);
            }
        });
    }, [shoppingCart, dispatch]);

    const handleQuantity = (event) => {
        const { value } = event.target
        setData(
            value
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api_prod_details(id);
                dispatch(postDetails(res.data));
                const options = Array.from({ length: res.data.stock }, (_, i) => i + 1);
                setQuantityOptions(options);
            } catch (error) {
                console.log(`Error en componente Details: ${error}`);
            }
        };

        fetchData();
    }, [dispatch, id, commentInputOpen, update]);

    const handleCommentToggle = () => {

        if (details.reviews.length === 0) {
            Swal.fire({
                title: 'Este producto aún no tiene comentarios',
                text: '¿Quieres ser el primero en comentar?',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    setCommentInputOpen(true);
                    setOpenComments(true);
                }
            });
        } else {
            setOpenComments(prev => !prev);
        }
    };

    const handleCommentInputChange = () => {
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

                    window.location.href = '/login';
                }
            });
            return;
        }
        setCommentInputOpen(prev => !prev);
    };

    const onSubmit = async (values) => {
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

                    window.location.href = '/login';
                }
            });
            return;
        }
        // Mostrar SweetAlert para confirmar
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres crear este comentario?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const aux = await api_post_review({ review: values.comment, productId: Number(id) });
                // Limpiar el textarea después de enviar el comentario
                reset();
                setCommentInputOpen(false);
                // Mostrar mensaje de éxito
                Swal.fire({
                    title: '¡Comentario creado!',
                    text: 'Tu comentario se ha enviado correctamente.',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
        });
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

                    window.location.href = '/login';
                }
            });
            return;
        }
        if (cart) {
            setCart(false)
            dispatch(removeCard(Number(id)))

        } else {
            setCart(true)
            dispatch(addCart({ id: details.id, name: details.name, price: details.price, image: details.image, stock: details.stock, }))
        }

        const updatedCart = cart
            ? storedCart.filter(item => item.id !== Number(id))
            : [...storedCart, { id: details.id, name: details.name, price: details.price, image: details.image, stock: details.stock, }];

        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    const priceProd = Number(details.price)
    const quantityProd = Number(data)
    const totalMount = priceProd * (quantityProd ? quantityProd : 1)

    const handleBuy = async () => {
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
                    window.location.href = '/login';
                }
            });
            return;
        }
        if (!data || data === 0) {
            Swal.fire({
                title: 'Ingresar Cantidad',
                text: 'Debes ingresar la cantidad que deseas de este producto.',
                icon: 'warning',
            });
            return;
        }
        let info = { items: [{ id: Number(id), count: Number(data) }], total: totalMount };
        try {
            const aux = await api_post_cart(info);
            // console.log(aux.data);
            setUpdate(prev => prev + 1);

            Swal.fire({
                title: 'Compra Exitosa',
                text: '¡Gracias por tu compra!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ir al inicio',
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    window.location.href = '/home';
                }
            });
        } catch (error) {
            console.log(error.response.data);
            if (error.response.status === 401) {
                Swal.fire({
                    title: 'Error de autenticación',
                    text: 'Debe iniciar sesión con su nombre de usuario y contraseña.',
                    footer: 'Contacte a soporte técnico: arcancode@gmail.com',
                });
            }
        }
    };


    return (
        <div className={z.Details}>
            <div className={z.header}>
                <NavLink to={'/home'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#fffcf6" className="bi bi-arrow-left-square" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
                    </svg>
                </NavLink>
                <div className={z.titleContainer}>
                    <h2 className={z.title1}>{details.name}</h2>
                </div>
                <div div className={z.imageIcon}>
                    <img src="../../IconOrange.ico" alt="" />
                </div>
            </div>
            <div className={z.body}>
                <div className={z.prodContainer}>
                    <div className={z.left}>
                        <img src={details.image || "https://i.pinimg.com/564x/c9/36/cd/c936cdc3b4004f05bf4f5cfa0a671524.jpg"} alt="" />
                        <div className={z.code}>Cod: {details.code}</div>
                        {details.off !== 0 && <div className={z.off}>Descuento: {details.off * 100}%</div>}
                        <div className={z.icons}>
                            <div className={z.likes}>
                                <div ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                </svg></div>
                                <div className={z.numberLike}>{numUniqueLikes}</div>
                            </div>
                            <div onClick={handleCommentInputChange} className={z.comment}>Comentar</div>
                            <div className={z.addComment} onClick={handleCommentToggle}>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                                    </svg>
                                </div>
                                <div className={z.commentNumber}>{prodComment}</div>
                            </div>
                        </div>
                    </div>
                    <div className={z.right}>
                        <div className={z.infoProd}>
                            <h4 className={z.Inside}>{details.description}</h4>
                            <div className={z.Inside}>Categoria: {details.category}</div>
                            {details.off !== 0 && <div className={z.InsideR}>Precio Real: ${Number(details.realPrice).toLocaleString('es-ES')}</div>}
                            <div className={z.Inside}>Precio: ${Number(details.price).toLocaleString('es-ES')}</div>
                            {details.off !== 0 && <div className={z.Inside}>Ahorros en cada unidad: ${details.discount}</div>}
                            <div className={z.Inside}>Stock: {details.stock}</div>
                            <div className={z.divQuanty}>
                                <div>Cantidad:</div>
                                <select name="quantity" id="quantity" onChange={handleQuantity}>
                                    <option value="">Cantidad</option>
                                    {quantityOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={z.total}>Total: $ {totalMount.toLocaleString('es-ES')}</div>
                        </div>
                        {
                            cart
                                ? <button className={z.addToCart} onClick={handleCart}>Agregado al Carrito ☑️</button>
                                : <button className={z.addToCart} onClick={handleCart}>Agregar al carrito</button>
                        }
                        <button className={z.comprar} onClick={handleBuy}>Comprar ahora</button>
                    </div>
                </div>
            </div>
            <div className={`${z.overlay} ${commentInputOpen ? z.open : ''}`}>
                <button onClick={handleCommentInputChange} className={z.close}>X</button>
                <div className={z.modal}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="comment">Ingresar comentario</label>
                        <textarea
                            className={z.textareaModal}
                            {...register('comment', { required: true })}
                            placeholder="Escribe tu comentario aquí"
                        />
                        <button className={z.sendComment} type="submit">Comentar</button>
                    </form>
                </div>
            </div>
            {
                openComments && (
                    <div className={z.allReviews}>
                        {details.reviews.length > 0 ? (
                            details.reviews.map((item, index) =>
                                <div className={z.userComment} key={index}>
                                    <div className={z.author}>Usuario: </div>
                                    <p>{item}</p>
                                </div>)
                        ) : (
                            <div>Este producto aún no tiene comentarios</div>
                        )}
                    </div>
                )
            }
        </div >
    );
};

export default Details;

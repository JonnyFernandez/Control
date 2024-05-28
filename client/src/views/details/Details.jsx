import z from './Details.module.css';
import { useParams, NavLink } from "react-router-dom";
import { postDetails } from '../../redux/prodSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { api_prod_details, api_post_review } from '../../api/prod';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const Details = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [quantityOptions, setQuantityOptions] = useState([]);
    const [openComments, setOpenComments] = useState(false);
    const [commentInputOpen, setCommentInputOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const details = useSelector(state => state.prod.details);
    const uniqueLikes = new Set(details.likes?.map(like => like.like));
    const numUniqueLikes = uniqueLikes.size > 0 ? uniqueLikes.size : '';
    const prodComment = details.reviews?.length || ''
    // console.log(prodComment);


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
    }, [dispatch, id, commentInputOpen]);

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
        setCommentInputOpen(prev => !prev);
    };

    const onSubmit = async (values) => {
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

    return (
        <div className={z.Details}>
            <div className={z.header}>
                <NavLink to={'/home'}>Back</NavLink>
                <div>Logo</div>
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
                            <div className={z.divInside}>{details.description}</div>
                            <div className={z.divInside}>Categoria: {details.category}</div>
                            {details.off !== 0 && <div className={z.divInside}>Precio Real: ${Number(details.realPrice).toLocaleString('es-ES')}</div>}
                            <div className={z.divInside}>Precio: ${Number(details.price).toLocaleString('es-ES')}</div>
                            {details.off !== 0 && <div className={z.divInside}>Ahorros en cada unidad: ${details.discount}</div>}
                            <div className={z.divInside}>Stock: {details.stock}</div>
                            <div className={z.divQuanty}>
                                <div>Cantidad:</div>
                                <select name="quantity" id="quantity">
                                    <option value="">Cantidad</option>
                                    {quantityOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className={z.addToCart}>Agregar al carrito</button>
                        <button className={z.comprar}>Comprar ahora</button>
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
                    <div className={z.reviews}>
                        {details.reviews.length > 0 ? (
                            details.reviews.map((item, index) => <div key={index}>{item}</div>)
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

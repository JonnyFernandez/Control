import d from './DetailsAdmin.module.css'
import { useParams, useNavigate } from 'react-router-dom'
import { NavAdmin } from '../../components/componentAdmin'
import Footer from '../../components/footer/Footer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchById } from '../../redux/prodSlice'
import { getProdById } from '../../api/prod'
import { updateProduct, updateStatusProd, deleteProd } from '../../api/prod'
import axios from 'axios'
import Swal from 'sweetalert2'

const DetailsAdmin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [isFlipped, setIsFlipped] = useState(false); // Inicialmente la tarjeta no está activa
    const [data, setData] = useState({ image: '', description: '', stock: '', cost: '', off: '', iva: '', iibb: '', others: '', gain: '' })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodData = await getProdById(id)
                dispatch(searchById(prodData))
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchData();
    }, [id, dispatch])

    const prod = useSelector(state => state.prod.detailAdmin)






    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };


    const handleUploadImage = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'assistt_file');
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dkx6y2e2z/image/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setData({ ...data, image: response.data.secure_url });
        } catch (error) {
            console.error('Error al cargar la imagen:', error);
            alert('Error al cargar la imagen. Inténtalo de nuevo.');
        }
    };

    const toggleFlipped = () => setIsFlipped(prev => !prev)

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Mostrar la alerta de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres actualizar la información?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, actualizar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await updateProduct(id, data);
                    if (response.status === 201) {
                        Swal.fire(
                            '¡Actualizado!',
                            'La información ha sido actualizada exitosamente.',
                            'success'
                        );
                        setData({ image: '', description: '', stock: '', cost: '', off: '', iva: '', iibb: '', others: '', gain: '' });
                        toggleFlipped();
                    }
                } catch (error) {
                    console.error('Error al actualizar el producto:', error);
                    let messageError = error.response.data.message;
                    Swal.fire(
                        'Error',
                        `${messageError}`,
                        'error'
                    );
                }
            }
        });
    };


    const handlePause = async () => {
        if (prod.stock === 0) {
            Swal.fire('¡Error!', 'Agregar Stock', 'error');
            return;
        }
        const newStatus = prod.status;
        try {
            const response = await updateStatusProd(id);
            if (response.status === 201) {
                const prodData = await getProdById(id);
                dispatch(searchById(prodData));
                const message = newStatus ? 'pausado' : 'activado';
                Swal.fire('¡Éxito!', `El producto ha sido ${message} exitosamente.`, 'success');
            } else {
                throw new Error('Error al actualizar el estado del producto.');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire('¡Error!', 'Ha ocurrido un error. Inténtalo de nuevo más tarde.', 'error');
        }
    };



    const handleRemoveProd = async () => {
        // Mostrar la alerta de confirmación
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres eliminar este producto?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteProd(id);
                    if (res.status === 201) {
                        Swal.fire('¡Éxito!', 'Producto eliminado exitosamente', 'success').then(() => {
                            navigate('/profile');
                        });
                    } else {
                        throw new Error('Error al eliminar el producto.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    Swal.fire('¡Error!', 'Ha ocurrido un error. Inténtalo de nuevo más tarde.', 'error');
                }
            }
        });
    };















    return (
        <div>
            <NavAdmin />
            <div className={d.bodyAdmin}>
                <div className={d.container}>
                    <div className={d.left}>
                        <div className={d.imageBox}>
                            {
                                data.image
                                    ? <img src={data.image} alt="image" />
                                    : prod.image
                                        ? <img src={prod?.image} alt="image" />
                                        : <img src="https://i.pinimg.com/564x/c9/36/cd/c936cdc3b4004f05bf4f5cfa0a671524.jpg" alt="image" />
                            }

                            <div className={d.subImage} >
                                <div className={d.deleteProd} onClick={handleRemoveProd}>Eliminar Producto</div>
                                <div className={d.pauseProd} onClick={handlePause}>{prod?.status ? 'Pausar Producto' : 'Activar Producto'}</div>
                            </div>
                        </div>
                    </div>
                    <div className={d.right}>
                        <div className={`${d.card} ${isFlipped ? d.flip : ''}`}>
                            <div className={d.front}>
                                <h3>{prod?.description}</h3>

                                <div className={d.divInfo}>
                                    <h6>Codigo:</h6>
                                    <span >{prod?.code}</span>
                                </div>

                                <div className={d.divInfo}>
                                    <h6>Categoria</h6>
                                    <span>{prod?.category}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Descuento:</h6>
                                    <span>$ {prod?.discount}</span>
                                </div>

                                <div className={d.divInfo}>
                                    <h6>Precio Venta: </h6>
                                    <span>$ {prod?.price}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Precio Bruto:</h6>
                                    <span>$ {prod?.realPrice}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Costo Neto</h6>
                                    <span>{prod?.cost}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Off Aplicado:</h6>
                                    <span>{prod?.off * 100}%</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Ganancia:</h6>
                                    <span>{prod?.gain * 100}%</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>IIBB:</h6>
                                    <span>{prod?.iibb * 100}%</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>IVA:</h6>
                                    <span>{prod?.iva * 100}%</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Otros:</h6>
                                    <span>{prod?.others * 100}%</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Estatus:</h6>
                                    <span>{prod?.status ? 'Activo' : 'Pausado'}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Stock:</h6>
                                    <span>{prod?.stock}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Creado:</h6>
                                    <span>{new Date(prod?.createdAt).toLocaleString()}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Actualizado:</h6>
                                    <span>{new Date(prod?.updatedAt).toLocaleString()}</span>
                                </div>

                            </div>




                            <div className={`${d.back} ${!isFlipped ? d.flip : ''}`}>
                                <h3>Editar Producto: {prod.code}</h3>

                                <form className={d.form2} onSubmit={handleSubmit}>
                                    <input type="file" onChange={handleUploadImage} />
                                    <input type="text" onChange={handleChange} name='description' value={data.description} placeholder='description' />
                                    <input type="number" min={0} onChange={handleChange} name='stock' value={data.stock} placeholder='stock' />
                                    <input type="number" min={0} onChange={handleChange} name='cost' value={data.cost} placeholder='cost' />
                                    <input type="number" min={0} onChange={handleChange} name='off' value={data.off} placeholder='off' />
                                    <input type="number" min={0} onChange={handleChange} name='iva' value={data.iva} placeholder='iva' />
                                    <input type="number" onChange={handleChange} name='iibb' value={data.iibb} placeholder='iibb' />
                                    <input type="number" min={0} onChange={handleChange} name='others' value={data.others} placeholder='others' />
                                    <input type="number" min={0} onChange={handleChange} name='gain' value={data.gain} placeholder='gain' />


                                    <div className={d.divButtonSubmit}>
                                        <button>Actualizar</button>
                                    </div>



                                </form>

                            </div>

                        </div>


                        <button className={d.change} onClick={toggleFlipped}>
                            {
                                !isFlipped
                                    ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
                                    </svg>

                            }

                        </button>







                    </div>
                </div>
            </div>
            <div className={d.footer}> Aca montaremos un lindo footer </div>
        </div>
    )
}

export default DetailsAdmin

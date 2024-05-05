import d from './DetailsAdmin.module.css'
import { useParams } from 'react-router-dom'
import { NavAdmin } from '../../components/componentAdmin'
import Footer from '../../components/footer/Footer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchById } from '../../redux/prodSlice'
import { getProdById } from '../../api/prod'

const DetailsAdmin = () => {
    const [isFlipped, setIsFlipped] = useState(false); // Inicialmente la tarjeta no está activa
    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodData = await getProdById(id)
                dispatch(searchById(prodData))
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchData()
    }, [])

    const prod = useSelector(state => state.prod.detailAdmin)

    console.log(prod);
    return (
        <div>
            <NavAdmin />
            <div className={d.bodyAdmin}>
                <div className={d.container}>
                    <div className={d.left}>
                        <div className={d.imageBox}>
                            <img src={prod?.image} alt="image" />
                        </div>
                    </div>
                    <div className={d.right}>
                        <div className={`${d.card} ${isFlipped ? d.flip : ''}`}>
                            <div className={d.front}>
                                <h3>{prod?.name}</h3>

                                <div className={d.divInfo}>
                                    <h6>Codigo:</h6>
                                    <span >{prod?.code}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Descripción:</h6>
                                    <span>{prod?.description}</span>
                                </div>

                                {/* <div className={d.divInfo}>
                                    <h6>Marca:</h6>
                                    <span>{prod?.brand}</span>
                                </div> */}
                                <div className={d.divInfo}>
                                    <h6>Categoria</h6>
                                    <span>{prod?.category}</span>
                                </div>
                                <div className={d.divInfo}>
                                    <h6>Descuento:</h6>
                                    <span>$ {prod?.discount}</span>
                                </div>
                                {/* <div className={d.divInfo}>
                                    <h6>Distribuidor:</h6>
                                    <span>{prod?.distributor}</span>
                                </div> */}
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
                                {/* <div className={d.divInfo}>
                                    <h6>Likes:</h6>
                                    <span>{prod?.likes?.length}</span>
                                </div> */}
                                <div className={d.divInfo}>
                                    <h6>Estatus:</h6>
                                    <span>{prod?.status ? 'Activo' : 'No Activo'}</span>
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



                                {/* <div>Comentarios: {prod?.reviews?.map((item, index) => <span key={index}>{item}</span>)}</div> */}





                            </div>
                            <div className={`${d.back} ${!isFlipped ? d.flip : ''}`}>



                                <h2>Back Card</h2>













                            </div>

                        </div>
                        <button onClick={() => setIsFlipped(prev => !prev)}>review</button>
                    </div>
                </div>
            </div>
            <div className={d.footer}> Aca montaremos un lindo footer </div>
        </div>
    )
}

export default DetailsAdmin

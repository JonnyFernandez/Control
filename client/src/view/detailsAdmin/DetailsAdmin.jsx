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
                                <h3>Descripción de Produto</h3>
                                <div className={d.divInfo}>
                                    <h6>Codigo:</h6>
                                    <span >{prod?.code}</span>
                                </div>

                                <div>Nombre: {prod?.name}</div>
                                <div>Descripción: {prod?.description}</div>
                                <div>Marca: {prod?.brand}</div>
                                <div>Categoria: {prod?.category}</div>
                                <div>Descuento: {prod?.discount}</div>
                                <div>Distribuidor: {prod?.distributor}</div>
                                <div>Precio Venta: {prod?.price}</div>
                                <div>Precio Bruto: {prod?.realPrice}</div>
                                <div>Descuento aplicado: {prod?.off * 100}%</div>
                                <div>Ganancia: {prod?.gain * 100}%</div>
                                <div>IIBB: {prod?.iibb * 100}%</div>
                                <div>IVA: {prod?.iva * 100}%</div>
                                <div>Otros: {prod?.others * 100}%</div>
                                <div>Likes: {prod?.likes?.length}</div>
                                <div>Estatus: {prod?.status ? 'Activo' : 'No Activo'}</div>
                                <div>Stock: {prod?.stock}</div>
                                <div>creado: {new Date(prod?.createdAt).toLocaleString()} </div>
                                <div>Costo Neto: {prod?.cost}</div>
                                <div>Comentarios: {prod?.reviews?.map((item, index) => <span key={index}>{item}</span>)}</div>

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

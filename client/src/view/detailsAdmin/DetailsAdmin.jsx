import d from './DetailsAdmin.module.css'
import { useParams } from 'react-router-dom'
import { NavAdmin } from '../../components/componentAdmin'
import Footer from '../../components/footer/Footer'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchById } from '../../redux/prodSlice'


const DetailsAdmin = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(searchById(id))
    }, [])

    const { detailAdmin } = useSelector(state => state.prod)
    console.log(detailAdmin);
    return (
        <div>
            <NavAdmin />
            <div className={d.bodyAdmin}>
                <div className={d.container}>
                    <div className={d.left}>

                        <div className={d.imageBox}>
                            <img src={detailAdmin?.image} alt="image" />
                        </div>

                    </div>
                    <div className={d.right}>
                        <div className={d.containerImputs}>
                            <div>id: {detailAdmin.id}</div>
                            <div>Codigo: {detailAdmin.code}</div>
                            <div>Nombre: {detailAdmin.name}</div>
                            <div>Descripción: {detailAdmin.description}</div>
                            <div>Marca: {detailAdmin.brand}</div>
                            <div>Categoria: {detailAdmin.category}</div>
                            <div>Descuento: {detailAdmin.discount}</div>
                            <div>Distribuidor: {detailAdmin.distributor}</div>
                            <div>Precio Venta: {detailAdmin.price}</div>
                            <div>Precio Bruto: {detailAdmin.realPrice}</div>
                            <div>Descuento aplicado: {detailAdmin.off * 100}%</div>
                            <div>Ganancia: {detailAdmin.gain * 100}%</div>
                            <div>IIBB: {detailAdmin.iibb * 100}%</div>
                            <div>IVA: {detailAdmin.iva * 100}%</div>
                            <div>Otros: {detailAdmin.others * 100}%</div>
                            <div>Likes: {detailAdmin.likes?.length}</div>
                            <div>Estatus: {detailAdmin.status ? 'Activo' : 'No Activo'}</div>
                            <div>Stock: {detailAdmin.stock}</div>
                            <div>creado: {new Date(detailAdmin.createdAt).toLocaleString()} </div>
                            <div>Comentarios: {detailAdmin.reviews?.map((item, index) => <span key={index}>{item}</span>)}</div>

                        </div>
                    </div>
                </div>
                <div className={d.prodRelations}></div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailsAdmin
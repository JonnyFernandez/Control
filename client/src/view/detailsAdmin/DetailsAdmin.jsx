import d from './DetailsAdmin.module.css'
import { useParams } from 'react-router-dom'
import { NavAdmin } from '../../components/componentAdmin'
import Footer from '../../components/footer/Footer'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchById } from '../../redux/prodSlice'

const DetailsAdmin = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [active, setActive] = useState(false); // Inicialmente la tarjeta no está activa

    useEffect(() => {
        dispatch(searchById(id))
    }, [])

    const { detailAdmin } = useSelector(state => state.prod)

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
                        <div className={`${d.card} ${active ? d.flip : ''}`}>
                            <div className={d.front}>
                                <div>Codigo: {detailAdmin?.code}</div>
                                <div>Nombre: {detailAdmin?.name}</div>
                                <div>Descripción: {detailAdmin?.description}</div>
                                <div>Marca: {detailAdmin?.brand}</div>
                                <div>Categoria: {detailAdmin?.category}</div>
                                <div>Descuento: {detailAdmin?.discount}</div>
                                <div>Distribuidor: {detailAdmin?.distributor}</div>
                                <div>Precio Venta: {detailAdmin?.price}</div>
                                <div>Precio Bruto: {detailAdmin?.realPrice}</div>
                                <div>Descuento aplicado: {detailAdmin?.off * 100}%</div>
                                <div>Ganancia: {detailAdmin?.gain * 100}%</div>
                                <div>IIBB: {detailAdmin?.iibb * 100}%</div>
                                <div>IVA: {detailAdmin?.iva * 100}%</div>
                                <div>Otros: {detailAdmin?.others * 100}%</div>
                                <div>Likes: {detailAdmin?.likes?.length}</div>
                                <div>Estatus: {detailAdmin?.status ? 'Activo' : 'No Activo'}</div>
                                <div>Stock: {detailAdmin?.stock}</div>
                                <div>creado: {new Date(detailAdmin?.createdAt).toLocaleString()} </div>
                                <div>Costo Neto: {detailAdmin?.cost}</div>
                                <div>Comentarios: {detailAdmin?.reviews?.map((item, index) => <span key={index}>{item}</span>)}</div>

                            </div>
                            <div className={`${d.back} ${!active ? d.flip : ''}`}>
                                <label htmlFor="">Nombre</label>
                                <input type="text" placeholder={detailAdmin?.name} />
                                <label htmlFor="">Descripcion</label>
                                <input type="text" placeholder={detailAdmin?.description} />
                                <label htmlFor="">Category</label>
                                <select>
                                    <option value="">Categorya</option>
                                    <option value="">Categorya</option>
                                </select>
                                <label htmlFor="">Descuento</label>
                                <input type="text" placeholder={detailAdmin?.discount} />
                                <label htmlFor="">Distribuidor</label>
                                <input type="text" placeholder={detailAdmin?.distributor} />
                                <label htmlFor="">Precio</label>
                                <input type="text" placeholder={detailAdmin?.price} />
                                <label htmlFor="">precio Bruto</label>
                                <input type="text" placeholder={detailAdmin?.realPrice} />
                                <label htmlFor="">% off</label>
                                <input type="text" placeholder={detailAdmin?.off * 100} />
                                <label htmlFor="">% IVA</label>
                                <input type="text" placeholder={detailAdmin?.iva * 100} />
                                <label htmlFor="">% IIBB</label>
                                <input type="text" placeholder={detailAdmin?.iibb * 100} />
                                <label htmlFor="">% Others</label>
                                <input type="text" placeholder={detailAdmin?.others * 100} />
                                <label htmlFor="">% Local</label>
                                <input type="text" placeholder={detailAdmin?.gain * 100} />


                            </div>

                        </div>
                        <button onClick={() => setActive(prev => !prev)}>review</button>
                    </div>
                </div>
            </div>
            <div className={d.footer}> Aca montaremos un lindo footer </div>
        </div>
    )
}

export default DetailsAdmin

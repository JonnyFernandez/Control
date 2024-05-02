import m from './CustomerProd.module.css'
import Card2 from '../../card2/Card2'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProd, searchCategory, serchStock, Offer } from '../../../redux/prodSlice'
import { useEffect } from 'react'
import { getProd } from '../../../api/prod'
import Paginado from '../../paginado/Paginado'

const CustomerProd = () => {
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodData = await getProd()
                dispatch(getAllProd(prodData))
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchData()
    }, [dispatch])

    const refresh = async () => {
        try {
            const prodData = await getProd()
            dispatch(getAllProd(prodData))
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }


    const { allProd, currentPage } = useSelector(state => state.prod)
    // ---------------------------------Paginado--------------------------
    // PAGINATION VARS
    const cardsInPage = 15;
    const totalCards = allProd.length;
    const lastIndex = currentPage * cardsInPage;
    const firstIndex = lastIndex - cardsInPage;
    const cardsShowed = allProd.slice(firstIndex, lastIndex);

    const handleSelect = (event) => {
        let value = event.target.value
        dispatch(searchCategory(value))
    }
    const handleSelectStock = (event) => {
        let value = event.target.value
        dispatch(serchStock(value))
    }
    const handleSelectOffer = (event) => {
        let value = event.target.value
        dispatch(Offer(value))
    }



    return (
        <div className={m.prod}>
            <div className={m.filters}>

                <select name="" id="" onChange={handleSelect} className={m.select}>
                    <option value="">Categoria</option>
                    <option value="quimica">Quimica</option>
                    <option value="libreria">Libreria</option>
                    <option value="jugueteria">Jugueteria</option>
                    <option value="limpieza">Limpieza</option>
                    <option value="sueltos">Sueltos</option>
                    <option value="piscina">Piscina</option>
                    <option value="bazar">Bazar</option>
                    <option value="plasticos">plasticos</option>
                    <option value="perfumeria">Perfumeria</option>
                    <option value="indumentaria">Perfumeria</option>
                    <option value="otros">Otros</option>
                </select>
                <select name="" id="" onChange={handleSelectStock}>
                    <option value="">Stock</option>
                    <option value="less">Poco Stock</option>
                    <option value="not">Sin Stock</option>
                </select>

                <input type="text" />

                <select name="" id="" onChange={handleSelectOffer}>
                    <option value="">Ofertas</option>
                    <option value="10">Descuentos 10%</option>
                    <option value="15">Descuentos 15%</option>
                    <option value="20">Descuentos 20%</option>
                    <option value="30">Outlet 30%</option>
                </select>

                <button>Refres</button>


            </div>
            <div className={m.botonera}> <Paginado cardsInPage={cardsInPage} totalCards={totalCards} currentPage={currentPage} /> </div>
            <div className={m.body}>
                {
                    cardsShowed.length >= 1 ? (cardsShowed.map(item => {
                        return <Card2 key={item.code} id={item.id} name={item.name} code={item.code} price={item.price} category={item.category} stock={item.stock} likes={item.likes.map(item => item.like)} reviews={item.reviews.map(item => item)} />
                    })) : <h2>No hay Productos que mostrar </h2>
                }

            </div>
        </div>
    )
}


export default CustomerProd
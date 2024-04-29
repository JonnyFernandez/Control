import m from './CustomerProd.module.css'
import Card2 from '../../card2/Card2'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProd } from '../../../redux/prodSlice'
import { useEffect } from 'react'
import { getProd } from '../../../api/prod'


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


    const prod = useSelector(state => state.prod.allProd)
    console.log(prod);

    return (
        <div className={m.prod}>
            <div className={m.filters}>

                <select name="" id="">
                    <option value="">Categoria</option>
                </select>
                <select name="" id="">
                    <option value="">Stock</option>
                </select>
                <select name="" id="">
                    <option value="">Ofertas</option>
                </select>
                <select name="" id="">
                    <option value="">Outlet</option>
                </select>


            </div>
            <div className={m.botonera}> Botonera </div>
            <div className={m.body}>
                {
                    prod && prod.map(item => {
                        return <Card2 key={item.code} name={item.name} code={item.code} price={item.price} category={item.category} stock={item.stock} likes={item.likes.map(item => item.like)} reviews={item.reviews.map(item => item)} />
                    })
                }

            </div>
        </div>
    )
}


export default CustomerProd
import Nav from "../../components/nav/Nav"
import Footer from "../../components/footer/Footer"
import H from "./Home.module.css"
import Card3 from "../../components/card3/Card3"
import { getProd } from "../../api/prod"
import { getAllProd } from "../../redux/prodSlice"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react"

const Home = () => {
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
    }, [])

    const prod = useSelector(state => state.prod.allProd)
    console.log(prod);

    return (
        <div className={H.home}>
            <Nav />
            <div className={H.body}>
                <div className={H.botonera}>Botonera</div>
                <div className={H.container}>

                    <div className={H.containerCards}>
                        {
                            prod.length > 0
                                ? (prod.map(item => <Card3 key={item.id} id={item.id} name={item.name} price={item.price} stock={item.stock} image={item.image} />))
                                : 'No hay productos en la DB'
                        }

                    </div>
                </div>


            </div>
            <Footer />

        </div>
    )
}


export default Home
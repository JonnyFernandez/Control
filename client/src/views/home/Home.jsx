import { useState, useEffect } from 'react'
import { Nav, Card, Paginado, Modal, Like, CartSlice } from '../../components'
import h from './Home.module.css'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux'
import { getProd, setFavItems, setCartItems, setQuantyItems, filterCategory, filterPrice } from '../../redux/prodSlice'
import { apiGetProd } from '../../api/prod'



const Home = () => {


    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodData = await apiGetProd();
                dispatch(getProd(prodData.data));
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de conexión',
                        text: 'Servidor desconectado. Por favor, contacta al soporte técnico.',
                        footer: 'soporte tecnico "arcancode@gmail.com"',
                    });
                }
            }
        };

        fetchData();
    }, [dispatch]);



    const { product, currentPage, prodQuantity } = useSelector(state => state.prod)
    const dark = useSelector(state => state.dark.dark);
    const filteredProd = product.filter(item => item.status === true);


    const [showCart, setshowCart] = useState(false);
    const [showLikes, setshowLikes] = useState(false);
    const [showFilters, setshowFilters] = useState(false);
    const [showPurchase, setshowPurchase] = useState(false);
    const [showProfile, setshowProfile] = useState(false);



    const handleSelector = async (data) => {


        if (data === '' || null || undefined) {
            setshowCart(false);
            setshowLikes(false);
            setshowFilters(false)
            setshowPurchase(false)
            setshowProfile(false)
        }
        setshowCart(data === 'cart');
        setshowLikes(data === 'likes');
        setshowFilters(data === 'filters');
        setshowPurchase(data === 'purchase')
        setshowProfile(data === 'profile')


    };

    // ---------------------------------Paginado--------------------------
    const cardsInPage = 10;
    const totalCards = filteredProd.length;
    const lastIndex = currentPage * cardsInPage;
    const firstIndex = lastIndex - cardsInPage;
    const cardsShowed = filteredProd.slice(firstIndex, lastIndex);

    const renderProducts = () => {
        if (cardsShowed.length >= 1) {
            return cardsShowed.map(item => (
                <div key={item.id}>
                    <Card id={item.id} name={item.name} price={item.price} image={item.image} stock={item.stock} />
                </div>
            ));
        } else {
            return <h2>No hay Productos que mostrar </h2>;
        }
    };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
        const storedQuantity = JSON.parse(localStorage.getItem('quanty')) || [];

        dispatch(setQuantyItems(storedQuantity))
        dispatch(setCartItems(storedCart));
        dispatch(setFavItems(storedFav))
    }, [dispatch])

    const handleCategory = (e) => {
        const value = e.target.value
        dispatch(filterCategory(value))
    }
    const handlePrice = (e) => {
        const value = e.target.value
        dispatch(filterPrice(value))
    }

    return (
        <div className={h.container}>
            <div className={`${h.header} ${dark ? h.headerDark : ''}`}>
                <div className={h.nav}> <Nav handleSelector={handleSelector} /> </div>
                <div className={h.dropdown}>DropDown</div>
            </div>
            <div className={`${h.body} ${dark ? h.body : ''}`}>

                <div className={h.botonera}>
                    <div className={h.filter}>
                        <div className={h.filterTitle}>Precios:</div>
                        <select name="" id="" onChange={handlePrice}>
                            <option value="">Precios</option>
                            <option value="min">Menor</option>
                            <option value="max">Mayor</option>
                        </select>
                    </div>
                    <Paginado cardsInPage={cardsInPage} totalCards={totalCards} currentPage={currentPage} />
                    <div className={h.filter}>
                        <div className={h.filterTitle}>Categoria:</div>
                        <select name="" id="" onChange={handleCategory}>
                            <option value="all">Categoria</option>
                            <option value="libreria">libreria</option>
                            <option value="limpieza">limpieza</option>
                            <option value="otros">otros</option>
                            <option value="jugueteria">jugueteria</option>
                            <option value="quimica">quimica</option>
                            <option value="sueltos">sueltos</option>
                            <option value="piscina">piscina</option>
                            <option value="bazar">bazar</option>
                            <option value="plasticos">plasticos</option>
                            <option value="perfumeria">perfumeria</option>
                            <option value="indumentaria">indumentaria</option>
                        </select>
                    </div>
                </div>

                <div className={h.content}>

                    {renderProducts()}
                    {<CartSlice />}
                    <Modal isOpen={showLikes} toggleOpen={handleSelector} children={<Like />} />
                    <Modal isOpen={showFilters} toggleOpen={handleSelector} children={<h1>Filtros</h1>} />
                    <Modal isOpen={showPurchase} toggleOpen={handleSelector} children={<h1>compras</h1>} />
                    <Modal isOpen={showProfile} toggleOpen={handleSelector} children={<h1>Profile</h1>} />
                </div>
            </div>
        </div>
    );
}

export default Home;

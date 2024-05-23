import { useState, useEffect } from 'react'
import { Nav, Card, Paginado, Modal, Like, CartSlice } from '../../components'
import h from './Home.module.css'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux'
import { getProd, setFavItems, setCartItems } from '../../redux/prodSlice'
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

    const { product, currentPage } = useSelector(state => state.prod)
    const filteredProd = product.filter(item => item.status === true);

    const [dark, setDark] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false);
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





    const handleDark = (data) => setDark(data)

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
                    <Card id={item.id} name={item.name} price={item.price} image={item.image} status={item.status} />
                </div>
            ));
        } else {
            return <h2>No hay Productos que mostrar </h2>;
        }
    };

    useEffect(() => {
        // dispatch(getProd())
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const storedFav = JSON.parse(localStorage.getItem('fav')) || [];
        dispatch(setCartItems(storedCart));
        dispatch(setFavItems(storedFav))
    }, [dispatch])



    return (
        <div className={h.container}>
            <div className={`${h.header} ${dark ? h.headerDark : ''}`}>
                <div className={h.nav}> <Nav handleSelector={handleSelector} handleDark={handleDark} /> </div>
                <div className={h.dropdown}>DropDown</div>
            </div>
            <div className={`${h.body} ${dark ? h.darkBody : ''}`}>

                <div className={h.botonera}>
                    <Paginado cardsInPage={cardsInPage} totalCards={totalCards} currentPage={currentPage} />
                </div>

                <div className={`${h.sidebar} ${openSidebar ? h.open : ''}`}>
                    {openSidebar && (
                        <div className={h.sidebarContainer}>
                            <select name="" id="">
                                <option value="">Precio</option>
                                <option value="">Mayor</option>
                                <option value="">Menor</option>
                            </select>
                            <select name="" id="">
                                <option value="">Categoria</option>
                                <option value="">-</option>
                                <option value="">-</option>
                            </select>
                            <select name="" id="">
                                <option value="">Ofertas</option>
                                <option value="">-10</option>
                                <option value="">-30</option>
                                <option value="">Outlet</option>
                            </select>
                        </div>
                    )}
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

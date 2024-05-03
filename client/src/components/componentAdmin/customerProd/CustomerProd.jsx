import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProd, searchCategory, searchByNameProd, resetPro, serchStock, Offer } from '../../../redux/prodSlice';
import { getProd } from '../../../api/prod';
import Card2 from '../../card2/Card2';
import Paginado from '../../paginado/Paginado';
import styles from './CustomerProd.module.css';

const CustomerProd = () => {
    const dispatch = useDispatch();
    const { allProd, currentPage } = useSelector(state => state.prod);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const prodData = await getProd();
            dispatch(getAllProd(prodData));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        if (search.trim() === '') {
            dispatch(resetPro());
        } else {
            dispatch(searchByNameProd(search));
        }
    }, [search, dispatch]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSelect = (event) => {
        dispatch(searchCategory(event.target.value));
    };

    const handleSelectStock = (event) => {
        dispatch(serchStock(event.target.value));
    };

    const handleSelectOffer = (event) => {
        dispatch(Offer(event.target.value));
    };

    const renderProducts = () => {
        if (cardsShowed.length >= 1) {
            return cardsShowed.map(item => (
                <Card2 key={item.code} id={item.id} name={item.name} code={item.code} price={item.price} category={item.category} stock={item.stock} likes={item.likes.map(item => item.like)} reviews={item.reviews.map(item => item)} />
            ));
        } else {
            return <h2>No hay Productos que mostrar </h2>;
        }
    };

    // ---------------------------------Paginado--------------------------
    const cardsInPage = 15;
    const totalCards = allProd.length;
    const lastIndex = currentPage * cardsInPage;
    const firstIndex = lastIndex - cardsInPage;
    const cardsShowed = allProd.slice(firstIndex, lastIndex);

    return (
        <div className={styles.prod}>
            <div className={styles.filters}>
                <select name="" id="" onChange={handleSelect} className={styles.select}>
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
                <input
                    type='text'
                    placeholder='¿Qué estás buscando?'
                    value={search}
                    onChange={handleChange}
                />
                <select name="" id="" onChange={handleSelectOffer}>
                    <option value="">Ofertas</option>
                    <option value="10">Descuentos 10%</option>
                    <option value="15">Descuentos 15%</option>
                    <option value="20">Descuentos 20%</option>
                    <option value="30">Outlet 30%</option>
                </select>
                <button onClick={fetchData}>Refres</button>
            </div>
            <div className={styles.botonera}>
                <Paginado cardsInPage={cardsInPage} totalCards={totalCards} currentPage={currentPage} />
            </div>
            <div className={styles.body}>
                {renderProducts()}
            </div>
        </div>
    );
};

export default CustomerProd;

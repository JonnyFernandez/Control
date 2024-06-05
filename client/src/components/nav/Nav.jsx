import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchName } from '../../redux/prodSlice';
import n from './Nav.module.css';

const Nav = ({ handleSelector, handleUpdate }) => {
    const dispatch = useDispatch();
    const dark = useSelector(state => state.dark.dark);
    const [search, setSearch] = useState('');



    const resetProd = async () => {
        handleUpdate()
        setSearch('');
    };


    const searchFuction = async () => {
        dispatch(searchName(search))
    };



    return (
        <div className={n.nav}>
            <div className={n.div1}>
                <div className={n.image} onClick={resetProd}>
                    <img src="../../distriW.png" alt="" />
                </div>
                {/* <div className={`${n.title} ${dark ? n.darkTitle : ''}`} onClick={resetProd}>

                </div> */}
                <input
                    type='text'
                    placeholder='¿Qué estás buscando?'
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className={n.nav_search_input}
                />
                <div className={`${n.deleteInput}`} onClick={resetProd} >{search && "x"}</div>
                {search && <button className={`${n.searchProd}`} onClick={searchFuction}>Buscar</button>}
            </div>

            <div className={n.div2}>
                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={resetProd}>
                    Home
                </div>

                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={() => handleSelector('purchase')}>
                    Historial
                </div>

                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={() => handleSelector('purchase')}>
                    Ofertas
                </div>

                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={() => handleSelector('profile')}>
                    Perfil
                </div>


            </div>
        </div>
    );
};

export default Nav;

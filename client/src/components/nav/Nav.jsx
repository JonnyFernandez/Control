import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkMode } from '../../redux/darkmodeSlice';
import { getProd } from '../../redux/prodSlice';
import n from './Nav.module.css';
// import Like from '../like/Like';
import { apiGetProd, apiGetProdByName } from '../../api/prod';

const Nav = ({ handleDark, handleSelector }) => {
    const dispatch = useDispatch();
    const dark = useSelector(state => state.dark.dark);
    const [search, setSearch] = useState('');


    useEffect(() => {
        const localMode = JSON.parse(localStorage.getItem('darkMode')) || false;
        if (localMode !== dark) {
            dispatch(setDarkMode(localMode));
            handleDark(localMode);
        }
    }, [dark, dispatch, handleDark]);

    const darkmode = useCallback(() => {
        const newDarkMode = !dark;
        dispatch(setDarkMode(newDarkMode));
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
        handleDark(newDarkMode);
    }, [dark, dispatch, handleDark]);

    const resetProd = async () => {
        try {
            const prodData = await apiGetProd();
            dispatch(getProd(prodData.data));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        setSearch('');
    };

    const searchFuction = async () => {
        try {
            const aux = await apiGetProdByName(search)
            dispatch(getProd(aux.data));
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };



    return (
        <div className={n.nav}>
            <div className={n.div1}>
                <div className={n.image} onClick={resetProd}>
                    <img src="../../IconOrange.ico" alt="" />
                </div>
                <div className={`${n.title} ${dark ? n.darkTitle : ''}`} onClick={resetProd}>Cost Price</div>
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
                {/* Productos */}
                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={resetProd}>
                    {<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                    </svg>}
                </div>

                {/* Carrito */}
                {/* <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={() => handleSelector('cart')} >
                    {<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                    </svg>}
                </div> */}


                {/* Likes */}
                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={() => handleSelector('likes')} >
                    {<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg>}
                </div>

                {/* filtros */}
                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={() => handleSelector('filters')}>
                    {<svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-filter" viewBox="0 0 16 16">
                        <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
                    </svg>}
                </div>
                {/* Compras */}
                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={() => handleSelector('purchase')}>
                    {<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-check-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0m-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                    </svg>}
                </div>

                {/* Perfil */}
                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={() => handleSelector('profile')}>
                    {<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>}
                </div>

                <div className={`${n.item} ${dark ? n.darkitem : ''}`} onClick={darkmode}>
                    {dark
                        ? <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#edad0c" className="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                            <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="steelblue" className="bi bi-moon-fill" viewBox="0 0 16 16">
                            <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
                        </svg>}
                </div>
            </div>
        </div>
    );
};

export default Nav;

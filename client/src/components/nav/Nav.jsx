import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchName } from '../../redux/prodSlice';
import { NavLink } from 'react-router-dom';
import n from './Nav.module.css';

const Nav = ({ handleUpdate }) => {
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
                <NavLink to={'/profile'} className={`${n.item} ${dark ? n.darkitem : ''}`}>
                    Perfil
                </NavLink>
            </div>





        </div>
    );
};

export default Nav;

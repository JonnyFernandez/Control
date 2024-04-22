import React from "react";
import n from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
    return (
        <div className={n.nav}>
            <div className={n.up}>
                <div>Logo</div>
                <div> <input placeholder="Buscar en Control" /> </div>
                <div>DarMode</div>
            </div>
            <div className={n.down}>
                <div className={n.div1}>inicio</div>
                <div className={n.div2}>
                    <div className={n.categories}>Jugueteria</div>
                    <div className={n.categories}>Bazar</div>
                    <div className={n.categories}>Limpieza</div>
                    <div className={n.categories}>Perfumeria</div>
                    <div className={n.categories}>Quimica</div>
                    <div className={n.categories}>Piletas</div>
                </div>
                <div className={n.div3}>
                    <div>Crea tu cuenta</div>
                    <div>Ingresa</div>
                    <div>Mis Compras</div>
                    <div>Cart</div>
                    <NavLink to={'/profile'}>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
                                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            </svg>
                        </div>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Nav;

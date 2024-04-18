import React from "react";
import n from "./Nav.module.css";

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
                </div>
            </div>
        </div>
    );
};

export default Nav;

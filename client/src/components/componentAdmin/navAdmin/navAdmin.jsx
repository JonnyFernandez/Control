import React from "react";
import n from "./navAdmin.module.css";
import { NavLink } from "react-router-dom";

const NavAdmin = () => {
    return (
        <div className={n.nav}>
            <div className={n.up}>
                <NavLink to={'/home'}>
                    <div>Logo</div>
                </NavLink>

                <div>DarMode</div>
            </div>
            <div className={n.down}>
                <div className={n.div1}>Menu</div>
                <div className={n.div2}>

                    <input type="text" placeholder="Buscar Product" />
                </div>
                <div className={n.div3}>
                    <div>Agrega producto </div>

                </div>
            </div>
        </div>
    );
};

export default NavAdmin;

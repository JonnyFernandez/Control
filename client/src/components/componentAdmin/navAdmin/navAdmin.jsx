import React from "react";
import { useState } from "react";
import n from "./navAdmin.module.css";
import { NavLink } from "react-router-dom";
import { CreateProd, Modal } from '../index'

const NavAdmin = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);


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

                    {/* <input type="text" placeholder="Buscar Product" /> */}
                </div>
                <div className={n.div3}>
                    <div onClick={() => setIsOpen(!isOpen)}> Agregar Producto  </div>

                    <Modal isOpen={isOpen} toggleOpen={toggleOpen} children={<CreateProd />} />

                </div>
            </div>
        </div>
    );
};

export default NavAdmin;

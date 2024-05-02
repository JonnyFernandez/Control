import React from "react";
import { useState } from "react";
import n from "./navAdmin.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { CreateProd, Modal } from '../index'

const NavAdmin = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    console.log(location.pathname);

    return (
        <div className={n.nav}>
            <div className={n.up}>
                <NavLink to={'/home'}>
                    <div>Logo</div>
                </NavLink>

                <div>DarMode</div>
            </div>
            <div className={n.down}>

                {
                    location.pathname.includes('details-card2')
                        ? <>
                            <NavLink to={'/profile'} className={n.div1}>back</NavLink>
                            <div className={n.div1}>Información De Prodcto</div>
                            <div>misma categoria</div>
                        </>
                        : <>
                            <div className={n.div1}>Menu</div>
                            <div className={n.div2}>
                            </div>
                            <div className={n.div3}>
                                <div onClick={() => setIsOpen(!isOpen)} className={n.div}> Agregar Producto  </div>
                                <Modal isOpen={isOpen} toggleOpen={toggleOpen} children={<CreateProd />} />
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default NavAdmin;

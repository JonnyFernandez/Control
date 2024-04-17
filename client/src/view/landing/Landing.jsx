// Landing.jsx
import NavLanding from "../../components/navLanding/NavLanding";
import { Modal } from "../../components/modal/Modal";
import { useState } from "react";
import landing from './Landing.module.css'
import SignInOrSignUp from '../../components/registerLogin/SignInOrSignUp'
import { NavLink } from "react-router-dom";

const Landing = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className={landing.landing}>
            <div className={landing.header}>
                <h1>Marelys</h1>
                <button onClick={toggleOpen}>Open Modal</button>
            </div>
            <div className={landing.body}>
                <Modal isOpen={isOpen} toggleOpen={toggleOpen}>

                    <div className={landing.buttonContainer}>
                        <NavLink to={'/login'}>Login</NavLink>
                        <NavLink to={'/register'}>Register</NavLink>
                    </div>

                </Modal>
            </div>
            <div className={landing.footer}>
                <h1>Querido Footer</h1>
            </div>


        </div>
    );
};

export default Landing;

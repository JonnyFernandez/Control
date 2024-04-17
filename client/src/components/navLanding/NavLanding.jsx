import { NavLink, useLocation } from 'react-router-dom';
import n from './NavLanding.module.css';

const NavLanding = () => {
    const location = useLocation();
    const { pathname } = location;

    // Condición para determinar qué botones mostrar según la ruta
    const showSignUp = pathname !== '/login';
    const showSignIn = pathname !== '/register';

    return (
        <div className={n.navLandin}>
            <div className={n.logo}>
                <NavLink to={'/'}><h1>Marelys</h1></NavLink>
            </div>
            <div className={n.center}> </div>
            <div className={n.buttons}>
                {showSignUp && <NavLink to='/login'> Sign Up </NavLink>}
                {showSignIn && <NavLink to='/register'> Sign In </NavLink>}
            </div>
        </div>
    );
}

export default NavLanding;

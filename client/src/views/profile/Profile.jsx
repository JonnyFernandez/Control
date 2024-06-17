import p from './Profile.module.css'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { apiGetProd } from '../../api/prod'
import { getProd } from '../../redux/prodSlice'
import { Card } from '../../components'

const SECTIONS = {
    INICIO: 'inicio',
    PURCHASE: 'purchase',
    FAVORITE: 'favorite',
    ADMIN: 'admin'
};

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useAuth()
    console.log(user);
    const [activeSection, setActiveSection] = useState(SECTIONS.INICIO)

    const handleSectionChange = (section) => {
        setActiveSection(section);
    }
    const back = () => navigate('/home')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const prodData = await apiGetProd();
                dispatch(getProd(prodData.data));
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de conexión',
                        text: 'Servidor desconectado. Por favor, contacta al soporte técnico.',
                        footer: 'soporte tecnico "arcancode@gmail.com"',
                    });
                }
            }
        };

        fetchData();
    }, [dispatch, activeSection]);

    const { favorites } = useSelector(state => state.prod)

    const renderFavorites = () => {
        if (favorites.length >= 1) {
            return favorites.map(item => (
                <div key={item.id}>
                    <Card id={item.id} name={item.name} price={item.price} image={item.image} stock={item.stock} />
                </div>
            ));
        } else {
            return <h2>No hay Productos que mostrar </h2>;
        }
    };

    return (
        <div className={p.profile}>
            <div className={p.header}>
                <h3 onClick={back}>Home</h3>
                {/* <p>{user.email}</p> */}
                {<h3>{
                    activeSection == 'inicio'
                        ? 'Perfil'
                        : activeSection == 'purchase'
                            ? 'Compras'
                            : activeSection == 'favorite'
                                ? 'Favorites'
                                : activeSection == 'admin'
                                    ? 'Admin'
                                    : ''
                }</h3>}
                <div>
                    <div className={p.dropdown}>
                        <a>
                            <h3>Explore</h3>
                            <span className="material-icons"> expand_more </span>
                        </a>
                        <div className={p.menu}>
                            <a onClick={back}>Home</a>
                            <a onClick={() => handleSectionChange(SECTIONS.PURCHASE)}>Mis Compras</a>
                            <a onClick={() => handleSectionChange(SECTIONS.FAVORITE)}>Favoritos</a>
                            <a>Salir</a>
                            {user.type === 'client' && (
                                <a onClick={() => handleSectionChange(SECTIONS.ADMIN)}>Admin</a>
                            )}
                        </div>
                    </div>
                </div>

            </div>
            <div className={p.body}>
                {activeSection === SECTIONS.INICIO && <div className={p.session}>Inicio</div>}
                {activeSection === SECTIONS.PURCHASE && <div className={p.session}>Mis compras</div>}
                {activeSection === SECTIONS.FAVORITE && <div className={p.session}>
                    {renderFavorites()}
                </div>}
                {activeSection === SECTIONS.ADMIN && <div className={p.sessionAdmin}>Admin</div>}
            </div>
        </div>
    )
}

export default Profile

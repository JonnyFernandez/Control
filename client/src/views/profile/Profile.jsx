import p from './Profile.module.css'
import { useAuth } from '../../context/AuthContext'
import { NavLink } from 'react-router-dom'

const Profile = () => {
    const { user } = useAuth()
    console.log(user);
    return (
        <div className={p.profile}>
            <div className={p.header}>
                <NavLink to={'/home'}>Back</NavLink>
                <p>{user.email}</p>


                <div>
                    <div className={p.dropdown}>
                        <a>
                            <p>Explore</p>
                            <span className="material-icons"> expand_more </span>
                        </a>
                        <div className={p.menu}>
                            <a>Home</a>
                            <a>Mis Compras</a>
                            <a>Favoritos</a>
                            <a>Salir</a>
                            {user.type === 'admin'
                                ? <a>Admin</a>
                                : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={p.body}>

            </div>
        </div>
    )
}

export default Profile
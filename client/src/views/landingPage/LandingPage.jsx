import styles from './LandingPage.module.css'
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className={styles.landing}>


            <div className={styles.LandingLeft}>
                <img className={styles.logoLand} src="../../distriW.png" alt="" />
            </div>

            <div className={styles.LandingRight}>
                <div className={styles.info1}> <h4>Que tu compra no este limitada por la distancia.</h4> </div>
                <div className={styles.info1}> <h4>Desde tu computadora o dispositivo movil, a la puerta de tu casa.</h4> </div>
                <div className={styles.info1}>
                    <h4>Jugueteria | Bazar | Piscinas | Plasticos | Escolar  </h4>
                </div>
            </div>





            <div className={styles.options}>

                <NavLink className={styles.option1} to={'/home'}>
                    Ver Productos
                </NavLink>
                <NavLink className={styles.option2} to={'/login'}>
                    Ingresar
                </NavLink>

            </div>

        </div>
    )
}

export default LandingPage
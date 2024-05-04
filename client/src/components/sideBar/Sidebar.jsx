import React, { useState } from "react";
import styles from "./style.module.css"; // Importa los estilos CSS utilizando CSS Modules
import { NavLink } from 'react-router-dom'


function Sidebar({ selector }) {
    const [isHover, setIsHover] = useState(false);


    return (
        <aside className={`${styles.sidebar} ${isHover ? styles.active : ""}`}>

            <div className={styles.openBtn} onClick={() => setIsHover(prev => !prev)}>

                <span className={styles.materialSymbolsOutlined}>Menu</span>
            </div>
            {/* contenido */}
            <div className={styles.wrapper}>
                <div className={styles.topWrapper}>
                    <div className={styles.header}>

                        <span className={styles.headerName}>Jonny, Fernandez.</span>
                        <span className={styles.headerEmail}>tapiasgroup@gmail.com</span>
                    </div>



                    <nav className={styles.navMenu}>
                        <button className={styles.navMenuItem} value={'prod'} onClick={(e) => selector(e.target.value)}>Gestión de productos</button>
                        <button className={styles.navMenuItem} value={'orders'} onClick={(e) => selector(e.target.value)}>Gestión de pedidos</button>
                        <button className={styles.navMenuItem} value={'client'} onClick={(e) => selector(e.target.value)}>Gestión de clientes</button>
                        <button className={styles.navMenuItem} value={'report'} onClick={(e) => selector(e.target.value)}>Análisis y reportes</button>
                        <button className={styles.navMenuItem} value={'marketing'} onClick={(e) => selector(e.target.value)}>Marketing y promociones</button>
                        <button className={styles.navMenuItem} value={'content'} onClick={(e) => selector(e.target.value)}>Gestión de contenido</button>
                        <button className={styles.navMenuItem} value={'setting'} onClick={(e) => selector(e.target.value)}>Configuración del sitio</button>
                        <button className={styles.navMenuItem} value={'security'} onClick={(e) => selector(e.target.value)}>Seguridad y permisos</button>
                        <button className={styles.navMenuItem} value={'help'} onClick={(e) => selector(e.target.value)}>Soporte y ayuda</button>
                    </nav>

                </div>
                <div className={styles.footer}>
                    <div className={styles.navMenuLink}>

                        <NavLink to={'/home'} className={`${styles.materialSymbolsOutlined} ${styles.footerIcon}`} >Home</NavLink>
                        <div className={`${styles.materialSymbolsOutlined} ${styles.footerIcon}`}>LogOut</div>
                    </div>
                </div>
            </div>

        </aside>
    );
}

export default Sidebar;

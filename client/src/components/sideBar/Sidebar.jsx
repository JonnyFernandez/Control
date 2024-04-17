import { useState } from "react";
import "./style.css"; // Importa los estilos CSS
// import react from "../../assets"; // Importa la imagen del react
import { NAVLINKS } from "../../data/NavLinks";

function Sidebar() {

    const dato = NAVLINKS()
    const [isHover, setIsHover] = useState(false);

    return (
        <aside className={`sidebar ${isHover ? "active" : ""}`}>
            <div className="open-btn" onClick={() => setIsHover(prev => !prev)}>
                <span className="material-symbols-outlined">chevron_right</span>
            </div>
            <div className="wrapper">
                <div className="top_wrapper">
                    <div className="header">
                        {/* <span className="header-react"><img src={react} alt="" /></span> */}
                        <div className="header-details">
                            <span className="header-name">Lorem, ipsum.</span>
                            <span className="header-email">lorem@gmail.com</span>
                        </div>
                    </div>
                    <div className="search-box">
                        <span className="material-symbols-outlined search-icon">search</span>
                        <input type="text" name="searchBox" placeholder="Search..." />
                    </div>
                    <nav className="sidebar-nav">
                        <ul className="nav-menu">
                            {dato.map(item => (
                                <li key={item.name} className="nav-menu-item">
                                    <a href={item.path} className="nav-menu-link">
                                        <span className="material-symbols-outlined">{item.icon}</span>
                                        <span className="text">{item.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="footer">
                    <a href="/" className="nav-menu-link">
                        <span className="material-symbols-outlined footer-icon">reactut</span>
                        <span className="footer-text">reactut</span>
                    </a>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;

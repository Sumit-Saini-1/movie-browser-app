import { Link, useLocation } from "react-router-dom";
import styles from "./style.module.css";

function Header() {
    const location = useLocation();
    
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                🎬 Movie Browser
            </div>
            <nav className={styles.nav}>
                <Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link>
                <Link to="/favorite" className={location.pathname === '/favorite' ? styles.active : ''}>Favorites</Link>
            </nav>
        </header>
    )
}

export default Header

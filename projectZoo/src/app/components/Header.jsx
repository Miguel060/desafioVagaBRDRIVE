import styles from '../PageStyles.module.css';
import { PiCloudSunDuotone } from "react-icons/pi";

export default function Header({ children }) {
    return (
        <header className={styles.header}>
            <div className={styles.iconContainer}>
                <PiCloudSunDuotone size={80} color='#F8EEDF'></PiCloudSunDuotone>
                 <h1  className={styles.tituloBRzoo}>BRzoo</h1>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <a href="/">Início</a>
                    </li>
                </ul>
            </nav>
            {children}
        </header>
    );
}

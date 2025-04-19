import styles from '../PageStyles.module.css';

export default function Header(){
    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li className={styles.navItem}>
                        <a href="/buscar">Início</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
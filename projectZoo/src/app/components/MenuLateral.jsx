'use client';
import Link from "next/link";
import styles from "../PageStyles.module.css";

export default function MenuLateral() {
  return (
    <div className={styles.menuContainer}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <Link href="/inserir">INSERIR</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/deletar">REMOVER</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/editar">EDITAR</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/">BUSCAR</Link>
        </li>
      </ul>
    </div>
  );
}

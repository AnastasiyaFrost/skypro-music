import Image from "next/image";
import styles from "./Navigation.module.css";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImage}
          src="/img/logo.png"
          alt="Логотип Skypro-music"
          width={113}
          height={17}
        />
      </div>
      <div className={styles.navBurger}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      <div className={styles.navMenu}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <Link href="/" className={styles.menuLink}>
              Главное
            </Link>
          </li>
          <li className={styles.menuItem}>
            <a href="#" className={styles.menuLink}>
              Мой плейлист
            </a>
          </li>
          <li className={styles.menuItem}>
            <Link href="/signin" className={styles.menuLink}>
              Войти
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

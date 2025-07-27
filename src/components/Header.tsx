import { Link, useLocation } from "react-router";
import styles from "../styles/Header.module.css";

export function Header() {
  const { pathname } = useLocation();
  const isCartPage = pathname === "/cart";

  return (
    <div className={styles.header}>
      <h1>FashionHub</h1>
      <Link to={isCartPage ? "/" : "/cart"} className={styles.cartButton}>
        {isCartPage ? "Shop" : "Cart"}
      </Link>
    </div>
  );
}
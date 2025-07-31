import { Link, useLocation } from "react-router";
import styles from "./Header.module.css";

export function Header() {
  const { pathname } = useLocation();
  const isCartPage = pathname === "/cart";

  return (
    <div className={styles.header}>
      <Link to="/">
        <h1>FashionHub</h1>
      </Link>

      {/* Toggle link text and target between "Cart" and "Shop" based on current page */}
      <Link to={isCartPage ? "/" : "/cart"} className={styles.cartButton}>
        {isCartPage ? "Shop" : "Cart"}
      </Link>
    </div>
  );
}

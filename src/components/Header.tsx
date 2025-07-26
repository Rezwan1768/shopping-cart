import styles from "../styles/Header.module.css";

export function Header() {
  return (
    <div className={styles.header}>
      <h1>GOAT Shop</h1>
      <button>Cart</button>
    </div>
  )
}
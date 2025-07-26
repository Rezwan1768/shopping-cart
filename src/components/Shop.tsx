import { useState } from "react";
import { useItemsByCategory } from "../hooks/useItemsByCategory";
import { ItemCategory } from "./ItemCategory";
import styles from "../styles/Shop.module.css";
import { Header } from "./Header";

export function Shop() {
  const [retryId, setRetryId] = useState(0);  // To refetch data on error
  const { allItems, loading, error } = useItemsByCategory(retryId);

  if (loading) return (
    <div className={styles.container}>
      <div className={styles.loadSpinner} role="status" aria-label="Loading"></div>
    </div>);

  if (error) return (
    <div className={styles.container}>
      <div className={styles.error}>
        <p>Something went wrong: {error}</p>
        <button onClick={() => setRetryId(retryId + 1)}>Try Again</button>
      </div>
    </div>
  );

  return (allItems &&
    <>
      <Header />
      <nav className={styles.nav}>
        <a href="#mens">Men's</a>
        <a href="#womens">Women's</a>
        <a href="#jewelry">Jewelry</a>
      </nav>
      <section className={styles.shopItems}>
        <ItemCategory heading="Men's Clothing" items={allItems.mensClothing} id="mens" isFirst={true} />
        <ItemCategory heading="Women's Clothing" items={allItems.womensClothing} id="womens" />
        <ItemCategory heading="Jewelry" items={allItems.jewelry} id="jewelry" />
      </section>
    </>
  )
}
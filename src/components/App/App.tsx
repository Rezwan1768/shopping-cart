import { useState } from "react";
import { Outlet } from "react-router";
import styles from "./App.module.css";
import type { CartItem } from "../../types";
import { Header } from "../Header/Header";
import { useItemsByCategory } from "../../hooks/useItemsByCategory";

function App() {
  const [retryId, setRetryId] = useState(0); // To refetch data on error
  const { allItems, loading, error } = useItemsByCategory(retryId);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  if (loading)
    return (
      <div className={styles.container}>
        <div
          className={styles.loadSpinner}
          role="status"
          aria-label="Loading"
        ></div>
      </div>
    );

  if (error)
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Something went wrong: {error}</p>
          <button onClick={() => setRetryId(retryId + 1)}>Try Again</button>
        </div>
      </div>
    );

  return (
    <>
      <Header />
      <Outlet context={{ allItems, cartItems, setCartItems }} />
    </>
  );
}

export default App;

import { useState } from "react";
import type { Item } from "../types";
import { StarRating } from "./StarRating";
import styles from "../styles/ItemCard.module.css";

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  // const [item, setItem] = useState<Item | null>(null);
  const [amount, setAmount] = useState('1');
  const [isInCart, setIsInCart] = useState(false);

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    // Only allow numeric strings (or empty string for typing flexibility)
    // Prevent non-numeric or negative input
    if (/^\d*$/.test(value)) {
      if (Number(value) > 10) value = "10"; // Prevent going above limit
      setAmount(value);
    }
  }

  function handleBlur() {
    // Prevent negative amount or empty
    if (amount === "" || Number(amount) <= 0) {
      setAmount("0");
      setIsInCart(false);
    }
  }

  function handleAdd() {
    setAmount('1');
    setIsInCart(true);
  }

  const { title, price, description, image, rating: { rate, count } } = item;
  return (
    <div className={styles.card}>

      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
        <StarRating rating={rate} reviewCount={count} />
      </div>
      
      <img className={styles.itemImg} src={image} alt={title} width="100" height="110" />
      <p className={styles.description}>{description}</p>
      
      <div className={styles.cartActions}>
        <p>${price}</p>
        {isInCart ?
          /* If the item is already in the cart, allow user to change quantity */
          <div className={styles.amountInput}>
            <label htmlFor="quantity">Amount:</label>
            <input id="quantity" type="number" max="10" min="0" autoFocus value={amount} onChange={handleAmountChange} onBlur={handleBlur} />
          </div>
          :
          <button onClick={handleAdd}>Add to Cart</button>
        }
      </div>

    </div>
  );
}


import { useState } from "react";
import { useCartContext } from "../hooks/useCartContext";
import type { Item, CartItem } from "../types";
import { StarRating } from "./StarRating";
import styles from "../styles/ItemCard.module.css";


type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  const { id, title, price, description, image, rating: { rate, count } } = item;
  const { cartItems, setCartItems } = useCartContext();
  const [amount, setAmount] = useState(() =>
    cartItems.find((cartItem) => cartItem.id === id)?.quantity.toString() ?? "1");

  const isInCart = cartItems.some((cartItem) => cartItem.id === id);

  function handleAdd() {
    const newItem: CartItem = {
      id,
      title,
      price,
      image,
      quantity: 1, 
    };
  
    setCartItems((prev) => [...prev, newItem]);
    setAmount("1"); 
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    // Only allow numeric strings (or empty string for typing flexibility)
    // Prevent non-numeric or negative input
    if (/^\d*$/.test(value)) {
      if (Number(value) > 10) value = "10"; // Prevent going above limit
      setAmount(value);
    }
  }
  
  // When user clicks away from the input
  function handleBlur() {
    const quantity = Number(amount);
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  }

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
            <label htmlFor={`quantity-${id}`}>Amount:</label>
            <input id={`quantity-${id}`} type="number" max="10" min="0" autoFocus value={amount} onChange={handleAmountChange} onBlur={handleBlur} />
          </div>
          :
          <button onClick={handleAdd}>
            Add to Cart
          </button>
        }
      </div>

    </div>
  );
}


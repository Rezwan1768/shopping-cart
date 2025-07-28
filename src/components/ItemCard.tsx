import { useCartContext } from "../hooks/useCartContext";
import type { Item, CartItem } from "../types";
import { StarRating } from "./StarRating";
import styles from "../styles/ItemCard.module.css";
import { QuantityInput } from "./QuantityInput";
import { useState } from "react";

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  const {
    id,
    title,
    price,
    description,
    image,
    rating: { rate, count },
  } = item;
  const { cartItems, addItem } = useCartContext();

  const cartItem = cartItems.find((item) => item.id === id);
  const isInCart = !!cartItem;

  const [focus, setFocus] = useState(false);
  function handleAdd() {
    const newItem: CartItem = {
      id,
      title,
      price,
      image,
      quantity: 1,
    };

    addItem(newItem);
    setFocus(true);
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{title}</h3>
        <StarRating rating={rate} reviewCount={count} />
      </div>

      <img
        className={styles.itemImg}
        src={image}
        alt={title}
        width="100"
        height="110"
      />
      <p className={styles.description}>{description}</p>

      <div className={styles.cartActions}>
        <p>${price}</p>

        {isInCart ? (
          /* If the item is already in the cart, allow user to change quantity */
          <QuantityInput
            id={id}
            initialValue={cartItem.quantity}
            focus={focus}
          />
        ) : (
          <button onClick={handleAdd}>Add to Cart</button>
        )}
      </div>
    </div>
  );
}

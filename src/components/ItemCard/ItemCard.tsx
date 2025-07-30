import { useCartContext } from "../../hooks/useCartContext";
import type { Item, CartItem } from "../../types";
import { StarRating } from "../StarRating/StartRating";
import styles from "./ItemCard.module.css";
import { QuantityInput } from "../QuantityInput/QuantityInput";
import { useState } from "react";
import { Link } from "react-router";

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

  // Extract values from react routers outlet context
  const { cartItems, addItem } = useCartContext();

  // Check if the item is already in the cart
  const cartItem = cartItems.find((item) => item.id === id);
  const isInCart = !!cartItem;

  // Focus state is used to control auto-focus behavior for QuantityInput
  const [focus, setFocus] = useState(false);

  // Adds the item to the cart with a default quantity of 1
  function handleAdd() {
    const newItem: CartItem = {
      id,
      title,
      price,
      image,
      quantity: 1,
    };

    addItem(newItem);
    setFocus(true); // Trigger focus when the quantity input appears
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Link to={`/item/${id}`}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        <StarRating rating={rate} reviewCount={count} />
      </div>

      <Link to={`/item/${id}`}>
        <img
          className={styles.itemImg}
          src={image}
          alt={title}
          width="100"
          height="110"
        />
      </Link>
      <p className={styles.description}>{description}</p>

      <div className={styles.cartActions}>
        <p>${price}</p>

        {isInCart ? (
          // Trigger focus when the quantity input appears
          <QuantityInput
            id={id}
            initialValue={cartItem.quantity}
            focus={focus}
            removeWhenZero={true}
          />
        ) : (
          // If not in cart, show button to add it
          <button onClick={handleAdd}>Add to Cart</button>
        )}
      </div>
    </div>
  );
}

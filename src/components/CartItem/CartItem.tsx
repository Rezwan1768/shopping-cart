import type { CartItem } from "../../types";
import styles from "./CartItem.module.css";
import { QuantityInput } from "../QuantityInput/QuantityInput";
import { useCartContext } from "../../hooks/useCartContext";

export function CartItem({ item }: { item: CartItem }) {
  const { id, title, image, price, quantity } = item;
  const { removeItem } = useCartContext();

  return (
    <div className={styles.card}>
      <div className={styles.titleImage}>
        <h2>{title}</h2>
        <img src={image} alt={title} width="100" height="110" />
      </div>

      <div className={styles.controls}>
        {/* Display total price for this item (unit price × quantity) */}
        <p>${(price * quantity).toFixed(2)}</p>

        {/* Allow user to update quantity of the item, capped at 1 and 10 */}
        <QuantityInput id={id} initialValue={quantity} />

        <button className={styles.removeBtn} onClick={() => removeItem(id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

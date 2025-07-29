import { useCartContext } from "../hooks/useCartContext";
import { CartItem } from "./CartItem";
import styles from "../styles/Cart.module.css";

export function Cart() {
  const { cartItems } = useCartContext();

  if (cartItems.length === 0) {
    return (
      <p className="center">Your cart is empty. Add items from the shop.</p>
    );
  }

  // Calculate the total price of items in cart
  const total = parseFloat(
    cartItems
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2),
  );

  return (
    <div className={styles.cart}>
      {
        // Show all the items in the cart
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))
      }

      <div className={styles.buy}>
        {
          // Show total price and a buy button
          // The buy button does nothing
        }
        <p>Total: {total}</p>
        <button>
          Buy <span>(Does nothing)</span>
        </button>
      </div>
    </div>
  );
}

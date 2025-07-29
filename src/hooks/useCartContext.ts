import { useOutletContext } from "react-router";
import type { CartItem } from "../types";

type CartOutletContext = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

// Custom hook to encapsulate cart logic shared via React Router outlet context
export function useCartContext() {
  // Access cart items and state setter from the outlet context
  const { cartItems, setCartItems } = useOutletContext<CartOutletContext>();

  function removeItem(id: number) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  /**
   * Updates the quantity of a specific cart item.
   * - If `quantity <= 0` *and* `shouldRemove` is true, the item is removed.
   * - Otherwise, the item's quantity is updated (min value enforced as 1).
   */
  function updateQuantity(id: number, quantity: number, shouldRemove = false) {
    if (quantity <= 0 && shouldRemove) {
      removeItem(id);
    }
    setCartItems((prev) => {
      return prev.map((item) =>
        item.id === id
          ? { ...item, quantity: quantity <= 0 ? 1 : quantity }
          : item,
      );
    });
  }

  function addItem(item: CartItem) {
    setCartItems((prev) => [...prev, item]);
  }

  return { cartItems, addItem, removeItem, updateQuantity };
}

import { useOutletContext } from "react-router";
import type { CartItem } from "../types";

type CartOutletContext = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export function useCartContext() {
  const { cartItems, setCartItems } = useOutletContext<CartOutletContext>();

  function updateQuantity(id: number, quantity: number) {
    setCartItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      return prev.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      );
    });
  }

  function addItem(item: CartItem) {
    setCartItems((prev) => [...prev, item]);
  }

  return { cartItems, addItem, updateQuantity };
}

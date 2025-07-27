import { useOutletContext } from "react-router";
import type { CartItem } from "../types";

type CartOutletContext = {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export function useCartContext() {
  return useOutletContext<CartOutletContext>();
}
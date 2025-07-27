import { useCartContext } from "../hooks/useCartContext";


export function Cart() {
  const { cartItems } = useCartContext();

  if (cartItems.length === 0) {
    return (
      <p className="center">
        Your cart is empty. Add items from the shop.
      </p>
    );
  } 
    
  return (
      cartItems.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))
    );
  

}
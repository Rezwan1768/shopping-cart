import { useState } from "react";
import { useCartContext } from "../../hooks/useCartContext";
import type { CartItem, Item } from "../../types";
import { QuantityInput } from "../QuantityInput/QuantityInput";

type CardAddProps = {
  item: Item;
  removeWhenZero?: boolean;
};
export function CartAdd({ item, removeWhenZero }: CardAddProps) {
  const { cartItems, addItem } = useCartContext();
  const { id, title, price, image } = item;

  const itemInCart = cartItems.find((item) => item.id === id);
  const isInCart = !!itemInCart;

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

  return isInCart ? (
    <QuantityInput
      id={id}
      initialValue={itemInCart.quantity}
      focus={focus}
      removeWhenZero={removeWhenZero}
    />
  ) : (
    <button onClick={handleAdd}>Add to Cart</button>
  );
}

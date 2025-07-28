import type { CartItem } from "../types";
import { QuantityInput } from "./QuantityInput";

export function CartItem({ item }: { item: CartItem }) {
  const { id, title, image, price, quantity } = item;
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <img src={image} alt={title} width="100" height="110" />
      </div>
      <div>
        <p>${price * quantity}</p>
        <QuantityInput id={id} initialValue={quantity} />
      </div>
    </div>
  );
}

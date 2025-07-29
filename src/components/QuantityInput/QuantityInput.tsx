import { useState } from "react";
import styles from "./QuantityInput.module.css";
import { useCartContext } from "../../hooks/useCartContext";

type QuantityInputProps = {
  id: number;
  initialValue: number;
  focus?: boolean;
  removeWhenZero?: boolean;
};

export function QuantityInput({
  id,
  initialValue,
  focus = false,
  removeWhenZero = false,
}: QuantityInputProps) {
  // Store amount as a string to preserve user input while typing,
  // avoiding issues like auto-replacing empty input with 0
  const [amount, setAmount] = useState(() => initialValue.toString());
  const { updateQuantity } = useCartContext();

  // Handle user input changes
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    // Only allow numeric input (digits only, including empty string for temporary erase)
    if (/^\d*$/.test(value)) {
      if (Number(value) > 10) value = "10";

      // If input is 0 or below and `removeWhenZero` is false, reset to 1 (prevent accidental removal)
      if (Number(value) <= 0 && !removeWhenZero) {
        value = "1";
      }
      setAmount(value);
    }
  }

  function handleBlur() {
    const quantity = Number(amount);
    // Removes the item if quantity is 0 and removeWhenZero is true;
    // otherwise, keeps the quantity at a minimum of 1
    updateQuantity(id, quantity, removeWhenZero);
  }

  return (
    <div className={styles.amountInput}>
      <label htmlFor={`quantity-${id}`}>Amount:</label>
      <input
        id={`quantity-${id}`}
        type="number"
        max="10"
        min="0"
        autoFocus={focus}
        value={amount}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}

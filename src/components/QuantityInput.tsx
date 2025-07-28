import { useState } from "react";
import styles from "../styles/QuantityInput.module.css";
import { useCartContext } from "../hooks/useCartContext";

type QuantityInputProps = {
  id: number;
  initialValue: number;
  focus?: boolean;
};

export function QuantityInput({
  id,
  initialValue,
  focus = false,
}: QuantityInputProps) {
  const [amount, setAmount] = useState(() => initialValue.toString());
  const { updateQuantity } = useCartContext();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    if (/^\d*$/.test(value)) {
      if (Number(value) > 10) value = "10";
      setAmount(value);
    }
  }

  function handleBlur() {
    const quantity = Number(amount);
    updateQuantity(id, quantity);
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

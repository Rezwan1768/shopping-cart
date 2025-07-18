import { useState, useEffect } from "react";
import fullStar from "../assets/full-star.svg";
import halfStar from "../assets/half-star.svg";
import styles from "../styles/ItemCard.module.css";

type Item = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: { rate: number, count: number },
}

export function ItemCard() {
  const [item, setItem] = useState<Item | null>(null);
  const [amount, setAmount] = useState('1');
  const [isInCart, setIsInCart] = useState(false);

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;

    // Only allow numeric strings (or empty string for typing flexibility)
    // Prevent non-numeric or negative input
    if (/^\d*$/.test(value)) {
      if (Number(value) > 10) value = "10"; // Prevent going above limit
      setAmount(value);
    }

  }

  function handleBlur() {
    // Prevent negative amount or empty
    if (amount === "" || Number(amount) <= 0) {
      setAmount("0");
      setIsInCart(false);
    }
  }

  function handleAdd() {
    setAmount('1');
    setIsInCart(true);
  }

  useEffect(() => {
    const url = "https://fakestoreapi.com/products/3";

    (async function () {
      const response = await fetch(url);
      const data: Item = await response.json();
      setItem(data);
    })();
  }, [])

  if (!item) return null;

  const { title, price, description, image, rating: { rate, count } } = item;
  return (
    <div className={styles.card}>

      <h2>{title}</h2>
      <div>
        {item && showStars(rate)}
        <span>{rate}</span>
        <p>{count} Reviews</p>
      </div>

      <img className={styles.itemImg} src={image} alt={title} width="100" height="100" />
      <p>{description}</p>
      <div>
        <p>${price}</p>
        {isInCart ?
          /* If the item is already in the cart, allow user to change quantity */
          <div>
            <label htmlFor="quantity">Amount:</label>
            <input id="quantity" type="number" max="10" min="0" autoFocus value={amount} onChange={handleAmountChange} onBlur={handleBlur} />
          </div>
          :
          <button onClick={handleAdd}>Add to Cart</button>
        }
      </div>

    </div>
  );
}

// Returns an array of <img> JSX elements representing star ratings.
// JSX allows arrays of elements to be rendered directly inside components,
// so this function can be used like: {showStars(rate)}
function showStars(rating: number) {
  const stars = [];
  let fullStars = Math.floor(rating);
  const remaining = rating - fullStars;
  let hasHalfStar = false;

  if (remaining > 0.7) {
    fullStars += 1; // Round up if the rating is closer to the next whole number
  } else if (remaining > 0.3) {
    hasHalfStar = true; // Show a half star for values around x.5
  }

  for (let i = 0; i < fullStars; ++i) {
    stars.push(
      <img key={`full-${i}`} src={fullStar} alt="star" width="30" height="30" />
    )
  }

  if (hasHalfStar) {
    stars.push(<img key="half" src={halfStar} alt="star" width="30" height="30" />)
  }

  return stars;
}
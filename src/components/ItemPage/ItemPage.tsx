import { useParams } from "react-router";
import { useCartContext } from "../../hooks/useCartContext";
import { ErrorPage } from "../ErrorPage/ErrorPage";
import { StarRating } from "../StarRating/StartRating";
import { CartAdd } from "../CartAdd/CartAdd";
import styles from "./ItemPage.module.css";
import { Loading } from "../Loading/Loading";

export function ItemPage() {
  const { allItems, removeItem } = useCartContext();

  const allItemsArray = [
    ...(allItems?.mensClothing || []),
    ...(allItems?.womensClothing || []),
    ...(allItems?.jewelry || []),
  ];

  const { itemId } = useParams();
  const id = Number(itemId);

  const item = allItemsArray?.find((item) => item.id === id);

  if (!allItems) {
    return <Loading />;
  }

  if (!item) {
    return <ErrorPage />;
  }

  const {
    title,
    image,
    price,
    description,
    rating: { rate, count },
  } = item;

  return (
    <div className={styles.item}>
      <h2>{title}</h2>

      <div className={styles.detail}>
        <div className={styles.ratingAndImg}>
          <StarRating rating={rate} reviewCount={count} />
          <img
            className={styles.productImg}
            src={image}
            alt={title}
            width="200"
            height="220"
          />
        </div>

        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.controls}>
        <p className={styles.price}>${price}</p>
        <CartAdd item={item} removeWhenZero={false} />
        <button onClick={() => removeItem(id)}>Remove</button>
      </div>
    </div>
  );
}

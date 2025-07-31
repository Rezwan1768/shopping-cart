import type { Item } from "../../types";
import { StarRating } from "../StarRating/StartRating";
import styles from "./ItemCard.module.css";
import { Link } from "react-router";
import { CartAdd } from "../CartAdd/CartAdd";

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  const {
    id,
    title,
    price,
    description,
    image,
    rating: { rate, count },
  } = item;

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Link to={`/item/${id}`}>
          <h3 className={styles.title}>{title}</h3>
        </Link>
        <StarRating rating={rate} reviewCount={count} />
      </div>

      <Link to={`/item/${id}`} className={styles.imgLink}>
        <img
          className={styles.itemImg}
          src={image}
          alt={title}
          width="100"
          height="110"
        />
      </Link>

      <p className={styles.description}>{description}</p>

      <div className={styles.cartActions}>
        <p>${price}</p>

        <CartAdd item={item} removeWhenZero={true} />
      </div>
    </div>
  );
}

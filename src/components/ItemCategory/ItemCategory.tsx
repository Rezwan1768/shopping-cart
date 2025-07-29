import type { Item } from "../../types";
import { ItemCard } from "../ItemCard/ItemCard";
import styles from "./ItemCategory.module.css";

type ItemCategoryProps = {
  heading: string;
  items: Item[];
  id: string;
  isFirst?: boolean;
};

export function ItemCategory({
  heading,
  items,
  id,
  isFirst = false,
}: ItemCategoryProps) {
  // isFirst prop is just for stylistic purpose
  const classes = `${styles.heading} ${isFirst ? "" : styles.spacing}`;
  return (
    <section id={id} data-testid="item-section">
      <h2 className={classes}>{heading}</h2>

      <div className={styles.itemContainer}>
        {items.length > 0 ? (
          items.map((item) => <ItemCard key={item.id} item={item} />)
        ) : (
          <p>No items available.</p>
        )}
      </div>
    </section>
  );
}

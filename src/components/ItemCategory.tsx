import type { Item } from "../types";
import { ItemCard } from "./ItemCard";
import styles from "../styles/ItemCategory.module.css";

type ItemCategoryProps = {
  heading: string,
  items: Item[],
  id: string,
  isFirst?: boolean,
}

export function ItemCategory({ heading, items, id, isFirst = false }: ItemCategoryProps) {
  const classes = `${styles.heading} ${isFirst ? "" : styles.spacing}`;
  return (
    <section id={id}>
      <h2 className={classes}>{heading}</h2>
      <div className={styles.itemContainer}>
        {items.length > 0 ?
          items.map((item) =>
            <ItemCard key={item.id} item={item} />
          ) :
          <p>No items available.</p>
        }
      </div>
    </section>
  )
}
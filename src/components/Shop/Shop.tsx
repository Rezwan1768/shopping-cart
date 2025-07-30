import { useCartContext } from "../../hooks/useCartContext";
import { ItemCategory } from "../ItemCategory/ItemCategory";
import styles from "./Shop.module.css";

export function Shop() {
  const { allItems } = useCartContext();

  return (
    allItems && (
      <>
        <nav className={styles.nav}>
          <a href="#mens">Men's</a>
          <a href="#womens">Women's</a>
          <a href="#jewelry">Jewelry</a>
        </nav>
        <section className={styles.shopItems}>
          <ItemCategory
            heading="Men's Clothing"
            items={allItems.mensClothing}
            id="mens"
            isFirst={true}
          />
          <ItemCategory
            heading="Women's Clothing"
            items={allItems.womensClothing}
            id="womens"
          />
          <ItemCategory
            heading="Jewelry"
            items={allItems.jewelry}
            id="jewelry"
          />
        </section>
      </>
    )
  );
}

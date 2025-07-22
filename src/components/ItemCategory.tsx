import type { Item } from "../types";
import { ItemCard } from "./ItemCard";

type ItemCategoryProps = {
  heading: string,
  items: Item[],
}

export function ItemCategory({ heading, items }: ItemCategoryProps) {
  return (
    <div>
      <h2>{heading}</h2>
      {items.length > 0 ?
        items.map((item) =>
          <ItemCard key={item.id} item={item} />
        ) :
        <p>No items available.</p>
      }
    </div>
  )
}
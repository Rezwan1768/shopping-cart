import { useState, useEffect } from "react";
import type { Item, ItemsByCategory } from "../types";

export function useItemsByCategory(retryId: number) {
  const [allItems, setAllItems] = useState<ItemsByCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignoreResult = false;
    setLoading(true);
    (async function fetchItems() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`Failed to fetch items: ${response.status}`);
        }
        
        const data: Item[] = await response.json();
        if(ignoreResult) return;

        // Gather all the fetched data, then update state to reduce rerendering
        const itemsByCategory = data.reduce<ItemsByCategory>(
          (result, item) => {
            if (item.category === "men's clothing")
              result.mensClothing.push(item);
            else if (item.category === "women's clothing")
              result.womensClothing.push(item);
            else if (item.category === "jewelery")
              result.jewelry.push(item);

            return result;
          },
          { mensClothing: [], womensClothing: [], jewelry: [] }
        )
        setAllItems(itemsByCategory);

      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    })();

    return () => {ignoreResult = true};
  }, [retryId])

  return { allItems, loading, error };
}
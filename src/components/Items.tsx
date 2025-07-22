import { useState } from "react";
import { useItemsByCategory } from "../hooks/useItemsByCategory";
import { ItemCategory } from "./ItemCategory";

export function Items() {
  const [retryId, setRetryId] = useState(0);  // To refetch data on error
  const { allItems, loading, error } = useItemsByCategory(retryId);

  if (loading) return (<div></div>);
  if (error) return (
    <div>
      <p>Something went wrong: {error}</p>
      <button onClick={() => setRetryId(retryId + 1)}>Try Again</button>
    </div>
  );

  return (allItems &&
    <>
      <ItemCategory heading="Men's Clothing" items={allItems.mensClothing} />
      <ItemCategory heading="Women's Clothing" items={allItems.womensClothing} />
      <ItemCategory heading="Jewelry" items={allItems.jewelry} />
    </>
  )
}
import { useItemsByCategory } from "../hooks/useItemsByCategory";

export function Products() {
  const {items, loading, error} = useItemsByCategory();
  console.log(items);
  
  return (
    <div>
     
    </div>
  )
}
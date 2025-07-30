import { useParams } from "react-router";
import { useCartContext } from "../../hooks/useCartContext";
import { ErrorPage } from "../ErrorPage/ErrorPage";

export function ItemPage() {
  const { allItems } = useCartContext();
  const allItemsArray = [
    ...(allItems?.mensClothing || []),
    ...(allItems?.womensClothing || []),
    ...(allItems?.jewelry || []),
  ];

  const { itemId } = useParams();
  const id = Number(itemId);

  const item = allItemsArray?.find((item) => item.id === id);

  if (!item) {
    return <ErrorPage />;
  }

  return (
    <div>
      <h1>{item.title}</h1>
    </div>
  );
}

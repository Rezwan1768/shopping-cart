export type Item = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: { rate: number, count: number },
}

export type ItemsByCategory = {
  mensClothing: Item[],
  womensClothing: Item[],
  jewelry: Item[]
}

export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};
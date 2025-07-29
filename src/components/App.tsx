import { useState } from "react";
import { Outlet } from "react-router";
import type { CartItem } from "../types";
import { Header } from "./Header/Header";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <>
      <Header />
      <Outlet context={{ cartItems, setCartItems }} />
    </>
  );
}

export default App;

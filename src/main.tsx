import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./globalStyles/index.css";
import App from "./components/App/App";
import { Cart } from "./components/Cart/Cart";
import { ErrorPage } from "./components/ErrorPage/ErrorPage";
import { Shop } from "./components/Shop/Shop";
import { ItemPage } from "./components/ItemPage/ItemPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="item/:itemId" element={<ItemPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);

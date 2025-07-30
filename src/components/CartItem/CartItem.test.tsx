import { test, expect } from "vitest";
import { screen, render } from "@testing-library/react";
import { CartItem } from "./CartItem";

vi.mock("../../hooks/useCartContext");

const mockItem = {
  id: 3,
  title: "My Item",
  price: 8.5,
  image: "fakeImage",
  quantity: 7,
};

test("content is rendered", () => {
  render(<CartItem item={mockItem} />);

  expect(screen.getByRole("heading", { name: /my item/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/amount/i)).toHaveValue(7);

  // Alt text is same as the name of the product
  expect(screen.getByAltText(/my item/i)).toBeInTheDocument();

  // Price displayed is quantity × unit price, formatted to 2 decimal places
  const total = (mockItem.price * mockItem.quantity).toFixed(2);
  expect(screen.getByText(`$${total}`)).toBeInTheDocument();
});

import { test, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { CartItem } from "./CartItem";

const removeItemMock = vi.fn();

vi.mock("../../hooks/useCartContext", () => ({
  useCartContext: () => ({
    removeItem: removeItemMock,
  }),
}));

const mockItem = {
  id: 3,
  title: "My Item",
  price: 8.5,
  image: "fakeImage",
  quantity: 7,
};

test("content is rendered", () => {
  render(
    <MemoryRouter>
      <CartItem item={mockItem} />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { name: /my item/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/amount/i)).toHaveValue(7);

  // Alt text is same as the name of the product
  expect(screen.getByAltText(/my item/i)).toBeInTheDocument();

  // Price displayed is quantity × unit price, formatted to 2 decimal places
  const total = (mockItem.price * mockItem.quantity).toFixed(2);
  expect(screen.getByText(`$${total}`)).toBeInTheDocument();
});

test("calls removeItem with correct id when Remove button is clicked", async () => {
  render(
    <MemoryRouter>
      <CartItem item={mockItem} />
    </MemoryRouter>,
  );

  const user = userEvent.setup();
  const removeButton = screen.getByRole("button", { name: /remove/i });

  await user.click(removeButton);

  expect(removeItemMock).toHaveBeenCalledWith(mockItem.id);
});

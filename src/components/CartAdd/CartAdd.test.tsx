import { describe, test, expect, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CartAdd } from "./CartAdd";
import { useCartContext } from "../../hooks/useCartContext";
import type { Item } from "../../types";

// Mock useCartContext
vi.mock("../../hooks/useCartContext");

const mockItem = {
  id: 1,
  price: 9.99,
} as Item;

describe("CartAdd", () => {
  test("renders Add to Cart button when item is not in cart", () => {
    render(<CartAdd item={mockItem} />);

    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
  });

  test("calls addItem and shows QuantityInput after clicking Add to Cart", async () => {
    const user = userEvent.setup();
    const addItem = vi.fn();
    (useCartContext as Mock).mockReturnValue({
      cartItems: [],
      addItem,
    });

    render(<CartAdd item={mockItem} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    await user.click(button);

    expect(addItem).toHaveBeenCalledWith(
      expect.objectContaining({ id: mockItem.id }),
    );

    // After adding, component should re-render and show QuantityInput
    // QuantityInput renders an input with role="spinbutton"
    (useCartContext as Mock).mockReturnValue({
      cartItems: [{ ...mockItem, quantity: 1 }],
      addItem,
    });

    render(<CartAdd item={mockItem} />); // simulate re-render after state update

    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  test("renders Add to Cart again when removeWhenZero is true and quantity is 0", () => {
    const addItem = vi.fn();
    (useCartContext as Mock).mockReturnValue({
      cartItems: [],
      addItem,
    });

    render(<CartAdd item={mockItem} removeWhenZero={true} />);
    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
  });
});

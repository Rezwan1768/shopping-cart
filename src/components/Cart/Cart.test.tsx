import { describe, test, expect, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useCartContext } from "../../hooks/useCartContext";
import { Cart } from "./Cart";

vi.mock("../../hooks/useCartContext");

const mockUseCartContext = useCartContext as Mock;

describe("Cart component", () => {
  test("when cart is empty", () => {
    mockUseCartContext.mockReturnValue({ cartItems: [] });

    render(<Cart />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  test("when cart has items", () => {
    const items = [
      { title: "item", price: 123.24, quantity: 1 },
      { title: "item", price: 13.44, quantity: 4 },
      { title: "item", price: 9.99, quantity: 7 },
    ];

    mockUseCartContext.mockReturnValue({ cartItems: items });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );

    // Check 3 item headings rendered
    expect(screen.getAllByRole("heading", { name: /item/i }).length).toBe(3);

    // Calculate expected total
    const expectedTotal = items
      .reduce((sum, item) => sum + item.price * item.quantity, 0)
      .toFixed(2);

    expect(screen.getByText(`Total: $${expectedTotal}`)).toBeInTheDocument();
  });
});

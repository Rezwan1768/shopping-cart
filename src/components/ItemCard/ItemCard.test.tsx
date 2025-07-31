import { describe, test, expect, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { useCartContext } from "../../hooks/useCartContext";
import { MemoryRouter } from "react-router";
import type { Item } from "../../types";
import { ItemCard } from "./ItemCard";

// This tells Vitest to use the file in `__mocks__/useCartContext.ts`
vi.mock("../../hooks/useCartContext");

const mockItem: Item = {
  id: 1,
  title: "Cotton Jacket",
  price: 10.99,
  description: "Jacket for all occasions.",
  category: "men's clothing",
  image: "fake.image.png",
  rating: {
    rate: 4.4,
    count: 122,
  },
};

beforeEach(() => {
  render(
    <MemoryRouter>
      <ItemCard item={mockItem} />
    </MemoryRouter>,
  );
});

describe("ItemCard rendering", () => {
  test("should render item data correctly", () => {
    const heading = screen.getByRole("heading", {
      name: /cotton jacket/i,
    });
    const description = screen.getByText(/jacket for all occasions\./i);
    const price = screen.getByText(/\$10\.99/);
    const altText = screen.getByAltText(/cotton jacket/i);

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(altText).toBeInTheDocument();
  });

  test("renders star rating", () => {
    expect(screen.getAllByAltText(/star/i).length).toBe(5);
  });
});

describe("ItemCard cart interaction", () => {
  test("shows Add to Cart button when item is not in the cart", () => {
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeInTheDocument();
  });

  test("shows quantity input when item is in the cart", () => {
    // The spinbutton is shown only if the item already exists in cartItems.
    // Mocking cartItems with a matching id will cause the condition to be true.
    (useCartContext as Mock).mockReturnValue({
      cartItems: [{ id: 1, quantity: 2 }],
      addItem: vi.fn(),
    });

    render(
      <MemoryRouter>
        <ItemCard item={mockItem} />
      </MemoryRouter>,
    );

    // Expect the QuantityInput to be visible
    const spinButton = screen.getByRole("spinbutton", { name: /amount/i });
    expect(spinButton).toBeInTheDocument();
    expect(spinButton).toHaveValue(2);
  });
});

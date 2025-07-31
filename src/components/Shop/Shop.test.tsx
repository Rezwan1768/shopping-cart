import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Shop } from "./Shop";
import { MemoryRouter } from "react-router";

// Helper for creating mock items
const mockItem = (overrides = {}) => ({
  id: 1,
  title: "Cotton Jacket",
  price: 10.99,
  description: "Jacket for all occasions.",
  category: "men's clothing",
  image: "fake.image.png",
  rating: { rate: 4.4, count: 122 },
  ...overrides,
});

// Return few mocked items form the hook
vi.mock("../../hooks/useCartContext", () => ({
  useCartContext: () => ({
    allItems: {
      mensClothing: [mockItem({ id: 1, title: "Shirt" })],
      womensClothing: [mockItem({ id: 2, title: "Dress" })],
      jewelry: [mockItem({ id: 3, title: "Necklace" })],
    },
    cartItems: [],
    addItem: vi.fn(),
    removeItem: vi.fn(),
    updateQuantity: vi.fn(),
  }),
}));

describe("Shop Component", () => {
  test("renders categories when data is available", () => {
    render(
      <MemoryRouter>
        <Shop />
      </MemoryRouter>,
    );

    // Navigation links
    expect(screen.getByRole("link", { name: /Men's/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /women's/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /jewelry/i })).toBeInTheDocument();

    // Category headings
    expect(
      screen.getByRole("heading", { name: /Men's Clothing/ }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /women's clothing/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /jewelry/i }),
    ).toBeInTheDocument();
  });
});

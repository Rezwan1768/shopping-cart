import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { Item } from "../../types";
import { ItemCategory } from "./ItemCategory";
import { MemoryRouter } from "react-router";

vi.mock("../../hooks/useCartContext");

let mockItems: Item[] = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  title: "Item",
  price: 10.99,
  description: "Item Description",
  category: "men's clothing",
  image: "fake.image.png",
  rating: { rate: 4.4, count: 122 },
}));

describe("ItemCategory", () => {
  test("renders the category heading and all item cards when items are provided", () => {
    render(
      <MemoryRouter>
        <ItemCategory heading="Jewelry" items={mockItems} id="section-id" />,
      </MemoryRouter>,
    );

    // Check section element has correct id
    const section = screen.getByTestId("item-section");
    expect(section).toHaveAttribute("id", "section-id");

    expect(
      screen.getByRole("heading", { name: /jewelry/i }),
    ).toBeInTheDocument();

    // Item names are a rendered in a h3 element.
    const itemHeadings = screen.queryAllByRole("heading", { level: 3 });
    expect(itemHeadings).toHaveLength(5);
  });

  test("renders 'No items available' message when items array is empty", () => {
    mockItems = [];
    render(
      <ItemCategory heading="Jewelry" items={mockItems} id="section-id" />,
    );

    const itemHeadings = screen.queryAllByRole("heading", { level: 3 });
    expect(itemHeadings).toHaveLength(0);
    expect(screen.getByText(/no items available/i)).toBeInTheDocument();
  });
});

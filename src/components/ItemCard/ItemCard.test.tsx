import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ItemCard } from "./ItemCard";
import type { Item } from "../../types";

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

describe("ItemCard rendering", () => {
  test("should render item data correctly", () => {
    render(<ItemCard item={mockItem} />);

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
    render(<ItemCard item={mockItem} />);
    expect(screen.getAllByAltText("star").length).toBeGreaterThan(0);
  });
});

describe("ItemCard cart interaction", () => {
  function setup(jsx: React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }

  test("shows Add to Cart button when item is not in the cart", () => {
    render(<ItemCard item={mockItem} />);
    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeInTheDocument();
  });

  test("shows quantity input when item is in the cart", async () => {
    const { user } = setup(<ItemCard item={mockItem} />);

    const addToCartButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });
    await user.click(addToCartButton);
    expect(
      screen.getByRole("spinbutton", { name: /amount/i }),
    ).toBeInTheDocument();
  });

  test("clamps quantity input to min and max limits", async () => {
    const { user } = setup(<ItemCard item={mockItem} />);

    const addToCartButton = await screen.findByRole("button", {
      name: /add to cart/i,
    });
    await user.click(addToCartButton);

    const spinButton = screen.getByRole("spinbutton", { name: /amount/i });
    await user.type(spinButton, "20"); // 10 is the limit
    expect(spinButton).toHaveValue(10);

    await user.clear(spinButton);
    await user.type(spinButton, "-10"); // amount can't be negative
    expect(spinButton).toHaveValue(0);
  });
});

import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ItemCard } from "../components/ItemCard";

const mockData = {
  title: "Cotton Jacket",
  price: "10.99",
  description: "Jacket for all occasions.",
  image: "fake.image.png",
  rating: {
    rate: 4.4,
    count: 122,
  },
}

// mock the fetch function
vi.stubGlobal("fetch", vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData)
  })
))

describe("ItemCard rendering", () => {
  test("should render fetched item data correctly", async () => {
    render(<ItemCard />);

    const heading = await screen.findByRole("heading", {
      name: /cotton jacket/i,
    });
    const description = await screen.findByText(/jacket for all occasions\./i);
    const price = await screen.findByText(/\$10\.99/);
    const altText = await screen.findByAltText(/cotton jacket/i);

    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(altText).toBeInTheDocument();
  });

  test("should display the correct number of stars", async () => {
    render(<ItemCard />);

    const stars = await screen.findAllByAltText("star");
    const halfStars = await screen.findAllByAltText(/semi-star/i);

    expect(stars.length).toBe(4);
    expect(halfStars.length).toBe(1);
  })
})

describe("ItemCard cart interaction", () => {
  function setup(jsx:  React.ReactElement) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    }
  }

  test("shows Add to Cart button when item is not in the cart", async () => {
    render(<ItemCard />);
    const addToCartButton = await screen.findByRole("button", { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();
  });

  test("shows quantity input when item is in the cart", async () => {
    const {user} = setup(<ItemCard/>)

    const addToCartButton = await screen.findByRole("button", { name: /add to cart/i });
    await user.click(addToCartButton);
    expect(screen.getByRole("spinbutton", { name: /amount/i })).toBeInTheDocument();
  });

  test("clamps quantity input to min and max limits", async () => {
    const {user} = setup(<ItemCard/>)

    const addToCartButton = await screen.findByRole("button", { name: /add to cart/i });
    await user.click(addToCartButton);

    const spinButton = screen.getByRole("spinbutton", { name: /amount/i });
    await user.type(spinButton, "20"); // 10 is the limit
    expect(spinButton).toHaveValue(10);

    await user.clear(spinButton);
    await user.type(spinButton, "-10"); // amount can't be negative
    expect(spinButton).toHaveValue(0);
  })

});
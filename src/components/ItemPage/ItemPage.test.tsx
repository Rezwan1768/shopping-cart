import { describe, test, expect, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import { useCartContext } from "../../hooks/useCartContext";
import { ItemPage } from "./ItemPage";
import { MemoryRouter, Route, Routes } from "react-router";

vi.mock("../../hooks/useCartContext");

describe("loading and error state", () => {
  test("show loading when allItems is null", () => {
    // Mock loading component
    vi.mock("../Loading/Loading", () => ({
      Loading: () => <div>Loading...</div>,
    }));

    (useCartContext as Mock).mockRejectedValueOnce({ allItems: null });

    render(<ItemPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("shows error when item is not found", () => {
    // Mock ErrorPage component
    vi.mock("../ErrorPage/ErrorPage", () => ({
      ErrorPage: () => <div>Error: Item not found</div>,
    }));

    (useCartContext as Mock).mockReturnValue({
      allItems: {
        mensClothing: [],
        womensClothing: [],
        jewelry: [],
      },
      removeItem: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/item/99"]}>
        <Routes>
          <Route path="/item/:itemId" element={<ItemPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/error: item not found/i)).toBeInTheDocument();
  });
});

describe("item content", () => {
  vi.mock("../CartAdd/CartAdd", () => ({
    CartAdd: () => <button>Add to Cart</button>,
  }));

  test("renders item details", () => {
    const mockItem = {
      id: 42,
      title: "Cool Jacket",
      image: "/jacket.jpg",
      price: 59.99,
      description: "A stylish winter jacket.",
      rating: {
        rate: 4.6,
        count: 87,
      },
    };

    (useCartContext as Mock).mockReturnValue({
      allItems: {
        mensClothing: [mockItem],
      },
      removeItem: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/item/42"]}>
        <Routes>
          <Route path="/item/:itemId" element={<ItemPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /cool jacket/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/a stylish winter jacket/i)).toBeInTheDocument();
    expect(screen.getByAltText(/cool jacket/i)).toBeInTheDocument();
    expect(screen.getByText("$59.99")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /remove/i })).toBeInTheDocument();
  });
});

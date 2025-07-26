import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Items } from "../components/Items";
import { useItemsByCategory } from "../hooks/useItemsByCategory";

vi.mock("../hooks/useItemsByCategory");
// Casts the imported function to a mocked version so TypeScript recognizes mock methods
const mockedUseItemsByCategory = vi.mocked(useItemsByCategory);

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

beforeEach(() => {
  vi.clearAllMocks();
});

describe("Items Component", () => {
  test("renders loading state", () => {
    mockedUseItemsByCategory.mockReturnValue({
      loading: true,
      error: null,
      allItems: null,
    });

    render(<Items />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders error state with retry button", () => {
    mockedUseItemsByCategory.mockReturnValue({
      loading: false,
      error: "Failed to fetch",
      allItems: null,
    });

    render(<Items />);
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
  });

  test("clicking retry shows loading state", async () => {
    mockedUseItemsByCategory
      .mockReturnValueOnce({ loading: false, error: "Failed to fetch", allItems: null }) // initial
      .mockReturnValueOnce({ loading: true, error: null, allItems: null }); // after retry

    const user = userEvent.setup();
    render(<Items />);

    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders categories when data is available", () => {
    mockedUseItemsByCategory.mockReturnValue({
      loading: false,
      error: null,
      allItems: {
        mensClothing: [mockItem({ id: 1, title: "Shirt" })],
        womensClothing: [mockItem({ id: 2, title: "Dress", category: "women's clothing" })],
        jewelry: [mockItem({ id: 3, title: "Necklace", category: "jewelry" })],
      },
    });

    render(<Items />);

    // Navigation links
    expect(screen.getByRole("link", { name: /Men's/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /women's/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /jewelry/i })).toBeInTheDocument();

    // Category headings
    expect(screen.getByRole("heading", { name: /Men's Clothing/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /women's clothing/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /jewelry/i })).toBeInTheDocument();
  });
});

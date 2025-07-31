import { describe, test, expect, vi, type Mock } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { useItemsByCategory } from "../../hooks/useItemsByCategory";
import App from "./App";

vi.mock("../../hooks/useItemsByCategory");
// Casts the imported function to a mocked version so TypeScript recognizes mock methods
const mockedUseItemsByCategory = vi.mocked(useItemsByCategory);

describe("App loading and error", () => {
  test("loading", () => {
    mockedUseItemsByCategory.mockReturnValueOnce({
      loading: true,
      error: null,
      allItems: null,
    });

    render(<App />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  test("renders error state with retry button", () => {
    mockedUseItemsByCategory.mockReturnValueOnce({
      loading: false,
      error: "Failed to fetch",
      allItems: null,
    });

    render(<App />);
    expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });

  test("clicking retry shows loading state", async () => {
    // initial
    mockedUseItemsByCategory
      .mockReturnValueOnce({
        loading: false,
        error: "Failed to fetch",
        allItems: null,
      })
      .mockReturnValueOnce({ loading: true, error: null, allItems: null }); // after retry

    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});

describe("App content render", () => {
  test("renders Header and routed content when data is loaded", () => {
    (useItemsByCategory as Mock).mockReturnValue({
      loading: false,
      error: null,
      allItems: [
        { id: 1, title: "Item 1", price: 10, image: "", category: "A" },
      ],
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<App />}>
            <Route index element={<div>Home Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("heading", { name: /FashionHub/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Home Page")).toBeInTheDocument();
    // assuming <Header /> uses <header role="banner">
  });
});

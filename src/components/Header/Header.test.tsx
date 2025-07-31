import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Header } from "./Header";

describe("Header component", () => {
  test("shows correct content", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /FashionHub/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });

  test("clicking the link (button) navigates and updates text", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /cart/i });
    expect(link).toHaveAttribute("href", "/cart");

    await user.click(link); // Goes to the cart page
    // Cart page links back to the shop page
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();

    // Clicking again will take back to the shop page
    await user.click(link);
    expect(link).toHaveAttribute("href", "/cart");
  });

  test("clicking the H1 tag navigates to shop (home) page", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /cart/i });
    await user.click(link); // In cart page
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();

    // Back to home page
    await user.click(screen.getByRole("heading", { name: /FashionHub/i }));
    expect(link).toHaveAttribute("href", "/cart");
  });
});

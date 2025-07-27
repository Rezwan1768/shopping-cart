import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "../components/Header";
import { MemoryRouter } from "react-router";

describe("Header component", () => {
  test("shows correct content", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByRole("heading", { name: /FashionHub/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
  });

  test("clicking the link navigates and updates text", async () => {
    const user = userEvent.setup();
  
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );
  
    const link = screen.getByRole("link", { name: /cart/i });
    expect(link).toHaveAttribute("href", "/cart");
  
    await user.click(link);
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
  });
});
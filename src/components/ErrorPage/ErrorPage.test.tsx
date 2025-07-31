import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { ErrorPage } from "./ErrorPage";
import userEvent from "@testing-library/user-event";

test("renders ErrorPage for unknown route via wildcard route", () => {
  render(
    <MemoryRouter initialEntries={["/unknown"]}>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: /go back to home/i }),
  ).toHaveAttribute("href", "/");
});

test("clicking the link takes the user back to shop page", async () => {
  const user = userEvent.setup();

  // Start in /unknown (invalid) page
  render(
    <MemoryRouter initialEntries={["/unknown"]}>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<h1>Mock Home</h1>} />
      </Routes>
    </MemoryRouter>,
  );

  const homeLink = screen.getByRole("link", { name: /go back to home/i });
  await user.click(homeLink);

  expect(
    screen.getByRole("heading", { name: /Mock Home/i }),
  ).toBeInTheDocument();
});

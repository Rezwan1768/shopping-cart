import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import { ErrorPage } from "./ErrorPage";

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

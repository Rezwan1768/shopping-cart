import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

test("renders loading state", () => {
  render(<Loading />);
  expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
});

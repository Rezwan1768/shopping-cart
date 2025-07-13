import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../components/App";


describe("App component", () => {
  test("renders correct heading", () => {
    render(<App/>);
    expect(screen.getByRole("heading").textContent).toMatch(/hello world/i);
  })
})
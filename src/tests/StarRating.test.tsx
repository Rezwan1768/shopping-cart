import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StarRating } from "../components/StarRating";


describe("StarRating rendering", () => {
  test("renders 4 full stars and 0 half stars for rating 4.2", () => {
    const mockRating = 4.2;
    const mockReviewCount = 125;

    render(<StarRating rating={mockRating} reviewCount={mockReviewCount}/>);

    const stars = screen.queryAllByAltText("star");
    const halfStars = screen.queryAllByAltText(/semi-star/i);

    expect(stars.length).toBe(4);
    expect(halfStars.length).toBe(0);
    expect(screen.getByText(/\(125\)/)).toBeInTheDocument();
  });

  test("renders 4 full stars and 1 half star for rating 4.4", () => {
    const mockRating = 4.4;    // Half star if > 0.3 and <= 0.7
    const mockReviewCount = 125;

    render(<StarRating rating={mockRating} reviewCount={mockReviewCount}/>);

    const stars = screen.queryAllByAltText("star");
    const halfStars = screen.queryAllByAltText(/semi-star/i);

    expect(stars.length).toBe(4);
    expect(halfStars.length).toBe(1);
  });

  test("renders 5 full stars and 0 half stars for rating 4.7", () => {
    const mockRating = 4.7;    // Round up to a full star if > 0.7
    const mockReviewCount = 125;

    render(<StarRating rating={mockRating} reviewCount={mockReviewCount}/>);

    const stars = screen.queryAllByAltText("star");
    const halfStars = screen.queryAllByAltText(/semi-star/i);

    expect(stars.length).toBe(5);
    expect(halfStars.length).toBe(0);
  });
})
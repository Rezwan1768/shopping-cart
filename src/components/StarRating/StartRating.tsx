import fullStar from "../../assets/full-star.svg";
import halfStar from "../../assets/half-star.svg";
import styles from "./StarRating.module.css";

// Renders visual star rating based on numeric `rating` value.
// Displays full stars, optionally one half star, and the review count.
type StarRatingProps = {
  rating: number;
  reviewCount: number;
};

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const stars = [];
  let fullStars = Math.floor(rating);
  const remaining = rating - fullStars;
  let hasHalfStar = false;

  /**
   * Round rating:
   * - Add full star if remainder > 0.7
   * - Add half star if remainder is between 0.3 and 0.7
   */

  if (remaining > 0.7) {
    fullStars += 1;
  } else if (remaining > 0.3) {
    hasHalfStar = true;
  }

  for (let i = 0; i < fullStars; ++i) {
    stars.push(
      <img
        key={`full-${i}`}
        src={fullStar}
        alt="star"
        width="30"
        height="30"
      />,
    );
  }

  if (hasHalfStar) {
    stars.push(
      <img key="half" src={halfStar} alt="semi-star" width="30" height="30" />,
    );
  }

  return (
    <div className={styles.ratingContainer} title={`${rating}`}>
      {
        // JSX can render arrays directly; `stars` holds the star icons based on rating
        stars
      }
      <span>({reviewCount})</span>
    </div>
  );
}

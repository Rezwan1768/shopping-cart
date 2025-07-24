import fullStar from "../assets/full-star.svg";
import halfStar from "../assets/half-star.svg";
import styles from "../styles/StarRating.module.css";

// Returns an array of <img> JSX elements representing star ratings.
// JSX allows arrays of elements to be rendered directly inside components,
// so this function can be used like: {showStars(rate)}
type StarRatingProps = {
  rating: number;
  reviewCount: number;
}

export function StarRating({ rating, reviewCount }: StarRatingProps) {
  const stars = [];
  let fullStars = Math.floor(rating);
  const remaining = rating - fullStars;
  let hasHalfStar = false;

  if (remaining > 0.7) {
    fullStars += 1; // Round up if the rating is closer to the next whole number
  } else if (remaining > 0.3) {
    hasHalfStar = true; // Show a half star for values around x.5
  }

  for (let i = 0; i < fullStars; ++i) {
    stars.push(
      <img key={`full-${i}`} src={fullStar} alt="star" width="30" height="30" />
    )
  }

  if (hasHalfStar) {
    stars.push(<img key="half" src={halfStar} alt="semi-star" width="30" height="30" />)
  }

  return (
    <div className={styles.ratingContainer} title={`${rating}`}>
        {stars}
        <span>({reviewCount})</span>
    </div>);
}
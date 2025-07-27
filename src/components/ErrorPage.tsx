import { Link } from "react-router";

export function ErrorPage() {
  return (
    <div className="center">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}
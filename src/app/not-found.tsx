import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page" id="main-content" tabIndex={-1}>
      <p className="kicker">404 / Not found</p>
      <h1>This proof is not in the set.</h1>
      <p>
        The route may have changed, or the project is not part of the public
        portfolio.
      </p>
      <Link className="button-link" href="/#work">
        Return to selected work <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}

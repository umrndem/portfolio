"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="status-page" id="main-content" tabIndex={-1}>
      <p className="kicker">Something failed</p>
      <h1>The page could not be assembled.</h1>
      <p>No work or private data was changed. You can safely try again.</p>
      <button className="button-link" type="button" onClick={reset}>
        Try again <span aria-hidden="true">↗</span>
      </button>
    </main>
  );
}

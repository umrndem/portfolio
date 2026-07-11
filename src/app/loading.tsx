export default function Loading() {
  return (
    <main
      className="status-page"
      id="main-content"
      tabIndex={-1}
      aria-live="polite"
    >
      <p className="kicker">Loading…</p>
      <h1>Preparing the working proof…</h1>
    </main>
  );
}

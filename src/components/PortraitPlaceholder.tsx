export function PortraitPlaceholder() {
  return (
    <figure className="portrait-placeholder">
      <div className="portrait-placeholder__field" aria-hidden="true">
        <span>UN</span>
        <i />
        <b />
      </div>
      <figcaption>
        <span>Portrait in review</span>
        Approved photograph needed before launch.
      </figcaption>
    </figure>
  );
}

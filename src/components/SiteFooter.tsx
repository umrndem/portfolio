import { profile } from "@/content/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__lead">
        <p className="kicker">Contact / 05</p>
        <h2>
          Have a difficult problem
          <br />
          worth structuring?
        </h2>
      </div>
      <div className="site-footer__actions">
        <a className="button-link button-link--light" href={`mailto:${profile.email}`}>
          Write to Umar <span aria-hidden="true">↗</span>
        </a>
        <p>
          I’m looking for opportunities with meaningful technical exposure across
          software, data systems, and applied AI.
        </p>
      </div>
      <div className="site-footer__base">
        <p>
          {profile.name}
          <br />
          {profile.location}
        </p>
        <nav aria-label="Social links">
          <a href={profile.github}>GitHub</a>
          <a href={profile.linkedin}>LinkedIn</a>
          <a href={profile.instagram}>Instagram</a>
        </nav>
        <p className="site-footer__note">
          Built with Next.js.
          <br />
          AI-assisted, human-directed.
        </p>
      </div>
    </footer>
  );
}

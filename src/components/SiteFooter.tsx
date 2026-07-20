import { homeContent } from "@/content/home";
import { profile, socialLinks } from "@/content/profile";
import { siteSettings } from "@/content/site-settings";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__lead">
        <p className="kicker">{homeContent.footer.kicker}</p>
        <h2>
          {homeContent.footer.headline[0]}
          <br />
          {homeContent.footer.headline[1]}
        </h2>
      </div>
      <div className="site-footer__actions">
        <a className="button-link button-link--light" href={`mailto:${profile.email}`}>
          {homeContent.footer.action} <span aria-hidden="true">↗</span>
        </a>
        <p>{homeContent.footer.availability}</p>
      </div>
      <div className="site-footer__base">
        <p>
          {profile.name}
          <br />
          {profile.location}
        </p>
        <nav aria-label="Social links">
          {socialLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
          {profile.resumePath ? (
            <a href={profile.resumePath}>Résumé</a>
          ) : null}
        </nav>
        <p className="site-footer__note">
          {siteSettings.footerNote[0]}
          <br />
          {siteSettings.footerNote[1]}
        </p>
      </div>
    </footer>
  );
}

import { ContactForm } from "@/components/ContactForm";
import { ScrollTopLink } from "@/components/ScrollTopLink";
import { homeContent } from "@/content/home";
import { sectionIds } from "@/content/navigation";
import { profile, socialLinks } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="site-footer" id={sectionIds.contact}>
      <div className="site-footer__lead">
        <p className="kicker">{homeContent.footer.kicker}</p>
        <h2>
          {homeContent.footer.headline[0]}
          <br />
          {homeContent.footer.headline[1]}
        </h2>
        <p className="site-footer__availability">
          {homeContent.footer.availability}
        </p>
      </div>

      <div className="site-footer__form">
        <ContactForm />
      </div>

      <div className="site-footer__base">
        <p>
          {profile.name}
          <br />
          {profile.location}
        </p>
        <nav aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ))}
          {profile.resumePath ? (
            <a href={profile.resumePath}>Résumé</a>
          ) : null}
        </nav>
        <p className="site-footer__note">
          <ScrollTopLink href="/acknowledgements">Acknowledgements</ScrollTopLink>
        </p>
      </div>
    </footer>
  );
}

import type { Profile, SocialLink } from "@/content/types";

type PersonStructuredDataInput = {
  profile: Profile;
  socialLinks: readonly SocialLink[];
  siteUrl: URL;
  description: string;
};

export function buildPersonStructuredData({
  profile,
  socialLinks,
  siteUrl,
  description,
}: PersonStructuredDataInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl.toString(),
    description,
    homeLocation: {
      "@type": "City",
      name: profile.location,
    },
    sameAs: socialLinks.map((link) => link.href),
  };
}

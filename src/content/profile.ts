import type { Profile, SocialLink } from "./types";

export const profile = {
  name: "Muhammad Umar Nadeem",
  shortName: "Umar",
  location: "Islamabad, Pakistan",
  email: "umrndem@gmail.com",
  degree: "BS Data Science · FAST NUCES, Islamabad",
  graduation: "Expected June 2028",
  cgpa: "3.42 / 4.00",
  // Add approved public assets only. See docs/assets-guide.md before setting these.
  portrait: {
    src: "/images/profile/umr-picture.jpg",
    alt: "Muhammad Umar Nadeem seated on a rock at night above the Islamabad city lights",
    width: 1712,
    height: 2140,
  },
  resumePath: undefined,
} satisfies Profile;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/umrndem" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/umrndem/" },
  { label: "Instagram", href: "https://www.instagram.com/umrndem/" },
] satisfies readonly SocialLink[];

import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { themeBootstrapScript } from "@/systems/theme";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Muhammad Umar Nadeem — Software & Data Systems",
    template: "%s — Muhammad Umar Nadeem",
  },
  description:
    "Data Science student and software builder working across C++, data, databases, product systems, and agentic AI.",
  authors: [{ name: "Muhammad Umar Nadeem" }],
  creator: "Muhammad Umar Nadeem",
  openGraph: {
    title: "Muhammad Umar Nadeem — Software & Data Systems",
    description:
      "Selected work across C++, data, databases, product systems, and agentic AI.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Umar Nadeem — Software & Data Systems",
    description:
      "Selected work across C++, data, databases, product systems, and agentic AI.",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f0ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0d0e" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}

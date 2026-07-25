import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import {
  getSiteUrl,
  siteSettings,
} from "@/content/site-settings";
import { themeBootstrapScript } from "@/systems/theme";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: siteSettings.title,
    template: siteSettings.titleTemplate,
  },
  description: siteSettings.description,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: siteSettings.title,
    description: siteSettings.socialDescription,
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.title,
    description: siteSettings.socialDescription,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f3" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
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
      className={`${manrope.variable} ${jetbrainsMono.variable}`}
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

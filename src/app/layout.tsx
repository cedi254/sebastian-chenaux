import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://sebastian-chenaux-training.mighty-lemur-1082.chatgpt.site",
  ),
  title: "Sebastian Chenaux | Personal Trainer Zürich",
  description:
    "Dein Training. Dein Fortschritt. Persönliches Coaching mit Sebastian Chenaux: Kraft, Ausdauer und Functional Training bei MCS Training in Zürich.",
  openGraph: {
    title: "Sebastian Chenaux | Dein nächstes Level",
    description:
      "Persönliches Training. Athletischer Hintergrund. Ein Plan, der zu dir passt.",
    locale: "de_CH",
    type: "website",
    ...(siteConfig.social.image ? { images: [siteConfig.social.image] } : {}),
  },
  icons: { icon: "/images/monogram.webp" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-CH">
      <head>
        <link
          rel="preload"
          href="/fonts/barlow-condensed-latin-700-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Zum Inhalt
        </a>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DJ Malith — Official Website | World Class DJ",
  description: "DJ Malith is a world-class DJ and music producer delivering electrifying performances, premium mixes, and unforgettable nightlife experiences. Book DJ Malith for your event today.",
  keywords: ["DJ Malith", "DJ", "Electronic Music", "Sri Lanka", "Nightclub", "Music Producer", "Events"],
  openGraph: {
    title: "DJ Malith — Official Website",
    description: "World-Class DJ | Music Producer | Live Performances",
    type: "website",
  },
};

export const viewport = {
  themeColor: '#c9a84c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}

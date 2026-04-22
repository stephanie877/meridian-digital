import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meridian Digital — AI-Powered Business Hubs",
  description: "We rebuild outdated websites into AI-integrated business hubs that capture leads, book appointments, and grow revenue — automatically.",
  keywords: "AI website, business hub, lead capture, automated scheduling, HVAC website, law firm website, dental website",
  openGraph: {
    title: "Meridian Digital — AI-Powered Business Hubs",
    description: "Modern AI-integrated websites that work while you sleep.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

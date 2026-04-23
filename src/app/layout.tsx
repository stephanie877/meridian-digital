import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meridian Digital — AI-Powered Business Hubs for Service Companies",
  description: "We rebuild outdated service business websites into AI-powered hubs that capture leads, book appointments, and grow revenue — automatically, 24/7. 14-day delivery.",
  keywords: "AI website design, restoration company website, electrician website, contractor website, business hub, lead capture, automated scheduling",
  openGraph: {
    title: "Meridian Digital — AI-Powered Business Hubs",
    description: "Stop losing emergency jobs to a slow website. We rebuild service business sites with AI in 14 days.",
    type: "website",
    url: "https://meridiandigital.agency",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian Digital",
    description: "AI-powered business hubs for service companies. 14-day delivery.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

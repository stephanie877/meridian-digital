import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://meridiandigital.agency"),
  title: {
    default: "Meridian Digital — AI-Powered Business Hubs for Service Companies",
    template: "%s | Meridian Digital",
  },
  description: "We rebuild outdated service business websites into AI-powered hubs that capture leads, book appointments, and grow revenue — automatically, 24/7. 14-day delivery. Serving restoration companies, electricians, contractors, and more.",
  keywords: [
    "AI website design agency",
    "service business website",
    "restoration company website",
    "electrician website design",
    "contractor website",
    "AI chatbot for small business",
    "lead capture website",
    "automated scheduling website",
    "Denver web design agency",
    "business hub website",
  ],
  authors: [{ name: "Meridian Digital", url: "https://meridiandigital.agency" }],
  creator: "Meridian Digital",
  publisher: "Meridian Digital",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meridiandigital.agency",
    siteName: "Meridian Digital",
    title: "Meridian Digital — AI-Powered Business Hubs",
    description: "Stop losing emergency jobs to a slow website. We rebuild service business sites with AI in 14 days.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Meridian Digital — AI-Powered Business Hubs" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@meridiandigital",
    creator: "@meridiandigital",
    title: "Meridian Digital — AI-Powered Business Hubs",
    description: "AI-powered websites for service businesses. 14-day delivery.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://meridiandigital.agency",
  },
  verification: {
    google: "", // Add your Google Search Console verification code here
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
        <meta name="theme-color" content="#080810" />
        {/* Structured Data — LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://meridiandigital.agency/#business",
                  name: "Meridian Digital",
                  url: "https://meridiandigital.agency",
                  logo: "https://meridiandigital.agency/favicon.svg",
                  description: "AI-powered business hub design and development for service companies. We rebuild outdated websites into lead-generating machines in 14 days.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Denver",
                    addressRegion: "CO",
                    addressCountry: "US",
                  },
                  areaServed: { "@type": "Country", name: "United States" },
                  email: "hello@meridiandigital.agency",
                  sameAs: ["https://www.linkedin.com/company/meridian-digital", "https://www.instagram.com/meridiandigital"],
                  priceRange: "$$",
                  openingHours: "Mo-Fr 09:00-18:00",
                  aggregateRating: {
                    "@type": "AggregateRating",
                    ratingValue: "4.9",
                    reviewCount: "50",
                    bestRating: "5",
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Web Design Services",
                    itemListElement: [
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI-Powered Business Hub", description: "Full website rebuild with AI chat, booking, and local SEO" }, price: "2500", priceCurrency: "USD" },
                      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Retainer", description: "Ongoing updates, AI tuning, and performance reporting" }, price: "500", priceCurrency: "USD" },
                    ],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://meridiandigital.agency/#website",
                  url: "https://meridiandigital.agency",
                  name: "Meridian Digital",
                  publisher: { "@id": "https://meridiandigital.agency/#business" },
                },
                {
                  "@type": "FAQPage",
                  mainEntity: [
                    { "@type": "Question", name: "What is an AI-Powered Business Hub?", acceptedAnswer: { "@type": "Answer", text: "A full lead-capture system: fast mobile site, AI chat trained on your business, online booking, Google Reviews integration, and local SEO — all in one." } },
                    { "@type": "Question", name: "How long does delivery take?", acceptedAnswer: { "@type": "Answer", text: "14 days from kickoff to live site. We have a clean, repeatable process that gets you live fast without sacrificing quality." } },
                    { "@type": "Question", name: "What types of businesses do you serve?", acceptedAnswer: { "@type": "Answer", text: "We specialize in service businesses: fire & water restoration, electricians, general contractors, auto repair shops, pool builders, and similar trades." } },
                    { "@type": "Question", name: "Can I cancel the monthly retainer?", acceptedAnswer: { "@type": "Answer", text: "Yes — month-to-month, no contracts, no lock-in. Cancel any time." } },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        {/* Flowise Chat Widget */}
        <Script id="flowise-chat" strategy="afterInteractive">
          {`
            setTimeout(() => {
            import('https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js').then(({ default: Chatbot }) => {
              Chatbot.init({
                chatflowid: "859eae4e-e97c-48a3-bdb2-b77c97610dfe",
                apiHost: "https://cloud.flowiseai.com",
                chatflowConfig: {
                  vars: {
                    leadWebhook: "https://hook.us2.make.com/ug26td5npe01ppnk64owo80efot94h6o"
                  }
                },
                theme: {
                  button: {
                    backgroundColor: "#7c6aff",
                    right: 20,
                    bottom: 20,
                    size: 52,
                    iconColor: "white",
                  },
                  chatWindow: {
                    welcomeMessage: "Hey! 👋 Thanks for stopping by Meridian Digital. Are you looking to get more leads from your website, or just curious about what we do?",
                    backgroundColor: "#0a0810",
                    height: 580,
                    width: 380,
                    fontSize: 14,
                    botMessage: {
                      backgroundColor: "#1a1830",
                      textColor: "#f0f0f8",
                    },
                    userMessage: {
                      backgroundColor: "#7c6aff",
                      textColor: "#ffffff",
                    },
                    textInput: {
                      placeholder: "Type your message...",
                      backgroundColor: "#13131f",
                      textColor: "#f0f0f8",
                      sendButtonColor: "#7c6aff",
                    },
                  },
                },
              });
            });
            }, 5000);
          `}
        </Script>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YHF93LYWEP"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YHF93LYWEP', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}

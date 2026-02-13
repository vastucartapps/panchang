import type { Metadata } from "next";
import Script from "next/script";
import { merriweather, inter } from "@/lib/fonts";
import { WebVitalsReporter } from "@/components/web-vitals";
import "./globals.css";

const GA_ID = "G-JTDVTTMPVE";

export const metadata: Metadata = {
  title: {
    default: "Panchang Today | Accurate Vedic Calendar | VastuCart",
    template: "%s | VastuCart Panchang",
  },
  description:
    "Accurate daily Panchang with Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Choghadiya timings for 200+ Indian cities. Free Vedic calendar by VastuCart.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://panchang.vastucart.in"
  ),
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    siteName: "VastuCart Panchang",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/vastucart-favicon.png",
    apple: "/images/icon-192.png",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Panchang",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#013f47" />
        <link rel="preconnect" href="https://api.vastucart.in" />
        <link rel="dns-prefetch" href="https://api.vastucart.in" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <Script id="sw-register" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js').catch(() => {});
            }
          `}
        </Script>
      </head>
      <body
        className={`${merriweather.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <WebVitalsReporter />
      </body>
    </html>
  );
}

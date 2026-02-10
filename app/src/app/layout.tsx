import type { Metadata } from "next";
import Script from "next/script";
import { merriweather, inter } from "@/lib/fonts";
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
    apple: "/images/vastucart-favicon.png",
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
      </head>
      <body
        className={`${merriweather.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

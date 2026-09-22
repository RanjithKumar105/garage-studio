import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shree Durga Car Care Clinic | Professional Car Service & Repair",
  description:
    "Shree Durga Car Care Clinic offers professional car service, repair, maintenance, detailing, and diagnostics. Trusted automotive care by Sathish Karkera.",
  keywords: [
    "car service",
    "car repair",
    "car care clinic",
    "automotive service",
    "car maintenance",
    "car detailing",
    "car diagnostics",
    "Shree Durga Car Care",
    "Sathish Karkera",
  ],
  openGraph: {
    title: "Shree Durga Car Care Clinic | Professional Car Service & Repair",
    description:
      "Professional car care, service, repair, and maintenance. Trusted by car owners for quality and reliability.",
    type: "website",
    locale: "en_IN",
    siteName: "Shree Durga Car Care Clinic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shree Durga Car Care Clinic",
    description:
      "Professional car care, service, repair, and maintenance. Trusted by car owners.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingActions from "@/components/FloatingActions";
import { ToastProvider } from "@/components/ToastProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoRepair",
              name: "Shree Durga Car Care Clinic",
              telephone: "+91-974145938",
              description:
                "Professional car care, service, repair, maintenance, detailing, and diagnostics.",
              founder: {
                "@type": "Person",
                name: "Sathish Karkera",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "19:00",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors duration-500 ease-in-out">
        <ThemeProvider>
          <ToastProvider>
            {children}
            <FloatingActions />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

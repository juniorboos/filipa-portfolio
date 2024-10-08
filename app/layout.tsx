import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: {
    default: "Filipa Oliveira",
    template: "%s | Filipa Oliveira",
  },
  description: "Designer de Interiores",
  openGraph: {
    title: "Filipa Oliveira",
    description: "Designer de Interiores",
    url: "https://filipaoliveira.vercel.app",
    siteName: "Filipa Oliveira",
    images: [
      {
        url: "https://filipaoliveira.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "pt-PT",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : undefined
        }`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

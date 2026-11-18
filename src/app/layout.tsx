/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#FAF6F2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Sahi Travels — Ride along with Nila",
  description:
    "Ride along with Nila from Sahi Travels: taxis, flights, rail transfers, premium coaches, VIP cars, visas, holidays and events — arranged from one desk in Chennai since 2000.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

import { VehicleBookingProvider } from "@/context/VehicleBookingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=Cormorant+Garamond:ital,wght@1,400;1,500&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js'); setTimeout(function () { if (!window.__nilaReady) document.documentElement.classList.remove('js'); }, 4500);`,
          }}
        />
      </head>
      <body>
        <VehicleBookingProvider>{children}</VehicleBookingProvider>
      </body>
    </html>
  );
}

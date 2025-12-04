import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "./contexts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "USPS Shipping Label",
  description: "Generate USPS shipping labels for your packages",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProviders>
          <main className="flex min-h-screen w-full flex-col items-center justify-between bg-white dark:bg-black sm:items-start p-4 lg:p-0">
            <div className="w-full md:max-w-5xl lg:max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GKII Rehobot | Dashboard",
  description: "Church Management System for GKII Rehobot",
};

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { QueryProvider } from "@/components/providers/QueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="font-inter min-h-full flex flex-col">
        <QueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}

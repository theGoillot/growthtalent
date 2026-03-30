import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Growth.Talent — Growth Marketing Jobs Worldwide",
    template: "%s | Growth.Talent",
  },
  description:
    "Find the best growth marketing jobs in the USA, France, and Latin America. 3000+ curated positions from top startups and scale-ups.",
  metadataBase: new URL("https://www.growthtalent.org"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

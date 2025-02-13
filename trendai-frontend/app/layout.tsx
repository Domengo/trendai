import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "../providers";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TrendAI Dashboard",
  description: "Influencer campaign management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Analytics/>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
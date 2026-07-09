import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scrollytelling Portfolio",
  description: "A high-end scrollytelling personal portfolio website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased bg-[#121212] text-white selection:bg-white/30`}
    >
      <body className="min-h-full flex flex-col font-sans overflow-x-hidden w-full relative">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

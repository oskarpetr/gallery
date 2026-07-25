import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Lenis } from "lenis/react";
import MotionProvider from "@/components/MotionProvider";

const neueMontreal = localFont({
  src: [
    {
      path: "./fonts/PPNeueMontreal-Medium.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPNeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oskar's Gallery",
  description: "Welcome to my fields of creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${neueMontreal.variable} h-full antialiased`}>
      <body className={neueMontreal.variable}>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

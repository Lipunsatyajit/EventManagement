import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { PageLoader } from "./_components/page-loader";
import { ScrollToTopButton } from "./_components/scroll-to-top";

export const metadata: Metadata = {
  title: "Utkal Events",
  description:
    "Odisha event planner marketplace for discovering planners, reviewing portfolios, and requesting consultations.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}><PageLoader /></Suspense>
        {children}
        <ScrollToTopButton />
      </body>
    </html>
  );
}

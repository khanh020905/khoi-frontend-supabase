import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FluentFlow — Speak English with Confidence",
  description:
    "Personalized English lessons, speaking practice, vocabulary review, and progress tracking for learners worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

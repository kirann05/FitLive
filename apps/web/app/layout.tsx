import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLive — Your daily compass",
  description: "A calmer way to connect training, recovery, nutrition, and your next sensible action.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

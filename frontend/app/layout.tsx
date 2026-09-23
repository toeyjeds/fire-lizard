import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumen | AI Hackathon Demo",
  description: "A focused AI workspace for turning first thoughts into next steps.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

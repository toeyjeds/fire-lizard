import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "CDS Operations",
  description: "Cash Delivery Service operations dashboard"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
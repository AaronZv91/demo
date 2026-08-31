import type { Metadata, Viewport } from "next";
import { Outfit, Syne } from "next/font/google";
import { DesignSwitcher } from "../components/DesignSwitcher";
import { FloatingSocials } from "../components/FloatingSocials";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Woodlands Group | Transport, Travel & Beyond",
  description:
    "Woodlands Transport Group — Singapore’s diversified group spanning transport, travel, engineering, hospitality, CashBox, Plotigo, and Flash Laundry.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <DesignSwitcher />
        {children}
        <FloatingSocials />
      </body>
    </html>
  );
}

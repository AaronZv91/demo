import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-d03-serif",
});

export default function Design03Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${fraunces.variable} d03`}>{children}</div>;
}

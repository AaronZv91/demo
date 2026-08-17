import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-d02-serif",
});

export default function Design02Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${fraunces.variable} d02`}>{children}</div>;
}

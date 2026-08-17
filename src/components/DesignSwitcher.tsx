"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DESIGNS = [
  { href: "/", label: "Design01" },
  { href: "/design02", label: "Design02" },
  { href: "/design03", label: "Design03" },
];

export function DesignSwitcher() {
  const pathname = usePathname();
  const light = true;

  return (
    <div className="fixed inset-x-0 top-0 z-[200] flex justify-center pt-3">
      <nav
        aria-label="Design versions"
        className={`flex items-center rounded-full p-1 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl ${
          light
            ? "border border-black/10 bg-white/80"
            : "border border-white/20 bg-black/55"
        }`}
      >
        {DESIGNS.map((d) => {
          const active =
            d.href === "/"
              ? pathname === "/"
              : Boolean(pathname?.startsWith(d.href));
          return (
            <Link
              key={d.href}
              href={d.href}
              prefetch
              className={`rounded-full px-3 py-2 text-[10px] font-semibold tracking-[0.14em] uppercase transition sm:px-4 sm:text-xs ${
                active
                  ? light
                    ? "bg-black text-white"
                    : "bg-white text-black"
                  : light
                    ? "text-black/55 hover:bg-black/5 hover:text-black"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
              }`}
            >
              {d.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

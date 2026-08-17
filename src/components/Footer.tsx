import Image from "next/image";
import { CONTACT } from "../data/businesses";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-[#f5f5f7] py-10 text-[#1d1d1f] pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Image
          src="/brands/group.png"
          alt="Woodlands Group"
          width={180}
          height={64}
          className="h-10 w-auto object-contain transition duration-500 ease-out hover:scale-105"
        />
        <p className="text-sm text-[#6e6e73]">
          © {new Date().getFullYear()} Woodlands Group. All rights reserved.
        </p>
        <a
          href={`mailto:${CONTACT.email}`}
          className="text-sm font-medium text-[#1d1d1f] underline-offset-4 transition duration-300 hover:underline"
        >
          {CONTACT.email}
        </a>
      </div>
    </footer>
  );
}

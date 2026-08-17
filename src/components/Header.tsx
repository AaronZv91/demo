import Image from "next/image";

const links = [
  { href: "#journey", label: "Film" },
  { href: "#businesses", label: "Businesses" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky z-50 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl top-[var(--switcher-h)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <a href="#journey" className="d01-brand group flex items-center">
          <Image
            src="/brands/group.png"
            alt="Woodlands Group"
            width={200}
            height={70}
            priority
            className="h-8 w-auto object-contain transition duration-500 ease-out group-hover:scale-105 sm:h-10"
          />
        </a>
        <nav className="d01-nav hidden items-center gap-7 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#1d1d1f]/60 transition duration-500 hover:-translate-y-0.5 hover:text-[#1d1d1f]"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-[#1d1d1f] px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-none transition duration-500 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_10px_24px_rgba(0,0,0,0.16)] sm:text-sm"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

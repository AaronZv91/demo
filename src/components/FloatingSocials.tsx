import React from "react";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/WoodlandsTransport/",
    color: "#1877F2",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/woodlands.group?igsi=ZXVobDY5b3NzZDJ1",
    color: "#E1306C",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/woodlands-group-94b08341a?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    color: "#0A66C2",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@woodlands_group?_r=1&_t=ZS-99KTpeXnXNt",
    color: "#000000",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-4 h-4"
        aria-hidden="true"
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.4-.04 2.66-.94 3.08-2.28.18-.54.24-1.11.24-1.68V.02h-.01z" />
      </svg>
    ),
  },
];

export function FloatingSocials() {
  return (
    <aside
      aria-label="Social media channels"
      className="fixed bottom-6 left-5 sm:left-6 z-40 flex flex-col items-center gap-2.5"
    >
      <div className="flex flex-col items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md transition duration-300 hover:border-black/15 hover:shadow-[0_12px_36px_rgb(0,0,0,0.12)]">
        {SOCIAL_LINKS.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Woodlands Group on ${item.name}`}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition duration-300 hover:scale-110 hover:bg-zinc-900 hover:text-white"
          >
            {item.icon}
            {/* Tooltip on right */}
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
              {item.name}
            </span>
          </a>
        ))}
      </div>
      <div className="h-4 w-px bg-zinc-300" aria-hidden="true" />
    </aside>
  );
}

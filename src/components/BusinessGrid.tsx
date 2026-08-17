import Image from "next/image";
import { BUSINESSES } from "../data/businesses";

export function BusinessGrid() {
  const units = BUSINESSES.filter((b) => b.index > 0);

  return (
    <section id="businesses" className="bg-paper py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6e6e73]">
            Our businesses
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Seven ways we move.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Each unit has a clear role — from fleets and travel to engineering,
            hospitality, technology, and laundry.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((biz) => (
            <article
              key={biz.id}
              id={biz.id}
              className="group flex flex-col rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(0,0,0,0.1)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-sm font-semibold text-[#86868b]">
                  {String(biz.index).padStart(2, "0")}
                </span>
                <Image
                  src={biz.logo}
                  alt=""
                  width={120}
                  height={48}
                  className="h-10 w-auto max-w-[120px] object-contain transition duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-navy">
                {biz.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-[#6e6e73]">{biz.tagline}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {biz.summary}
              </p>
              <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                {biz.services.slice(0, 4).map((s) => (
                  <li key={s.title} className="text-xs leading-snug text-muted">
                    · {s.title}
                  </li>
                ))}
              </ul>
              {biz.href && (
                <a
                  href={biz.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex gap-1 text-sm font-semibold text-[#1d1d1f] transition duration-500 group-hover:gap-2"
                >
                  Visit site →
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

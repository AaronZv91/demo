import Image from "next/image";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-navy-deep text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(214,31,38,0.22),transparent_50%),radial-gradient(ellipse_at_90%_30%,rgba(126,184,216,0.18),transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid min-h-[88svh] max-w-6xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="animate-rise text-xs font-semibold uppercase tracking-[0.22em] text-dawn">
            Woodlands Transport Group
          </p>
          <h1 className="animate-rise-1 mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            One group.
            <br />
            Many ways forward.
          </h1>
          <p className="animate-rise-2 mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            From Singapore’s largest private transport fleet to travel,
            engineering, hospitality, pawnbroking, technology, and laundry —
            Woodlands Group connects people, cargo, and communities.
          </p>
          <div className="animate-rise-3 mt-10 flex flex-wrap gap-3">
            <a
              href="#journey"
              className="bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-red-bright"
            >
              Scroll the story
            </a>
            <a
              href="#businesses"
              className="border border-white/30 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/60"
            >
              Our businesses
            </a>
          </div>
        </div>

        <div className="animate-rise-2 border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          <Image
            src="/brands/group.png"
            alt="Woodlands Group"
            width={360}
            height={130}
            className="h-16 w-auto object-contain sm:h-20"
          />
          <dl className="mt-8 space-y-4">
            {[
              ["Founded", "1974"],
              ["Home", "Singapore"],
              ["Units", "7 operating businesses"],
              ["Focus", "Transport · Travel · Tech · More"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3"
              >
                <dt className="text-sm text-white/55">{k}</dt>
                <dd className="text-sm font-semibold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

import { ESG } from "../data/esg";
import { EsgFilm } from "./EsgFilm";

export function EsgSection() {
  return (
    <section id="esg" className="bg-[#f5f5f7] py-16 text-[#1d1d1f] sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6e6e73]">
          {ESG.kicker}
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {ESG.title}
        </h2>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#6e6e73]">{ESG.lead}</p>

        <div className="mt-10 overflow-hidden rounded-3xl bg-black shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
          <EsgFilm className="aspect-video w-full object-cover" />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="space-y-5 text-[15px] leading-relaxed text-[#6e6e73] sm:text-base">
            <p>{ESG.body}</p>
            <p>{ESG.involvement}</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {ESG.facts.map((item) => (
              <li
                key={item.t}
                className="rounded-2xl bg-white p-5 shadow-[0_0_0_1px_rgba(0,0,0,0.05)] transition duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.07)]"
              >
                <h3 className="font-display text-lg font-semibold">{item.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6e6e73]">{item.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

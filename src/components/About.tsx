export function About() {
  return (
    <section id="about" className="bg-white py-16 text-[#1d1d1f] sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6e6e73]">
            About the group
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Built in Singapore. Oriented toward tomorrow.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[#6e6e73]">
            Founded in 1974, Woodlands Transport grew into Singapore’s largest
            private transport operator — and expanded into a group that moves
            people, materials, travellers, data, and daily essentials. Hope for
            us is practical: safe journeys, dependable fleets, and businesses
            that keep communities running.
          </p>
        </div>
        <ul className="mt-14 grid gap-8 sm:grid-cols-3">
          {[
            {
              t: "Scale",
              d: "Hundreds of vehicles and people supporting Singapore’s transport ecosystem every day.",
            },
            {
              t: "Diversity",
              d: "Transport, travel, engineering, hospitality, pawnbroking, technology, and laundry.",
            },
            {
              t: "Stewardship",
              d: "From national events to upcycled bus hotels — growth with responsibility.",
            },
          ].map((item) => (
            <li
              key={item.t}
              className="rounded-2xl bg-[#f5f5f7] p-6 transition duration-500 ease-out hover:-translate-y-2 hover:bg-white hover:shadow-[0_18px_40px_rgba(0,0,0,0.07)]"
            >
              <h3 className="font-display text-xl font-semibold">{item.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6e6e73]">
                {item.d}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

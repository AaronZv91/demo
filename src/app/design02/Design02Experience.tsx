"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { companyData } from "../../data/companyData";
import { ESG } from "../../data/esg";
import { EsgFilm } from "../../components/EsgFilm";
import { CoreValuesSection } from "../../components/CoreValuesSection";
import "./design02.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function shortestDelta(deg: number) {
  const a = ((deg % 360) + 360) % 360;
  return a > 180 ? a - 360 : a;
}

export function Design02Experience() {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  const companies = useMemo(() => companyData, []);
  const group = companies[0];

  useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    const ticker = (time: number) => {
      lenis?.raf(time * 1000);
    };

    if (!reduced) {
      try {
        lenis = new Lenis({
          duration: 1.15,
          smoothWheel: true,
          autoRaf: false,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
        lenisRef.current = lenis;
      } catch {
        lenis = null;
      }
    }

    const count = companies.length;
    const step = 360 / count;
    const progressStep = 1 / count;
    let currentActive = 0;

    const layout = (rotation: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const phone = w < 640;
      const compact = w < 820 || h < 860;
      const radius = Math.max(
        phone ? 118 : 156,
        Math.min(
          w * (phone ? 0.32 : 0.27),
          h * (phone ? 0.24 : compact ? 0.28 : 0.3),
          268,
        ),
      );

      let best = 0;
      let bestScore = 999;
      for (let i = 0; i < count; i++) {
        const d = Math.abs(shortestDelta(i * step + rotation));
        if (d < bestScore) {
          bestScore = d;
          best = i;
        }
      }

      const orbitRadius = bestScore < 6 ? radius * 1.12 : radius;

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const angle = i * step + rotation;
        const rad = ((angle - 90) * Math.PI) / 180;
        const x = Math.cos(rad) * orbitRadius;
        const y = Math.sin(rad) * orbitRadius;
        const fromTop = Math.abs(shortestDelta(angle));
        const t = 1 - Math.min(fromTop / 78, 1);
        const focus = t * t;
        const isExpanded = i === best && bestScore < 6;

        if (isExpanded) {
          el.style.transform = "translate3d(0px, 0px, 0)";
          el.style.opacity = "1";
          el.style.filter = "none";
          el.style.zIndex = "120";
          el.style.visibility = "visible";
          el.style.pointerEvents = "auto";
          el.classList.add("is-expanded");
          el.classList.remove("is-front");
          return;
        }

        el.classList.remove("is-expanded");
        const scale = 0.68 + focus * 0.72;
        const opacity = 0.38 + focus * 0.58;
        const blur = focus > 0.12 ? 0 : 1.6 * (1 - focus);

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.filter = blur ? `blur(${blur}px)` : "none";
        el.style.zIndex = String(Math.round(10 + focus * 50));
        el.style.visibility = "visible";
        el.style.pointerEvents = "auto";
        el.classList.toggle("is-front", focus > 0.72);
      });

      if (best !== currentActive) {
        currentActive = best;
        setActive(best);
      }
    };

    layout(0);
    if (reduced) return undefined;

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "+=7200",
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      snap: {
        snapTo: (value) => Math.round(value / progressStep) * progressStep,
        duration: 0.55,
        delay: 0.02,
        ease: "power3.out",
      },
      onUpdate: (self) => {
        layout(self.progress * 360);
      },
    });
    stRef.current = st;

    const onResize = () => {
      layout(st.progress * 360);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(ticker);
      lenis?.destroy();
      lenisRef.current = null;
      stRef.current = null;
      st.kill();
    };
  }, [companies]);

  const goToIndex = (index: number) => {
    const count = companies.length;
    const progress = ((count - (index % count)) % count) / count;
    const st = stRef.current;
    const y = st ? st.start + progress * (st.end - st.start) : 0;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(y, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = companies[active] ?? companies[0];
  const features = current.cards;
  const stats = current.stats.slice(0, 3);
  const meta = [
    { kicker: "Founded", title: current.founded, body: current.hours },
    { kicker: "Location", title: current.location.split(",")[0], body: current.location },
    { kicker: "Contact", title: current.phone, body: current.email },
  ];

  return (
    <>
      <div ref={pinRef} className="d02-stage" id="stage">
        <div className="d02-backdrops" aria-hidden>
          {companies.map((co, i) => (
            <div
              key={co.id}
              className={`d02-backdrop${i === active ? " is-on" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={co.backdrop} alt="" />
            </div>
          ))}
        </div>
        <div className="d02-frost" aria-hidden />

        <div className="d02-arc">
          {companies.map((co, i) => (
            <button
              key={co.id}
              type="button"
              aria-label={`Show ${co.name}`}
              aria-current={i === active ? "true" : undefined}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="d02-card"
              onClick={() => goToIndex(i)}
            >
              <div className="d02-card-compact">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="logo" src={co.logo} alt="" />
              </div>
              <div className="d02-card-detail">
                <p className="d02-card-kicker">
                  {String(co.index).padStart(2, "0")} · {co.short}
                </p>
                <h3>{co.name}</h3>
                <p className="d02-card-lede">{co.slogan}</p>
                <p className="d02-card-mission">{co.mission}</p>
                {co.href ? (
                  <span className="d02-card-link">
                    Visit website <span aria-hidden>→</span>
                  </span>
                ) : (
                  <span className="d02-card-link">
                    Get in touch <span aria-hidden>→</span>
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        <aside className="d02-rail is-left">
          {meta.map((item) => (
            <article key={item.kicker} className="d02-chip">
              <small>{item.kicker}</small>
              <strong>{item.title}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </aside>

        <aside className="d02-rail is-right">
          {stats.map((item) => (
            <article key={item.label} className="d02-chip d02-stat">
              <small>{item.label}</small>
              <strong>{item.value}</strong>
            </article>
          ))}
        </aside>

        <div className="d02-features">
          {features.map((f) => (
            <article key={f.title}>
              <small>{f.kicker}</small>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>

        <p className="d02-hint">Scroll to spin · Selected card expands with details</p>
      </div>

      <section className="d02-site" id="story">
        <div className="d02-wrap">
          <p className="d02-kicker">Since 1974</p>
          <h2>A homegrown group, still on the road.</h2>
          <p className="intro">
            Woodlands Transport began with a handful of partners in 1974 and is now
            Singapore’s largest private bus and construction-vehicle operator — more
            than 800 vehicles and 800 people, with sister companies in travel,
            engineering, pawnbroking, hospitality, technology, laundry, and protection.
          </p>
          <div className="d02-timeline">
            {group.milestones.map((m) => (
              <article key={`${m.year}-${m.label}`}>
                <strong>{m.year}</strong>
                <p>{m.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d02-site" id="businesses">
        <div className="d02-wrap">
          <p className="d02-kicker">Operating companies</p>
          <h2>Eight brands. One standard of care.</h2>
          <p className="intro">
            Hover a card for the lift. Open a site where the brand keeps its own door.
          </p>
          <div className="d02-grid">
            {companies.slice(1).map((co) => (
              <a
                key={co.id}
                href={co.href || "#contact"}
                target={co.href ? "_blank" : undefined}
                rel={co.href ? "noreferrer" : undefined}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={co.logo} alt="" />
                <small>
                  Est. {co.founded} · {co.short}
                </small>
                <h3>{co.name}</h3>
                <p>{co.slogan}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="d02-site d02-esg" id="esg">
        <div className="d02-wrap">
          <p className="d02-kicker">{ESG.kicker}</p>
          <h2>{ESG.title}</h2>
          <p className="intro">{ESG.lead}</p>
          <div className="d02-esg-film">
            <EsgFilm />
          </div>
          <div className="d02-esg-copy">
            <div>
              <p>{ESG.body}</p>
              <p>{ESG.involvement}</p>
            </div>
            <div className="d02-esg-facts">
              {ESG.facts.map((item) => (
                <article key={item.t}>
                  <strong>{item.t}</strong>
                  <p>{item.d}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CoreValuesSection variant="d02" />

      <section className="d02-contact" id="contact">
        <div className="d02-wrap">
          <p className="d02-kicker">Headquarters</p>
          <h2>Let’s talk.</h2>
          <p className="intro">
            No. 8 Gul Circle, Singapore 629564 — weekdays 08:30–18:00. Fax +65 6898 2394.
          </p>
          <div className="d02-contact-grid">
            <a href="tel:+6565598988">
              <small>Call</small>
              <strong>+65 6559 8988</strong>
              <p>Switchboard for transport, engineering, and group enquiries.</p>
            </a>
            <a href="mailto:contact-us@wts.com.sg">
              <small>Write</small>
              <strong>contact-us@wts.com.sg</strong>
              <p>Charters, workshops, travel desks, and partnership notes.</p>
            </a>
            <article>
              <small>Visit</small>
              <strong>8 Gul Circle</strong>
              <p>Singapore 629564 · Gate 1, industrial west.</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { companyData } from "../../data/companyData";
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
      const cardHalf = w < 820 ? 58 : 75;
      const radius = Math.max(170, Math.min(w * 0.4, h * 0.5 - cardHalf * 1.35 - 56));

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const angle = i * step + rotation;
        const rad = ((angle - 90) * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const fromTop = Math.abs(shortestDelta(angle));
        const t = 1 - Math.min(fromTop / 70, 1);
        const focus = t * t;
        const scale = 0.7 + focus * 0.6;
        const below = y > 18;
        const opacity = below ? 0 : 0.22 + focus * 0.78;
        const blur = below || focus > 0.18 ? 0 : 2.4 * (1 - focus);
        const tilt = shortestDelta(angle) * 0.92;

        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${tilt}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.filter = blur ? `blur(${blur}px)` : "none";
        el.style.zIndex = String(Math.round(focus * 40));
        el.style.visibility = opacity < 0.02 ? "hidden" : "visible";
        el.style.pointerEvents = below ? "none" : "auto";
      });

      let best = 0;
      let bestScore = 999;
      for (let i = 0; i < count; i++) {
        const d = Math.abs(shortestDelta(i * step + rotation));
        if (d < bestScore) {
          bestScore = d;
          best = i;
        }
      }
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
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className={`d02-card${co.photo ? " has-photo" : ""}`}
              onClick={() => goToIndex(i)}
            >
              <div className="d02-card-inner">
                {co.photo ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="cover" src={co.photo} alt="" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="logo" src={co.logo} alt="" />
                  </>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="logo" src={co.logo} alt="" />
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

        <div className="d02-hero">
          <div key={current.id} className="d02-swap">
            <p className="d02-kicker">
              {String(current.index).padStart(2, "0")} · {current.short}
            </p>
            <h1>{current.name}</h1>
            <p className="lede">{current.slogan}</p>
            <p className="mission">{current.mission}</p>
            <a className="d02-cta" href={current.href || "#contact"}>
              {current.href ? "Visit website" : "Get in touch"}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="d02-features">
          {features.map((f) => (
            <article key={f.title}>
              <small>{f.kicker}</small>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>

        <p className="d02-hint">Scroll to rotate · Hover a logo to enlarge · Click to focus</p>
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

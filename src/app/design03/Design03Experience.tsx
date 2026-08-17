"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { companyData } from "../../data/companyData";
import "./design03.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Design03Experience() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);

  const companies = useMemo(() => companyData, []);

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

    const n = companies.length;
    const step = 1 / n;
    let lastActive = 0;

    const layout = (progress: number) => {
      const rotation = progress * Math.PI * 2;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const radius = Math.max(280, Math.min(w * 0.46, h * 0.4, 560));
      const offset = ((progress * n) % n + n) % n;
      const index = Math.round(offset) % n;

      if (trackRef.current) {
        trackRef.current.style.transform = "rotateX(12deg)";
      }

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const theta = (i / n) * Math.PI * 2 - rotation;
        const x = Math.sin(theta) * radius;
        const z = Math.cos(theta) * radius - radius * 0.42;
        const face = (Math.cos(theta) + 1) / 2;
        const rotY = ((-theta * 180) / Math.PI) * 0.42;
        const scale = 0.72 + face * 0.34;
        const blur = (1 - face) * 2.6;
        const opacity = 0.32 + face * 0.68;
        el.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.filter = blur > 0.4 ? `blur(${blur}px)` : "none";
        el.style.zIndex = String(Math.round(face * 80));
        el.style.pointerEvents = face > 0.22 ? "auto" : "none";
      });

      if (index !== lastActive) {
        lastActive = index;
        setActive(index);
      }
    };

    layout(0);
    if (reduced) return undefined;

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: `+=${n * 1000}`,
      pin: true,
      scrub: 1.15,
      anticipatePin: 1,
      snap: {
        snapTo: (value) => Math.round(value / step) * step,
        duration: 0.55,
        delay: 0.02,
        ease: "power3.out",
      },
      onUpdate: (self) => layout(self.progress),
    });
    stRef.current = st;

    const onResize = () => {
      layout(st.progress);
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
    const n = companies.length;
    const target = ((index % n) + n) % n;
    const st = stRef.current;
    const current = (st?.progress ?? 0) * n;
    const options = [target, target + n, target - n];
    let best = target;
    let bestDist = Infinity;
    for (const option of options) {
      const dist = Math.abs(option - current);
      if (dist < bestDist) {
        bestDist = dist;
        best = option;
      }
    }
    let p = best / n;
    while (p < 0) p += 1;
    while (p > 1) p -= 1;
    const y = st ? st.start + p * (st.end - st.start) : 0;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(y, { duration: 1.05 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const current = companies[active] ?? companies[0];
  const stats = current.stats.slice(0, 2);

  return (
    <>
      <div ref={pinRef} className="d03-stage" id="stage">
        <div className="d03-backdrops" aria-hidden>
          {companies.map((co, i) => (
            <div
              key={co.id}
              className={`d03-backdrop${i === active ? " is-on" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={co.backdrop} alt="" />
            </div>
          ))}
        </div>
        <div className="d03-frost is-on" aria-hidden />

        <header className="d03-bar">
          <a className="d03-logo" href="#stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brands/group.png" alt="" />
            <span>Woodlands</span>
          </a>
          <nav className="d03-nav" aria-label="Page">
            <a href="#stage">group</a>
            <a href="#stage">brands</a>
            <a href="#contact">story</a>
            <a href="#contact">contacts</a>
          </nav>
          <div className="d03-actions">
            <a className="ghost" href="tel:+6565598988">
              call
            </a>
            <a className="solid" href="#contact">
              enquire
            </a>
          </div>
        </header>

        <div className="d03-scene">
          <div ref={trackRef} className="d03-track">
            {companies.map((co, i) => (
              <article
                key={co.id}
                className={`d03-card${i === active ? " is-center" : ""}`}
                aria-label={co.name}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                onClick={() => goToIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goToIndex(i);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="d03-face">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="logo-hero" src={co.logo} alt={co.name} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside key={`${current.id}-left`} className="d03-detail is-left is-show">
          <small>Est. {current.founded}</small>
          <h3>{current.name}</h3>
          <p>{current.location}</p>
          <p>{current.hours}</p>
        </aside>

        <aside key={`${current.id}-right`} className="d03-detail is-right is-show">
          <small>{current.short}</small>
          <h3>{current.slogan}</h3>
          {stats.map((s) => (
            <p className="stat" key={s.label}>
              <strong>{s.value}</strong>
              {s.label}
            </p>
          ))}
        </aside>

        <div key={`${current.id}-bottom`} className="d03-detail is-bottom is-show">
          <p>{current.mission}</p>
          <a
            className="d03-cta"
            href={current.href || "#contact"}
            target={current.href ? "_blank" : undefined}
            rel={current.href ? "noreferrer" : undefined}
          >
            {current.href ? "view website" : "get in touch"}
          </a>
        </div>

        <div className="d03-controls">
          <button
            type="button"
            className="prev"
            aria-label="Previous brand"
            onClick={() => goToIndex(active - 1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="next"
            aria-label="Next brand"
            onClick={() => goToIndex(active + 1)}
          >
            ›
          </button>
        </div>
        <p className="d03-hint">Scroll to slide</p>
      </div>

      <section className="d03-contact" id="contact">
        <h2>Let’s talk</h2>
        <p>
          Woodlands Transport Group · 8 Gul Circle, Singapore 629564
          <br />
          <a href="mailto:contact-us@wts.com.sg">contact-us@wts.com.sg</a>
          {" · "}
          <a href="tel:+6565598988">+65 6559 8988</a>
        </p>
      </section>
    </>
  );
}

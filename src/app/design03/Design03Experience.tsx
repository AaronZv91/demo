"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { companyData } from "../../data/companyData";
import { ESG } from "../../data/esg";
import { EsgFilm } from "../../components/EsgFilm";
import { RoadmapRoadTimeline } from "./RoadmapRoadTimeline";
import { CoreValuesSection } from "../../components/CoreValuesSection";
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
  const activeRef = useRef(0);
  const goToIndexRef = useRef<(index: number) => void>(() => {});
  const [active, setActive] = useState(0);

  const companies = useMemo(
    () => companyData.filter((c) => c.id !== "group"),
    [],
  );

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

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
        const coarse =
          window.matchMedia("(pointer: coarse)").matches ||
          "ontouchstart" in window;
        lenis = new Lenis({
          duration: coarse ? 1.05 : 1.15,
          smoothWheel: !coarse,
          syncTouch: coarse,
          syncTouchLerp: 0.085,
          touchInertiaExponent: 1.55,
          touchMultiplier: coarse ? 1.15 : 1,
          allowNestedScroll: true,
          prevent: (node) =>
            node instanceof Element &&
            Boolean(
              node.closest(
                ".d03-rail, .d03-rail-track, .d03-rail-item, .d03-chronicle-years",
              ),
            ),
          autoRaf: false,
        });
        lenis.on("scroll", () => {
          ScrollTrigger.update();
          window.dispatchEvent(new Event("scroll"));
        });
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
      const phone = w < 640;
      const tablet = w < 1180;
      const radius = Math.max(
        phone ? 118 : tablet ? 176 : 260,
        Math.min(
          w * (phone ? 0.34 : tablet ? 0.38 : 0.44),
          h * (phone ? 0.2 : tablet ? 0.28 : 0.4),
          phone ? 420 : tablet ? 480 : 560,
        ),
      );
      const offset = ((progress * n) % n + n) % n;
      const index = Math.round(offset) % n;

      if (trackRef.current) {
        trackRef.current.style.transform = "rotateX(12deg)";
      }

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const rawTheta = (i / n) * Math.PI * 2 - rotation;
        // Normalize theta to [-PI, PI] so 3D rotationY wraps continuously and never flips backwards
        const theta = Math.atan2(Math.sin(rawTheta), Math.cos(rawTheta));
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
      end: `+=${n * 900}`,
      pin: true,
      scrub: 1.05,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      snap: {
        snapTo: (value) => Math.round(value / step) * step,
        duration: 0.5,
        delay: 0.01,
        ease: "power3.out",
      },
      onUpdate: (self) => layout(self.progress),
    });
    stRef.current = st;

    const refresh = () => {
      layout(st.progress);
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      vv?.removeEventListener("resize", refresh);
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
    if (!st) {
      setActive(target);
      return;
    }

    const currentP = st.progress ?? 0;
    const currentVirtualIdx = currentP * n;

    // Candidates in virtual index space to find shortest rotational distance
    const candidates = [target - n, target, target + n, target + 2 * n, target - 2 * n];
    let bestIdx = target;
    let minDist = Infinity;
    for (const c of candidates) {
      const dist = Math.abs(c - currentVirtualIdx);
      if (dist < minDist) {
        minDist = dist;
        bestIdx = c;
      }
    }

    let targetP = bestIdx / n;

    // If targetP is outside [0, 1], wrap seamlessly
    if (targetP > 1) {
      const wrappedCurrentP = ((currentP % 1) + 1) % 1;
      const immediateY = st.start + wrappedCurrentP * (st.end - st.start);
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(immediateY, { immediate: true });
      else window.scrollTo({ top: immediateY, behavior: "instant" });
      targetP = targetP - 1;
    } else if (targetP < 0) {
      const wrappedCurrentP = ((currentP % 1) + 1) % 1;
      const immediateY = st.start + (wrappedCurrentP === 0 ? 1 : wrappedCurrentP) * (st.end - st.start);
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(immediateY, { immediate: true });
      else window.scrollTo({ top: immediateY, behavior: "instant" });
      targetP = targetP + 1;
    }

    const y = st.start + Math.max(0, Math.min(1, targetP)) * (st.end - st.start);
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(y, { duration: 0.85 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };
  goToIndexRef.current = goToIndex;

  useEffect(() => {
    const stage = pinRef.current;
    if (!stage) return;

    const THRESH = 36;
    const LOCK = 10;
    let startX = 0;
    let startY = 0;
    let tracking = false;
    let axis: "h" | "v" | null = null;
    let swiped = false;

    const interactive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          "a, button, .d03-rail, .d03-controls, .d03-detail.is-bottom, input, textarea",
        ),
      );
    };

    const begin = (x: number, y: number, target: EventTarget | null) => {
      if (interactive(target)) return false;
      tracking = true;
      axis = null;
      swiped = false;
      startX = x;
      startY = y;
      return true;
    };

    const move = (x: number, y: number, event: Event) => {
      if (!tracking) return;
      const dx = x - startX;
      const dy = y - startY;
      if (!axis && (Math.abs(dx) > LOCK || Math.abs(dy) > LOCK)) {
        axis = Math.abs(dx) > Math.abs(dy) * 1.1 ? "h" : "v";
      }
      if (axis === "h") {
        event.preventDefault();
      }
    };

    const end = (x: number) => {
      if (!tracking) return;
      const dx = x - startX;
      const wasHorizontal = axis === "h";
      tracking = false;
      axis = null;
      if (!wasHorizontal) return;
      if (Math.abs(dx) < THRESH) return;
      swiped = true;
      if (dx < 0) goToIndexRef.current(activeRef.current + 1);
      else goToIndexRef.current(activeRef.current - 1);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      begin(e.touches[0].clientX, e.touches[0].clientY, e.target);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!tracking || e.touches.length !== 1) return;
      move(e.touches[0].clientX, e.touches[0].clientY, e);
    };
    const onTouchEnd = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (t) end(t.clientX);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (e.pointerType === "mouse" && e.button !== 0) return;
      begin(e.clientX, e.clientY, e.target);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      move(e.clientX, e.clientY, e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      end(e.clientX);
    };

    const onClickCapture = (e: MouseEvent) => {
      if (!swiped) return;
      e.preventDefault();
      e.stopPropagation();
      swiped = false;
    };

    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd);
    stage.addEventListener("touchcancel", onTouchEnd);
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove, { passive: false });
    stage.addEventListener("pointerup", onPointerUp);
    stage.addEventListener("pointercancel", onPointerUp);
    stage.addEventListener("click", onClickCapture, true);

    return () => {
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("touchcancel", onTouchEnd);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", onPointerUp);
      stage.removeEventListener("pointercancel", onPointerUp);
      stage.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  useEffect(() => {
    const track = pinRef.current?.querySelector(
      ".d03-rail-track",
    ) as HTMLElement | null;
    if (!track) return;

    let dragging = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const onStart = (clientX: number) => {
      dragging = true;
      moved = false;
      startX = clientX;
      startScroll = track.scrollLeft;
    };

    const onMove = (clientX: number, event: Event) => {
      if (!dragging) return;
      const dx = clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startScroll - dx;
      event.preventDefault();
      event.stopPropagation();
    };

    const onEnd = () => {
      dragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      e.stopPropagation();
      onStart(e.touches[0].clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging || e.touches.length !== 1) return;
      onMove(e.touches[0].clientX, e);
    };
    const onTouchEnd = (e: TouchEvent) => {
      e.stopPropagation();
      onEnd();
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      if (e.button !== 0) return;
      onStart(e.clientX);
      track.setPointerCapture?.(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      onMove(e.clientX, e);
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      onEnd();
    };

    const onClickCapture = (e: MouseEvent) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: false });
    track.addEventListener("touchend", onTouchEnd);
    track.addEventListener("touchcancel", onTouchEnd);
    track.addEventListener("pointerdown", onPointerDown);
    track.addEventListener("pointermove", onPointerMove, { passive: false });
    track.addEventListener("pointerup", onPointerUp);
    track.addEventListener("pointercancel", onPointerUp);
    track.addEventListener("click", onClickCapture, true);

    return () => {
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("pointercancel", onPointerUp);
      track.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  useEffect(() => {
    const track = pinRef.current?.querySelector(
      ".d03-rail-track",
    ) as HTMLElement | null;
    const item = track?.querySelector(".d03-rail-item.is-active") as
      | HTMLElement
      | null;
    if (!track || !item) return;
    const left =
      item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

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
          <div className="d03-actions">
            <a className="ghost" href="tel:+6565598988">
              call
            </a>
            <a className="solid" href="#contact">
              enquire
            </a>
          </div>
          <nav className="d03-nav" aria-label="Page">
            <a href="#stage">Group</a>
            <a href="#stage">Brands</a>
            <a href="#story">Story</a>
            <a href="#esg">ESG</a>
            <a href="#values">Values</a>
            <a href="#contact">Contacts</a>
          </nav>
          <a className="d03-logo" href="#stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brands/group.png" alt="Woodlands Group" />
          </a>
        </header>

        <div className="d03-scene">
          <div ref={trackRef} className="d03-track">
            {companies.map((co, i) => (
              <article
                key={co.id}
                className={`d03-card${i === active ? " is-center" : ""}${co.id === "transport" ? " is-xl" : ""}`}
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

        <nav className="d03-rail" aria-label="Branches timeline">
          <div className="d03-rail-inner">
            <div className="d03-rail-track" role="list">
              {companies.map((co, i) => (
                <button
                  key={co.id}
                  type="button"
                  role="listitem"
                  className={`d03-rail-item${i === active ? " is-active" : ""}`}
                  aria-label={co.name}
                  aria-current={i === active ? "true" : undefined}
                  title={`${co.name} (Est. ${co.founded})`}
                  onClick={() => goToIndex(i)}
                >
                  <span className="d03-rail-dot" aria-hidden="true" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="d03-rail-icon" src={co.logo} alt="" aria-hidden="true" />
                  <span className="d03-rail-name">{co.short}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="d03-controls">
          <button
            type="button"
            className="prev"
            aria-label="Previous brand"
            onClick={() => goToIndex(active - 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            className="next"
            aria-label="Next brand"
            onClick={() => goToIndex(active + 1)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
        <p className="d03-hint">Scroll or swipe</p>
      </div>

      <section className="d03-story" id="story">
        <div className="d03-wrap">
          <div className="d03-story-head">
            <div>
              <p className="d03-kicker">Since 1974 · 50 Years Roadmap</p>
              <h2>Fifty years of keeping Singapore moving.</h2>
            </div>
            <p className="d03-intro">
              Drive through five decades of milestones — from Mandai Kampong bus partnerships to an integrated group powering public mobility, engineering, and national infrastructure.
            </p>
          </div>

          <RoadmapRoadTimeline />
        </div>
      </section>

      <section className="d03-story d03-esg" id="esg">
        <div className="d03-wrap">
          <p className="d03-kicker">{ESG.kicker}</p>
          <h2>{ESG.title}</h2>
          <p className="d03-intro">{ESG.lead}</p>
          <div className="d03-esg-film">
            <EsgFilm />
          </div>
          <div className="d03-esg-copy">
            <div>
              <p>{ESG.body}</p>
              <p>{ESG.involvement}</p>
            </div>
            <div className="d03-esg-facts">
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

      <CoreValuesSection variant="d03" />

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

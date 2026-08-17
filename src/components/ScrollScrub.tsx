"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  FRAME_COUNT,
  FRAME_PATH,
  JOURNEY_NODES,
  type BusinessNode,
} from "../data/businesses";

const CHAPTERS = JOURNEY_NODES.length;
const HOLD_FIRST = 0.22;
const HOLD = 0.7;
const TRANS = 3.8;
const JOURNEY_WEIGHT =
  HOLD_FIRST + HOLD * (CHAPTERS - 1) + TRANS * Math.max(0, CHAPTERS - 1);
const ENTER_AT = 0.74;
const TRACK_PX_PER_FRAME = 22;

type OverlayMode = "in" | "out" | "gone";

type JourneyState = {
  kind: "hold" | "trans";
  idx: number;
  nextIdx: number;
  t: number;
  frame: number;
  displayIdx: number;
  mode: OverlayMode;
  landed: boolean;
  dot: number;
};

function chapterFrame(i: number) {
  if (CHAPTERS <= 1) return 0;
  return (i / (CHAPTERS - 1)) * (FRAME_COUNT - 1);
}

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function holdStartProgress(i: number) {
  if (i <= 0) return 0;
  let units = HOLD_FIRST;
  for (let k = 1; k < i; k++) units += TRANS + HOLD;
  units += TRANS;
  return units / JOURNEY_WEIGHT;
}

function journeyAt(progress: number, landedLocked: boolean): JourneyState {
  const p = Math.min(1, Math.max(0, progress));
  let x = p * JOURNEY_WEIGHT;

  for (let i = 0; i < CHAPTERS; i++) {
    const holdW = i === 0 ? HOLD_FIRST : HOLD;
    if (x <= holdW || i === CHAPTERS - 1) {
      return {
        kind: "hold",
        idx: i,
        nextIdx: i,
        t: 0,
        frame: chapterFrame(i),
        displayIdx: i,
        mode: "in",
        landed: landedLocked && i === 0,
        dot: i,
      };
    }
    x -= holdW;

    if (i >= CHAPTERS - 1) break;

    if (x <= TRANS) {
      const t = x / TRANS;
      const frame =
        chapterFrame(i) +
        (chapterFrame(i + 1) - chapterFrame(i)) * smoothstep(t);
      const entering = t >= ENTER_AT;
      return {
        kind: "trans",
        idx: i,
        nextIdx: i + 1,
        t,
        frame,
        displayIdx: entering ? i + 1 : i,
        mode: entering ? "in" : "out",
        landed: false,
        dot: t >= 0.5 ? i + 1 : i,
      };
    }
    x -= TRANS;
  }

  const last = CHAPTERS - 1;
  return {
    kind: "hold",
    idx: last,
    nextIdx: last,
    t: 0,
    frame: chapterFrame(last),
    displayIdx: last,
    mode: "in",
    landed: false,
    dot: last,
  };
}

function scrollToProgress(track: HTMLDivElement | null, progress: number) {
  if (!track) return;
  const total = track.offsetHeight - window.innerHeight;
  const top =
    track.getBoundingClientRect().top + window.scrollY + progress * total;
  window.scrollTo({ top, behavior: "smooth" });
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  width: number,
  height: number,
) {
  const iw = img.naturalWidth || 1920;
  const ih = img.naturalHeight || 1080;
  const ir = iw / ih;
  const cr = width / height;
  let dw: number;
  let dh: number;
  let dx: number;
  let dy: number;
  if (ir > cr) {
    dh = height;
    dw = height * ir;
    dx = (width - dw) / 2;
    dy = 0;
  } else {
    dw = width;
    dh = width / ir;
    dx = 0;
    dy = (height - dh) / 2;
  }
  ctx.drawImage(img, dx, dy, dw, dh);
}

function nearestFrame(
  frames: (HTMLImageElement | null)[],
  index: number,
) {
  const clamped = Math.min(FRAME_COUNT - 1, Math.max(0, index));
  const direct = frames[clamped];
  if (direct && direct.complete && direct.naturalWidth) return { img: direct, used: clamped };
  for (let i = clamped; i >= 0; i--) {
    const img = frames[i];
    if (img && img.complete && img.naturalWidth) return { img, used: i };
  }
  for (let i = clamped + 1; i < FRAME_COUNT; i++) {
    const img = frames[i];
    if (img && img.complete && img.naturalWidth) return { img, used: i };
  }
  return { img: null, used: -1 };
}

export function ScrollScrub() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: FRAME_COUNT }, () => null),
  );
  const uiKeyRef = useRef("");
  const premiereRef = useRef(true);
  const displayFrameRef = useRef(0);
  const drawnSigRef = useRef("");

  const [ui, setUi] = useState(() => {
    const opening = journeyAt(0, true);
    return {
      displayIdx: opening.displayIdx,
      mode: opening.mode,
      landed: true,
      idx: opening.idx,
      dot: 0,
      playing: false,
    };
  });

  useEffect(() => {
    const frames = framesRef.current;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = FRAME_PATH(i);
      img.onload = () => {
        frames[i - 1] = img;
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const sizeCanvas = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const nextW = Math.round(w * dpr);
      const nextH = Math.round(h * dpr);
      if (canvas.width !== nextW || canvas.height !== nextH) {
        canvas.width = nextW;
        canvas.height = nextH;
        drawnSigRef.current = "";
      }
    };

    sizeCanvas();

    const readProgress = () => {
      const rect = track.getBoundingClientRect();
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      return total <= 0 ? 0 : Math.min(1, Math.max(0, scrolled / total));
    };

    let raf = 0;
    const tick = () => {
      raf = window.requestAnimationFrame(tick);
      const progress = readProgress();
      const state = journeyAt(progress, premiereRef.current);
      if (state.kind === "trans" || state.idx > 0) premiereRef.current = false;
      const target = state.frame;
      const follow = state.kind === "hold" ? 0.28 : 0.2;
      displayFrameRef.current += (target - displayFrameRef.current) * follow;
      if (Math.abs(target - displayFrameRef.current) < 0.04) {
        displayFrameRef.current = target;
      }

      const wanted = Math.round(displayFrameRef.current);
      const found = nearestFrame(framesRef.current, wanted);
      if (found.img) {
        const sig = `${wanted}:${found.used}:${canvas.width}x${canvas.height}`;
        if (sig !== drawnSigRef.current) {
          ctx.fillStyle = "#f5f5f7";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          drawCover(ctx, found.img, canvas.width, canvas.height);
          drawnSigRef.current = sig;
        }
      }

      if (fillRef.current) {
        fillRef.current.style.height = `calc(${progress} * (100% - 1.5rem))`;
      }
      if (barRef.current) {
        const bar =
          state.kind === "hold"
            ? 1
            : state.mode === "in"
              ? Math.min(1, Math.max(0, (state.t - ENTER_AT) / (1 - ENTER_AT)))
              : 0;
        barRef.current.style.width = `${bar * 100}%`;
      }

      const playing = state.kind === "trans" && state.mode === "out";
      const key = `${state.displayIdx}|${state.mode}|${state.landed ? 1 : 0}|${state.dot}|${playing ? 1 : 0}`;
      if (key !== uiKeyRef.current) {
        uiKeyRef.current = key;
        setUi({
          displayIdx: state.displayIdx,
          mode: state.mode,
          landed: state.landed,
          idx: state.idx,
          dot: state.dot,
          playing,
        });
      }
    };

    raf = window.requestAnimationFrame(tick);
    window.addEventListener("resize", sizeCanvas);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", sizeCanvas);
    };
  }, []);

  const current: BusinessNode = JOURNEY_NODES[ui.displayIdx] ?? JOURNEY_NODES[0];
  const idx = ui.dot;
  const stackClass = ui.landed
    ? "is-landed"
    : ui.mode === "out"
      ? "is-out"
      : ui.mode === "gone"
        ? "is-gone"
        : "is-in";

  return (
    <section
      ref={trackRef}
      id="journey"
      className="relative"
      style={{ height: `calc(100svh + ${FRAME_COUNT * TRACK_PX_PER_FRAME}px)` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#f5f5f7]">
        <div className="absolute inset-0">
          <canvas
            ref={canvasRef}
            className="h-full w-full"
            aria-hidden
          />
          <div
            className={`absolute inset-0 bg-white/20 transition-opacity duration-700 ease-out ${
              ui.playing ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          />
          <div
            className={`focus-spotlight pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out ${
              ui.playing ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          />
          <div
            className={`focus-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 transition-opacity duration-700 ease-out ${
              ui.playing ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden px-3 py-16 sm:px-6 sm:py-20">
          <div
            key={current.id}
            className={`d01-stack relative my-auto w-[92vw] sm:w-[70vw] ${stackClass} ${
              ui.playing ? "pointer-events-none" : "pointer-events-auto"
            }`}
          >
            <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.04),transparent_65%)] blur-2xl" />

            <div className="d01-panel mb-4 sm:mb-5">
              <div className="focus-card flex items-center gap-5 p-5 sm:gap-8 sm:p-8">
                <div className="logo-glow flex h-20 w-20 shrink-0 items-center justify-center bg-white p-2.5 sm:h-28 sm:w-28">
                  <Image
                    src={current.logo}
                    alt={current.name}
                    width={160}
                    height={160}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6e6e73] sm:text-xs">
                    {String(current.index).padStart(2, "0")} · Chapter
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold leading-tight text-[#1d1d1f] sm:text-5xl">
                    {current.name}
                  </h2>
                  <p className="mt-2 text-sm text-[#6e6e73] sm:text-lg">
                    {current.tagline}
                  </p>
                </div>
              </div>
            </div>

            <div className="d01-panel mb-4 sm:mb-5">
              <div className="focus-card p-5 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-[#1d1d1f]/20 sm:w-8" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] sm:text-xs">
                    Background
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#1d1d1f]/80 sm:text-lg sm:leading-8">
                  {current.summary}
                </p>
                <p className="mt-4 border-l-2 border-[#1d1d1f]/20 pl-3 font-display text-base font-semibold text-[#1d1d1f] sm:mt-5 sm:pl-4 sm:text-2xl">
                  {current.highlight}
                </p>
              </div>
            </div>

            <div className="d01-panel mb-4 sm:mb-5">
              <div className="focus-card p-5 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-[#1d1d1f]/20 sm:w-8" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] sm:text-xs">
                    Services
                  </p>
                </div>
                <ul className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-5">
                  {current.services.map((s) => (
                    <li key={s.title} className="d01-svc flex gap-3">
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#1d1d1f]" />
                      <div>
                        <p className="text-sm font-semibold text-[#1d1d1f] sm:text-base">
                          {s.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[#6e6e73] sm:text-[15px]">
                          {s.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="d01-panel">
              <div className="focus-card p-5 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-[#1d1d1f]/20 sm:w-8" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] sm:text-xs">
                    Contact
                  </p>
                </div>
                <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-6">
                  {current.address && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#86868b] sm:text-xs">
                        Address
                      </p>
                      <p className="mt-1 text-sm text-[#1d1d1f] sm:text-base">
                        {current.address}
                      </p>
                    </div>
                  )}
                  {current.phone && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#86868b] sm:text-xs">
                        Phone
                      </p>
                      <a
                        href={`tel:${current.phone.replace(/\s/g, "")}`}
                        className="d01-link mt-1 block text-sm text-[#1d1d1f] sm:text-base"
                      >
                        {current.phone}
                      </a>
                    </div>
                  )}
                  {current.email && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#86868b] sm:text-xs">
                        Email
                      </p>
                      <a
                        href={`mailto:${current.email}`}
                        className="d01-link mt-1 block text-sm text-[#1d1d1f] sm:text-base"
                      >
                        {current.email}
                      </a>
                    </div>
                  )}
                </div>
                {current.href && (
                  <a
                    href={current.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-2.5 text-sm font-semibold text-white transition duration-500 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] sm:mt-6 sm:px-5 sm:text-base"
                  >
                    Visit website
                    <span aria-hidden>→</span>
                  </a>
                )}
              </div>
            </div>

            <div className="d01-meter mt-5 h-0.5 overflow-hidden rounded-full bg-black/10">
              <div
                ref={barRef}
                className="h-full bg-[#1d1d1f]"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        <aside
          className="absolute right-3 top-1/2 z-30 -translate-y-1/2 sm:right-5 md:right-7"
          aria-label="Timeline"
        >
          <div className="relative flex flex-col items-center py-2">
            <div
              className="absolute top-3 bottom-3 left-1/2 w-px -translate-x-1/2 bg-black/10"
              aria-hidden
            />
            <div
              ref={fillRef}
              className="absolute top-3 left-1/2 w-px -translate-x-1/2 bg-[#1d1d1f]/50"
              style={{ height: "0px" }}
              aria-hidden
            />
            {JOURNEY_NODES.map((node, i) => {
              const active = i === idx;
              return (
                <button
                  key={node.id}
                  type="button"
                  title={node.name}
                  aria-label={node.name}
                  aria-current={active ? "true" : undefined}
                  onClick={() =>
                    scrollToProgress(trackRef.current, holdStartProgress(i))
                  }
                  className="relative z-10 flex h-7 w-7 items-center justify-center transition duration-300 hover:scale-125"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      active
                        ? "h-2.5 w-2.5 bg-[#1d1d1f] shadow-[0_0_0_3px_rgba(29,29,31,0.16)]"
                        : "h-1.5 w-1.5 bg-black/25 hover:bg-black/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}

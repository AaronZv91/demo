"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BUSINESSES,
  type BusinessNode,
} from "../data/businesses";
import {
  D01_SEQUENCES,
  D01_TOTAL_FRAMES,
  d01FramePath,
} from "../data/d01Frames";

const COMPANY_SEQS = D01_SEQUENCES.filter((s) => !s.ending);
const ENDING_SEQ = D01_SEQUENCES.find((s) => s.ending)!;
const CHAPTERS = COMPANY_SEQS.length;

const HOLD_FIRST = 0.24;
const HOLD = 0.62;
const PLAY = 3.75;
const END_PLAY = 5.4;
const END_HOLD = 0.95;
const JOURNEY_WEIGHT =
  HOLD_FIRST +
  HOLD * (CHAPTERS - 1) +
  PLAY * CHAPTERS +
  END_PLAY +
  END_HOLD;
const ENTER_AT = 0.74;
const ASSIST_AT = 0.15;
const TRACK_PX_PER_FRAME = 11;

type OverlayMode = "in" | "out" | "gone";

type JourneyState = {
  kind: "hold" | "play";
  seqId: string;
  idx: number;
  t: number;
  frame: number;
  displayIdx: number;
  mode: OverlayMode;
  landed: boolean;
  dot: number;
  ending: boolean;
  playing: boolean;
};

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function seqFrame(seqId: string, t: number) {
  const seq = D01_SEQUENCES.find((s) => s.id === seqId);
  const n = seq?.count ?? 1;
  return smoothstep(t) * Math.max(0, n - 1);
}

function holdStartProgress(i: number) {
  if (i <= 0) return 0;
  let units = HOLD_FIRST + PLAY;
  const cap = Math.min(i, CHAPTERS);
  for (let k = 1; k < cap; k++) units += HOLD + PLAY;
  if (i >= CHAPTERS) units += 0;
  return Math.min(0.999, units / JOURNEY_WEIGHT);
}

function nextChapterProgress(state: JourneyState) {
  if (state.ending) return 1;
  return holdStartProgress(state.idx + 1);
}

function journeyAt(progress: number, landedLocked: boolean): JourneyState {
  const p = Math.min(1, Math.max(0, progress));
  let x = p * JOURNEY_WEIGHT;
  const last = CHAPTERS - 1;

  const holdCompany = (i: number, holdW: number, opening: boolean) => {
    if (x <= holdW) {
      return {
        kind: "hold" as const,
        seqId: COMPANY_SEQS[i].id,
        idx: i,
        t: 0,
        frame: 0,
        displayIdx: i,
        mode: "in" as const,
        landed: landedLocked && opening,
        dot: i,
        ending: false,
        playing: false,
      };
    }
    x -= holdW;
    return null;
  };

  const playCompany = (i: number) => {
    if (x <= PLAY) {
      const t = x / PLAY;
      return {
        kind: "play" as const,
        seqId: COMPANY_SEQS[i].id,
        idx: i,
        t,
        frame: seqFrame(COMPANY_SEQS[i].id, t),
        displayIdx: i,
        mode: "out" as OverlayMode,
        landed: false,
        dot: t >= 0.88 && i < last ? i + 1 : i,
        ending: false,
        playing: true,
      };
    }
    x -= PLAY;
    return null;
  };

  const opening = holdCompany(0, HOLD_FIRST, true);
  if (opening) return opening;
  const play0 = playCompany(0);
  if (play0) return play0;

  for (let i = 1; i < CHAPTERS; i++) {
    const hold = holdCompany(i, HOLD, false);
    if (hold) return hold;
    const play = playCompany(i);
    if (play) return play;
  }

  if (x <= END_PLAY) {
    const t = x / END_PLAY;
    const entering = t >= ENTER_AT;
    return {
      kind: "play",
      seqId: ENDING_SEQ.id,
      idx: last,
      t,
      frame: seqFrame(ENDING_SEQ.id, t),
      displayIdx: last,
      mode: entering ? "in" : "out",
      landed: false,
      dot: CHAPTERS,
      ending: true,
      playing: !entering,
    };
  }
  x -= END_PLAY;

  return {
    kind: "hold",
    seqId: ENDING_SEQ.id,
    idx: last,
    t: 1,
    frame: Math.max(0, ENDING_SEQ.count - 1),
    displayIdx: last,
    mode: "in",
    landed: false,
    dot: CHAPTERS,
    ending: true,
    playing: false,
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
  const iw = img.naturalWidth || 1280;
  const ih = img.naturalHeight || 720;
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
  frames: (HTMLImageElement | null)[] | undefined,
  index: number,
) {
  if (!frames?.length) return { img: null, used: -1 };
  const clamped = Math.min(frames.length - 1, Math.max(0, index));
  const direct = frames[clamped];
  if (direct && direct.complete && direct.naturalWidth) {
    return { img: direct, used: clamped };
  }
  for (let i = clamped; i >= 0; i--) {
    const img = frames[i];
    if (img && img.complete && img.naturalWidth) return { img, used: i };
  }
  for (let i = clamped + 1; i < frames.length; i++) {
    const img = frames[i];
    if (img && img.complete && img.naturalWidth) return { img, used: i };
  }
  return { img: null, used: -1 };
}

function loadSequence(
  id: string,
  count: number,
  bucket: Record<string, (HTMLImageElement | null)[]>,
) {
  const frames = Array.from({ length: count }, () => null);
  bucket[id] = frames;
  for (let i = 0; i < count; i++) {
    const img = new window.Image();
    img.decoding = "async";
    img.src = d01FramePath(id, i);
    img.onload = () => {
      frames[i] = img;
    };
  }
}

export function ScrollScrub() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<Record<string, (HTMLImageElement | null)[]>>({});
  const uiKeyRef = useRef("");
  const premiereRef = useRef(true);
  const displayFrameRef = useRef(0);
  const seqIdRef = useRef(COMPANY_SEQS[0].id);
  const drawnSigRef = useRef("");

  const nodes = useMemo(() => {
    return COMPANY_SEQS.map(
      (seq) => BUSINESSES.find((b) => b.id === seq.id) as BusinessNode,
    ).filter(Boolean);
  }, []);
  const group = BUSINESSES.find((b) => b.id === "group") ?? BUSINESSES[0];

  const [ui, setUi] = useState(() => {
    const opening = journeyAt(0, true);
    return {
      displayIdx: opening.displayIdx,
      mode: opening.mode,
      landed: true,
      idx: opening.idx,
      dot: 0,
      playing: false,
      ending: false,
      playT: 0,
      aid: "hint" as "hint" | "ready" | "auto",
    };
  });

  useEffect(() => {
    const bucket = framesRef.current;
    for (const seq of D01_SEQUENCES) {
      loadSequence(seq.id, seq.count, bucket);
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

    const yForProgress = (progress: number) => {
      const total = track.offsetHeight - window.innerHeight;
      return (
        track.getBoundingClientRect().top + window.scrollY + progress * total
      );
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let driving = false;
    let driveFrom = 0;
    let driveTo = 0;
    let driveT0 = 0;
    let driveDur = 0;
    let armedKey = "";
    let idleTimer = 0;
    let inputLock = false;

    const stopDrive = () => {
      driving = false;
    };

    const tryAssist = () => {
      if (reduced || driving || inputLock) return;
      const progress = readProgress();
      const state = journeyAt(progress, premiereRef.current);
      if (state.kind !== "play" || state.t < ASSIST_AT) {
        if (state.kind !== "play" || state.t < ASSIST_AT * 0.72) armedKey = "";
        return;
      }
      const target = nextChapterProgress(state);
      if (target <= progress + 0.004) return;
      const key = `${state.seqId}:${state.idx}`;
      if (armedKey === key) return;
      armedKey = key;
      driving = true;
      driveFrom = window.scrollY;
      driveTo = yForProgress(target);
      driveT0 = performance.now();
      driveDur = Math.max(720, (1 - state.t) * 1680);
    };

    const onInput = () => {
      inputLock = true;
      stopDrive();
      armedKey = "";
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        inputLock = false;
        tryAssist();
      }, 160);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        onInput();
        return;
      }
      inputLock = false;
      tryAssist();
    };

    let raf = 0;
    const tick = () => {
      raf = window.requestAnimationFrame(tick);
      if (driving) {
        const u = Math.min(1, (performance.now() - driveT0) / driveDur);
        const e = u * u * (3 - 2 * u);
        window.scrollTo(0, driveFrom + (driveTo - driveFrom) * e);
        if (u >= 1) driving = false;
      }
      const progress = readProgress();
      const state = journeyAt(progress, premiereRef.current);
      if (!inputLock && !driving) tryAssist();
      if (state.kind === "play" || state.idx > 0 || state.ending) {
        premiereRef.current = false;
      }

      if (state.seqId !== seqIdRef.current) {
        seqIdRef.current = state.seqId;
        displayFrameRef.current = state.frame;
      } else {
        const follow = state.kind === "hold" ? 0.28 : 0.22;
        displayFrameRef.current += (state.frame - displayFrameRef.current) * follow;
        if (Math.abs(state.frame - displayFrameRef.current) < 0.04) {
          displayFrameRef.current = state.frame;
        }
      }

      const wanted = Math.round(displayFrameRef.current);
      const found = nearestFrame(framesRef.current[state.seqId], wanted);
      if (found.img) {
        const sig = `${state.seqId}:${wanted}:${found.used}:${canvas.width}x${canvas.height}`;
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
            : state.ending && state.mode === "in"
              ? Math.min(1, Math.max(0, (state.t - ENTER_AT) / (1 - ENTER_AT)))
              : state.playing
                ? 0
                : Math.min(1, state.t);
        barRef.current.style.width = `${bar * 100}%`;
      }

      const aid =
        driving && state.kind === "play" && state.t >= ASSIST_AT
          ? "auto"
          : state.kind === "play"
            ? "ready"
            : "hint";
      const key = `${state.displayIdx}|${state.mode}|${state.landed ? 1 : 0}|${state.dot}|${state.playing ? 1 : 0}|${state.ending ? 1 : 0}|${aid}|${state.t.toFixed(2)}`;
      if (key !== uiKeyRef.current) {
        uiKeyRef.current = key;
        setUi({
          displayIdx: state.displayIdx,
          mode: state.mode,
          landed: state.landed,
          idx: state.idx,
          dot: state.dot,
          playing: state.playing,
          ending: state.ending,
          playT: state.t,
          aid,
        });
      }
    };

    raf = window.requestAnimationFrame(tick);
    window.addEventListener("resize", sizeCanvas);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onInput, { passive: true });
    window.addEventListener("keydown", onInput);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
      window.removeEventListener("resize", sizeCanvas);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onInput);
      window.removeEventListener("keydown", onInput);
    };
  }, []);

  const current: BusinessNode = nodes[ui.displayIdx] ?? nodes[0];
  const idx = ui.dot;
  const stackClass = ui.landed
    ? "is-landed"
    : ui.mode === "out"
      ? "is-out"
      : ui.mode === "gone"
        ? "is-gone"
        : "is-in";
  const showMission = ui.ending && ui.mode === "in";
  const showCompany = !ui.ending || ui.mode === "out";

  const missionWords = group.tagline.split(" ");

  return (
    <section
      ref={trackRef}
      id="journey"
      className="relative"
      style={{ height: `calc(100svh + ${D01_TOTAL_FRAMES * TRACK_PX_PER_FRAME}px)` }}
    >
      <div className="sticky top-0 h-[100svh] h-[100dvh] w-full overflow-hidden bg-[#f5f5f7]">
        <div className="absolute inset-0">
          <canvas ref={canvasRef} className="h-full w-full" aria-hidden />
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

        <div
          className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center overflow-hidden px-3 sm:px-6 lg:items-center"
          style={{
            paddingTop: "calc(var(--chrome-top) + 0.35rem)",
            paddingBottom: "1.25rem",
          }}
        >
          {showCompany && current && (
            <div
              key={current.id}
              className={`d01-stack relative my-0 w-[min(92vw,40rem)] sm:w-[min(70vw,46rem)] lg:my-auto lg:w-[min(58vw,50rem)] ${stackClass} ${
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
                  <p className="d01-summary mt-3 text-sm leading-relaxed text-[#1d1d1f]/80 sm:text-lg sm:leading-8">
                    {current.summary}
                  </p>
                  <p className="d01-highlight mt-4 border-l-2 border-[#1d1d1f]/20 pl-3 font-display text-base font-semibold text-[#1d1d1f] sm:mt-5 sm:pl-4 sm:text-2xl">
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
                          <p className="d01-svc-detail mt-1 text-sm leading-relaxed text-[#6e6e73] sm:text-[15px]">
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
                      <div className="d01-contact-address">
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
                      className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#1d1d1f] px-4 py-2.5 text-sm font-semibold text-white transition duration-500 hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)] sm:mt-6 sm:px-5 sm:text-base"
                    >
                      Visit website
                      <span aria-hidden>→</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="d01-meter mt-5 h-0.5 overflow-hidden rounded-full bg-black/10">
                <div
                  ref={showMission ? undefined : barRef}
                  className="h-full bg-[#1d1d1f]"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}

          {showMission && (
            <div
              key="mission"
              className={`d01-stack d01-mission relative my-0 w-[min(92vw,40rem)] sm:w-[min(70vw,46rem)] lg:my-auto lg:w-[min(58vw,50rem)] ${stackClass} pointer-events-auto`}
            >
              <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.04),transparent_65%)] blur-2xl" />

              <div className="d01-panel mb-4 sm:mb-5">
                <div className="focus-card flex items-center gap-5 p-5 sm:gap-8 sm:p-8">
                  <div className="logo-glow flex h-20 w-20 shrink-0 items-center justify-center bg-white p-2.5 sm:h-28 sm:w-28">
                    <Image
                      src={group.logo}
                      alt={group.name}
                      width={160}
                      height={160}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6e6e73] sm:text-xs">
                      Mission
                    </p>
                    <h2 className="d01-mission-line mt-1 font-display text-2xl font-semibold leading-tight text-[#1d1d1f] sm:text-5xl">
                      {missionWords.map((word, i) => (
                        <span key={`${word}-${i}`}>{word} </span>
                      ))}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="d01-panel mb-4 sm:mb-5">
                <div className="focus-card p-5 sm:p-8">
                  <div className="flex items-center gap-2">
                    <span className="h-px w-6 bg-[#1d1d1f]/20 sm:w-8" />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6e6e73] sm:text-xs">
                      Woodlands Transport Group
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#1d1d1f]/80 sm:text-lg sm:leading-8">
                    {group.summary}
                  </p>
                  <p className="d01-highlight mt-4 border-l-2 border-[#1d1d1f]/20 pl-3 font-display text-base font-semibold text-[#1d1d1f] sm:mt-5 sm:pl-4 sm:text-2xl">
                    {group.highlight}
                  </p>
                </div>
              </div>

              <div className="d01-panel">
                <div className="focus-card p-5 sm:p-8">
                  <ul className="grid gap-4 sm:grid-cols-3">
                    {[
                      { t: "Since 1974", d: "A homegrown Singapore group." },
                      { t: "Eight brands", d: "One standard of care on the road." },
                      { t: "Still moving", d: "People, materials, and daily life." },
                    ].map((item) => (
                      <li key={item.t}>
                        <p className="font-display text-lg font-semibold text-[#1d1d1f]">
                          {item.t}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-[#6e6e73]">
                          {item.d}
                        </p>
                      </li>
                    ))}
                  </ul>
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
          )}
        </div>

        <aside
          className="d01-timeline absolute right-3 top-1/2 z-30 -translate-y-1/2 sm:right-5 md:right-7"
          aria-label="Timeline"
        >
          <div className="d01-timeline-inner relative flex flex-col items-center py-2">
            <div
              className="d01-timeline-line absolute top-3 bottom-3 left-1/2 w-px -translate-x-1/2 bg-black/10"
              aria-hidden
            />
            <div
              ref={fillRef}
              className="d01-timeline-fill absolute top-3 left-1/2 w-px -translate-x-1/2 bg-[#1d1d1f]/50"
              style={{ height: "0px" }}
              aria-hidden
            />
            {nodes.map((node, i) => {
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
                  className="relative z-10 flex h-10 w-10 items-center justify-center transition duration-300 hover:scale-125 sm:h-7 sm:w-7"
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
            <button
              type="button"
              title="Group mission"
              aria-label="Group mission"
              aria-current={idx === CHAPTERS ? "true" : undefined}
              onClick={() =>
                scrollToProgress(trackRef.current, holdStartProgress(CHAPTERS))
              }
              className="relative z-10 flex h-10 w-10 items-center justify-center transition duration-300 hover:scale-125 sm:h-7 sm:w-7"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  idx === CHAPTERS
                    ? "h-2.5 w-2.5 bg-[#1d1d1f] shadow-[0_0_0_3px_rgba(29,29,31,0.16)]"
                    : "h-1.5 w-1.5 bg-black/25 hover:bg-black/50"
                }`}
              />
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

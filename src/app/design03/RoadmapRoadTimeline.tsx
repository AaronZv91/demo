"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STORY_TIMELINE, StoryMilestone } from "./storyTimeline";

function renderMilestoneIcon(icon: StoryMilestone["icon"]) {
  switch (icon) {
    case "bus":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M8 6v6" />
          <path d="M16 6v6" />
          <path d="M2 12h20" />
          <path d="M6 18h12" />
          <path d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          <path d="M17 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
          <rect x="4" y="3" width="16" height="15" rx="3" />
        </svg>
      );
    case "truck":
    case "trailer":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="1" y="4" width="15" height="13" rx="2" />
          <polygon points="16 8 20 8 23 11 23 17 16 17 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );
    case "building":
    case "store":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M9 22v-4h6v4" />
          <path d="M8 6h.01" />
          <path d="M16 6h.01" />
          <path d="M8 10h.01" />
          <path d="M16 10h.01" />
          <path d="M8 14h.01" />
          <path d="M16 14h.01" />
        </svg>
      );
    case "plane":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3.5c-.5-.5-2.5 0-4 1.5L13.5 8.5 5.3 6.7c-.8-.2-1.6.3-1.8 1.1-.2.8.2 1.6 1 1.9l6.5 3.5-3 3-3.2-.8c-.5-.1-1 .1-1.3.5-.4.4-.4 1 0 1.4l2.5 2.5 2.5 2.5c.4.4 1 .4 1.4 0 .4-.3.6-.8.5-1.3l-.8-3.2 3-3 3.5 6.5c.3.8 1.1 1.2 1.9 1 .8-.2 1.3-1 1.1-1.8z" />
        </svg>
      );
    case "coin":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.8 9A2 2 0 0 0 13 8h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1-1.8-1" />
          <path d="M12 6v2m0 8v2" />
        </svg>
      );
    case "award":
    case "trophy":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34" />
          <path d="M6 4h12v7a6 6 0 0 1-12 0V4z" />
        </svg>
      );
    case "wrench":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <line x1="2" y1="20" x2="22" y2="20" />
        </svg>
      );
    case "ev":
    case "solar":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-5 h-5 text-amber-500">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
  }
}

export function RoadmapRoadTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [carPos, setCarPos] = useState({ x: 50, y: 0, angle: 90 });
  const [viewMode, setViewMode] = useState<"road" | "grid">("road");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const milestones = STORY_TIMELINE;
  const count = milestones.length;

  // Spacing per milestone item (height in pixels on canvas)
  const ITEM_HEIGHT = 290;
  const totalSvgHeight = count * ITEM_HEIGHT + 200;

  // Compute winding waypoints for SVG path
  const waypoints = useMemo(() => {
    return milestones.map((m, i) => {
      // Alternating S-curve: Left (38%), Right (62%)
      const side = i % 2 === 0 ? "left" : "right";
      const xPercent = i % 2 === 0 ? 38 : 62;
      const y = i * ITEM_HEIGHT + 140;
      return {
        ...m,
        index: i,
        side,
        xPercent,
        y,
      };
    });
  }, [milestones, ITEM_HEIGHT]);

  // Construct smooth bezier SVG path data
  const svgPathData = useMemo(() => {
    if (waypoints.length === 0) return "";
    let d = `M 50 0 C 50 50, ${waypoints[0].xPercent} 80, ${waypoints[0].xPercent} ${waypoints[0].y}`;
    let prevX = waypoints[0].xPercent;
    let prevY = waypoints[0].y;

    for (let i = 1; i < waypoints.length; i++) {
      const curX = waypoints[i].xPercent;
      const curY = waypoints[i].y;
      const midY = (prevY + curY) / 2;
      // Smooth S-curve transition between left and right sides
      d += ` C ${prevX} ${midY}, ${curX} ${midY}, ${curX} ${curY}`;
      prevX = curX;
      prevY = curY;
    }

    // End runout
    const lastY = waypoints[waypoints.length - 1].y;
    d += ` C ${prevX} ${lastY + 70}, 50 ${lastY + 110}, 50 ${lastY + 160}`;
    return d;
  }, [waypoints]);

  // Scroll listener to update car position and active milestone
  useEffect(() => {
    if (!mounted) return;
    let rafId: number;

    const updatePosition = () => {
      const el = containerRef.current;
      const path = pathRef.current;
      if (!el || !path) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress relative to the active viewport reading area (center-upper third)
      const viewportTrigger = windowHeight * 0.45;
      const totalDist = rect.height - viewportTrigger;
      const currentPassed = -rect.top + viewportTrigger;
      const rawProgress = Math.min(1, Math.max(0, currentPassed / (totalDist || 1)));

      setScrollProgress(rawProgress);

      const pathLength = path.getTotalLength();
      if (pathLength > 0) {
        const currentLength = rawProgress * pathLength;
        const point = path.getPointAtLength(currentLength);
        
        // Calculate tangent vector along the SVG path for smooth car orientation
        const delta = 4;
        const pAhead = path.getPointAtLength(Math.min(pathLength, currentLength + delta));
        const pBehind = path.getPointAtLength(Math.max(0, currentLength - delta));

        const dx = pAhead.x - pBehind.x;
        const dy = pAhead.y - pBehind.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        setCarPos({ x: point.x, y: point.y, angle });
      }

      // Identify the closest milestone
      const closestIdx = Math.min(
        count - 1,
        Math.max(0, Math.floor(rawProgress * count + 0.3)),
      );
      setActiveIdx(closestIdx);
    };

    let isDestroyed = false;

    const onScrollOrFrame = () => {
      if (isDestroyed) return;
      updatePosition();
      rafId = requestAnimationFrame(onScrollOrFrame);
    };

    rafId = requestAnimationFrame(onScrollOrFrame);
    window.addEventListener("resize", updatePosition, { passive: true });

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updatePosition);
    };
  }, [mounted, count]);

  const scrollToMilestone = (index: number) => {
    setActiveIdx(index);
    const targetEl = document.getElementById(`milestone-node-${index}`);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = scrollTop + rect.top - window.innerHeight / 2;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  const decades = useMemo(() => {
    const dMap: { [key: string]: number } = {};
    milestones.forEach((m, idx) => {
      if (dMap[m.decade] === undefined) {
        dMap[m.decade] = idx;
      }
    });
    return Object.entries(dMap).map(([decade, index]) => ({ decade, index }));
  }, [milestones]);

  const activeMilestone = milestones[activeIdx] || milestones[0];

  return (
    <div className="d03-roadmap-wrapper" ref={containerRef}>
      {/* Sticky Progress & Navigation HUD */}
      <div className="d03-road-hud">
        <div className="d03-road-hud-inner">
          <div className="d03-road-hud-header">
            <div className="flex items-center gap-3">
              <span className="d03-hud-pulse" style={{ backgroundColor: activeMilestone.color }} />
              <div>
                <span className="d03-hud-kicker">1974 ─── 50 Years Road ─── 2024</span>
                <h4 className="d03-hud-title">
                  Year {activeMilestone.year} · <span className="opacity-80">{activeMilestone.title}</span>
                </h4>
              </div>
            </div>

            <div className="d03-hud-actions">
              <div className="d03-hud-decades">
                {decades.map((d) => (
                  <button
                    key={d.decade}
                    type="button"
                    className={`d03-hud-decade-btn ${
                      activeMilestone.decade === d.decade ? "is-active" : ""
                    }`}
                    onClick={() => scrollToMilestone(d.index)}
                  >
                    {d.decade}
                  </button>
                ))}
              </div>

              <div className="d03-hud-steppers">
                <button
                  type="button"
                  disabled={activeIdx === 0}
                  onClick={() => scrollToMilestone(Math.max(0, activeIdx - 1))}
                  aria-label="Previous milestone"
                  className="d03-hud-nav-btn"
                >
                  ‹
                </button>
                <span className="d03-hud-counter">
                  {String(activeIdx + 1).padStart(2, "0")} / {count}
                </span>
                <button
                  type="button"
                  disabled={activeIdx === count - 1}
                  onClick={() => scrollToMilestone(Math.min(count - 1, activeIdx + 1))}
                  aria-label="Next milestone"
                  className="d03-hud-nav-btn"
                >
                  ›
                </button>
              </div>

              <div className="d03-hud-toggle">
                <button
                  type="button"
                  className={viewMode === "road" ? "is-active" : ""}
                  onClick={() => setViewMode("road")}
                  title="Winding Highway View"
                >
                  Roadmap
                </button>
                <button
                  type="button"
                  className={viewMode === "grid" ? "is-active" : ""}
                  onClick={() => setViewMode("grid")}
                  title="All Milestones Grid"
                >
                  Grid
                </button>
              </div>
            </div>
          </div>

          {/* Glowing road progress bar */}
          <div className="d03-hud-progress-bar">
            <div
              className="d03-hud-progress-fill"
              style={{
                width: `${Math.round(scrollProgress * 100)}%`,
                backgroundColor: activeMilestone.color,
              }}
            />
          </div>
        </div>
      </div>

      {viewMode === "road" ? (
        <div className="d03-road-track-canvas" style={{ minHeight: `${totalSvgHeight}px` }}>
          {/* SVG Road Network */}
          <svg
            className="d03-road-svg"
            viewBox={`0 0 100 ${totalSvgHeight}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e2229" />
                <stop offset="25%" stopColor="#2a2e37" />
                <stop offset="50%" stopColor="#323742" />
                <stop offset="75%" stopColor="#2a2e37" />
                <stop offset="100%" stopColor="#1e2229" />
              </linearGradient>

              <linearGradient id="roadGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>

              <filter id="roadShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.14" />
              </filter>
            </defs>

            {/* Road Outer Curb / Shoulder */}
            <path
              d={svgPathData}
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="9.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roadShadow)"
            />

            {/* Road Asphalt Base */}
            <path
              d={svgPathData}
              fill="none"
              stroke="url(#roadAsphalt)"
              strokeWidth="8.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Road White Edge Lines */}
            <path
              d={svgPathData}
              fill="none"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="7.6"
              strokeDasharray="4 6"
              strokeLinecap="butt"
              strokeLinejoin="round"
            />

            {/* Road Asphalt Surface */}
            <path
              d={svgPathData}
              fill="none"
              stroke="#22252e"
              strokeWidth="7.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center Dashed Driving Line */}
            <path
              d={svgPathData}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.55"
              strokeDasharray="1.6 2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="d03-road-center-dash"
            />

            {/* Animated Driven Path Highlight */}
            <path
              ref={pathRef}
              d={svgPathData}
              fill="none"
              stroke="url(#roadGlow)"
              strokeWidth="0.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="10000"
              strokeDashoffset={10000 - scrollProgress * 10000}
              style={{ opacity: 0.85 }}
            />
          </svg>

          {/* Animated Traveling Vehicle / Beacon */}
          <div
            className="d03-road-vehicle"
            style={{
              left: `${carPos.x}%`,
              top: `${carPos.y}px`,
              transform: `translate(-50%, -50%) rotate(${carPos.angle - 90}deg)`,
            }}
          >
            <div className="d03-vehicle-bus">
              <div
                className="d03-vehicle-headlights"
                style={{ borderLeftColor: `${activeMilestone.color}99` }}
              />
              <div className="d03-vehicle-body">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mascot-bus.png"
                  alt="Woodlands 50th Mascot"
                  className="d03-mascot-bus-img"
                  style={{
                    filter: `drop-shadow(0 0 2px #ffffff) drop-shadow(0 0 3px #ffffff) drop-shadow(0 0 8px ${activeMilestone.color}) drop-shadow(0 8px 18px rgba(0,0,0,0.5))`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Milestones along the road */}
          <div className="d03-road-nodes">
            {waypoints.map((m, idx) => {
              const isPassed = idx <= activeIdx;
              const isCurrent = idx === activeIdx;

              return (
                <div
                  key={m.id}
                  id={`milestone-node-${idx}`}
                  className={`d03-road-node ${m.side} ${isPassed ? "is-passed" : ""} ${
                    isCurrent ? "is-current" : ""
                  }`}
                  style={{ top: `${m.y}px` }}
                >
                  {/* Map Pin on the Asphalt */}
                  <div
                    className="d03-pin-anchor"
                    style={{ left: `${m.xPercent}%` }}
                    onClick={() => scrollToMilestone(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Milestone ${m.num} - Year ${m.year}: ${m.title}`}
                  >
                    <div className="d03-pin-svg-wrap">
                      <svg
                        className="d03-pin-svg"
                        viewBox="0 0 44 58"
                        width="46"
                        height="60"
                        style={{
                          transform: isCurrent ? "scale(1.15) translateY(-4px)" : "scale(1)",
                          transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        <defs>
                          <filter id={`pin-shadow-${idx}`} x="-30%" y="-20%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.32" />
                          </filter>
                          <linearGradient id={`pin-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={m.color} />
                            <stop offset="100%" stopColor="#0f172a" />
                          </linearGradient>
                        </defs>
                        {/* Pin Teardrop */}
                        <path
                          d="M22 2 C10.95 2 2 10.95 2 22 C2 35 22 56 22 56 C22 56 42 35 42 22 C42 10.95 33.05 2 22 2 Z"
                          fill={m.color}
                          filter={`url(#pin-shadow-${idx})`}
                          stroke="#ffffff"
                          strokeWidth="2"
                        />
                        {/* Inner Disc */}
                        <circle cx="22" cy="20" r="12" fill="#ffffff" />
                        {/* Milestone Number */}
                        <text
                          x="22"
                          y="24.5"
                          textAnchor="middle"
                          fill={m.color}
                          fontSize="12.5"
                          fontWeight="800"
                          fontFamily="system-ui, -apple-system, sans-serif"
                        >
                          {m.num}
                        </text>
                      </svg>
                    </div>
                    <div
                      className="d03-pin-year-badge"
                      style={{
                        backgroundColor: isCurrent ? m.color : "#ffffff",
                        color: isCurrent ? "#ffffff" : "#18181b",
                        borderColor: isCurrent ? m.color : "rgba(0,0,0,0.08)",
                      }}
                    >
                      {m.year}
                    </div>
                  </div>

                  {/* Connecting Line from Pin to Card */}
                  <div
                    className="d03-road-connector"
                    style={{
                      left: m.side === "left" ? "auto" : `${m.xPercent}%`,
                      right: m.side === "left" ? `${100 - m.xPercent}%` : "auto",
                      borderColor: isCurrent ? m.color : "rgba(100, 116, 139, 0.25)",
                    }}
                  />

                  {/* Milestone Description Card */}
                  <div
                    className="d03-road-card"
                    style={{
                      borderColor: isCurrent ? m.color : "rgba(16, 16, 20, 0.08)",
                      boxShadow: isCurrent
                        ? `0 20px 48px -12px ${m.color}25, 0 0 0 1px ${m.color}`
                        : undefined,
                    }}
                    onClick={() => scrollToMilestone(idx)}
                  >
                    <div className="d03-card-header">
                      <div className="d03-card-meta">
                        <span
                          className="d03-card-category"
                          style={{ color: m.color, backgroundColor: m.badgeBg }}
                        >
                          {m.category}
                        </span>
                        <span className="d03-card-decade">{m.decade}</span>
                      </div>
                      <div className="d03-card-icon" style={{ color: m.color }}>
                        {renderMilestoneIcon(m.icon)}
                      </div>
                    </div>

                    <div className="d03-card-title-row">
                      <span className="d03-card-year-title" style={{ color: isCurrent ? m.color : undefined }}>
                        {m.year}
                      </span>
                      <h3 className="d03-card-heading">{m.title}</h3>
                    </div>

                    <ul className="d03-card-point-list">
                      {m.points.map((pt, pIdx) => (
                        <li key={pIdx} className="d03-card-point-item">
                          <span
                            className="d03-point-bullet"
                            style={{ backgroundColor: m.color }}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Overview Grid View */
        <div className="d03-grid-overview">
          <div className="d03-timeline-grid">
            {milestones.map((item, idx) => (
              <article
                key={item.id}
                className={`d03-timeline-card ${idx === activeIdx ? "is-highlighted" : ""}`}
                onClick={() => {
                  setActiveIdx(idx);
                  setViewMode("road");
                  setTimeout(() => scrollToMilestone(idx), 100);
                }}
                role="button"
                tabIndex={0}
              >
                <div className="flex items-center justify-between">
                  <div className="d03-card-year">
                    <span style={{ color: item.color }}>{item.year}</span>
                    <small>{item.decade}</small>
                  </div>
                  <span
                    className="d03-card-category text-[11px] px-2 py-0.5 rounded-full"
                    style={{ color: item.color, backgroundColor: item.badgeBg }}
                  >
                    #{item.num} · {item.category}
                  </span>
                </div>

                <h4 className="font-semibold text-[15px] text-zinc-900 mt-1">{item.title}</h4>

                <ul className="d03-card-points">
                  {item.points.map((p, pIdx) => (
                    <li key={pIdx}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

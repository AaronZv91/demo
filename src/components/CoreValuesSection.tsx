"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { CORE_VALUES_DATA } from "../data/coreValues";

// Interactive Vercel-style interactive lighting for the top EPIC hero character badges with 2-way card sync
function InteractiveEpicHero({
  activeIdx,
  onHoverValue,
}: {
  activeIdx: number | null;
  onHoverValue?: (idx: number | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [activeLetter, setActiveLetter] = useState<number | null>(null);

  const letters = [
    { letter: "E", color: "#ef4444", bgLight: "rgba(239, 68, 68, 0.12)", index: 0, glow: "rgba(239, 68, 68, 0.45)" },
    { letter: "P", color: "#f97316", bgLight: "rgba(249, 115, 22, 0.12)", index: 1, glow: "rgba(249, 115, 22, 0.45)" },
    { letter: "I", color: "#eab308", bgLight: "rgba(234, 179, 8, 0.14)", index: 2, glow: "rgba(234, 179, 8, 0.45)" },
    { letter: "C", color: "#22c55e", bgLight: "rgba(34, 197, 94, 0.12)", index: 3, glow: "rgba(34, 197, 94, 0.45)" },
  ];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
    setActiveLetter(null);
    if (onHoverValue) onHoverValue(null);
  }, [onHoverValue]);

  // Current active letter index is either the directly hovered letter or the hovered card from below
  const currentActiveIdx = activeLetter !== null ? activeLetter : activeIdx;
  const activeColor = currentActiveIdx !== null ? letters[currentActiveIdx].color : "#f97316";

  return (
    <span
      ref={containerRef}
      className="epic-hero-interactive-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Vercel-like dynamic spotlight aura behind letters */}
      {mousePos && (
        <span
          className="epic-hero-spotlight"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            background: `radial-gradient(circle 85px at center, ${activeColor}55 0%, ${activeColor}15 45%, transparent 75%)`,
          }}
        />
      )}

      {letters.map((item, idx) => {
        const isCurrentActive = currentActiveIdx === idx;
        return (
          <span
            key={item.letter}
            className={`epic-hero-char epic-char-${item.letter.toLowerCase()} ${
              isCurrentActive ? "is-hovered" : ""
            }`}
            style={{
              color: item.color,
              textShadow: isCurrentActive
                ? `0 0 28px ${item.glow}, 0 0 12px ${item.color}, 0 4px 14px rgba(0,0,0,0.18)`
                : `0 0 10px ${item.color}25`,
            }}
            onMouseEnter={() => {
              setActiveLetter(idx);
              if (onHoverValue) onHoverValue(idx);
            }}
          >
            {item.letter}
            {/* Ambient light ring on hover or card hover */}
            <span
              className="epic-char-halo"
              style={{
                backgroundColor: item.color,
                opacity: isCurrentActive ? 0.42 : 0,
              }}
            />
          </span>
        );
      })}
    </span>
  );
}

export function CoreValuesSection({ variant = "d03" }: { variant?: "d01" | "d02" | "d03" }) {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const data = CORE_VALUES_DATA;

  return (
    <section className={`core-values-section core-values-${variant}`} id="values">
      <div className={variant === "d03" ? "d03-wrap" : variant === "d02" ? "d02-wrap" : "mx-auto max-w-6xl px-5 sm:px-8"}>
        {/* Header Title */}
        <div className="values-header">
          <p className="values-kicker">Guiding Principles · Our Foundation</p>
          <h2 className="values-heading">
            Driven by our{" "}
            <InteractiveEpicHero
              activeIdx={activeTab}
              onHoverValue={(idx) => setActiveTab(idx)}
            />{" "}
            core values.
          </h2>
          <p className="values-subheading">
            For over fifty years, our purpose and day-to-day decisions have been anchored by a steadfast commitment to people, ethical standards, and continuous progress.
          </p>
        </div>

        {/* Vision & Mission Row */}
        <div className="vision-mission-grid">
          <div className="vm-card vm-vision">
            <div className="vm-tag-row">
              <span className="vm-tag text-rose-600 bg-rose-50 border-rose-200">{data.vision.kicker}</span>
              <span className="vm-icon">✦</span>
            </div>
            <p className="vm-text">{data.vision.text}</p>
          </div>

          <div className="vm-card vm-mission">
            <div className="vm-tag-row">
              <span className="vm-tag text-amber-700 bg-amber-50 border-amber-200">{data.mission.kicker}</span>
              <span className="vm-icon">✦</span>
            </div>
            <p className="vm-text">{data.mission.text}</p>
          </div>
        </div>

        {/* 4 EPIC Values Grid (Restored to clean classic format) */}
        <div className="epic-cards-grid">
          {data.values.map((v, i) => {
            const isHovered = activeTab === i;
            return (
              <div
                key={v.letter}
                className={`epic-card ${isHovered ? "is-focused" : ""}`}
                style={{
                  borderColor: isHovered ? v.color : undefined,
                  boxShadow: isHovered ? `0 20px 40px -12px ${v.color}25, 0 0 0 1px ${v.color}` : undefined,
                }}
                onMouseEnter={() => setActiveTab(i)}
                onMouseLeave={() => setActiveTab(null)}
              >
                <div className="epic-card-top">
                  <div
                    className="epic-letter-badge"
                    style={{ backgroundColor: v.badgeBg, color: v.color }}
                  >
                    <span>{v.letter}</span>
                  </div>
                  <span className="epic-card-step">0{i + 1}</span>
                </div>

                <div className="epic-card-body">
                  <h3 className="epic-card-title" style={{ color: isHovered ? v.color : undefined }}>
                    {v.title}
                  </h3>
                  <p className="epic-card-tagline">{v.tagline}</p>
                  <p className="epic-card-desc">{v.description}</p>
                </div>

                <div className="epic-card-bar" style={{ backgroundColor: v.color }} />
              </div>
            );
          })}
        </div>

        {/* Bottom Sustainability Banner */}
        <div className="epic-motto-banner">
          <div className="epic-motto-content">
            <div className="epic-motto-badge">
              <span className="epic-badge-dot" />
              <span>50 Years Forward</span>
            </div>
            <p className="epic-motto-quote">
              “{data.motto}”
            </p>
          </div>
          <div className="epic-motto-logo">
            <Image
              src="/brands/group.png"
              alt="Woodlands Group"
              width={170}
              height={60}
              className="h-11 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

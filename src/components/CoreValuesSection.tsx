"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CORE_VALUES_DATA } from "../data/coreValues";

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
            Driven by our <span className="epic-text-gradient">EPIC</span> core values.
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

        {/* 4 EPIC Values Grid */}
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

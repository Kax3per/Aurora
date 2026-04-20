import React, { useState } from "react";
import Cocpit from "../assets/kokpit.avif";
import AiRoad from "../assets/airoad.avif";
import ElectricPower from "../assets/electricpower.avif";
import Safe from "../assets/safe.avif";

/**
 * FeaturesSection Component
 * --------------------------
 * Grid-based feature showcase highlighting key product capabilities.
 *
 * Core Features:
 * - Interactive cards with hover + click states
 * - Expandable descriptions (toggle behavior)
 * - Visual emphasis using overlays, scale, and glow effects
 *
 * UX Concept:
 * Encourages exploration by:
 * - Showing minimal info initially
 * - Revealing details on interaction (hover / click)
 */
export default function FeaturesSection() {
  /** Index of currently active (expanded) feature */
  const [active, setActive] = useState(null);

  /**
   * Feature definitions
   * --------------------
   * In production, this would typically come from API / CMS.
   */
  const features = [
    {
      title: "INTELIGENTNA JAZDA",
      desc: "Systemy AI analizujące drogę w czasie rzeczywistym i dostosowujące parametry jazdy.",
      img: AiRoad,
    },
    {
      title: "CYFROWE WNĘTRZE",
      desc: "Minimalistyczny kokpit sterowany głosem i dotykiem.",
      img: Cocpit,
    },
    {
      title: "ELEKTRYCZNA MOC",
      desc: "Natychmiastowy moment obrotowy i maksymalna wydajność.",
      img: ElectricPower,
    },
    {
      title: "BEZPIECZEŃSTWO 360°",
      desc: "Zaawansowane systemy ochrony kierowcy i pasażerów.",
      img: Safe,
    },
  ];

  /**
   * Handles card toggle interaction
   *
   * @param {number} index
   */
  const handleToggle = (index) => {
    setActive((prev) => (prev === index ? null : index));
  };

  return (
    /* ================= FEATURES SECTION ================= */
    <section className="bg-black text-white py-24 px-6 xl:px-16">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-20">
        <p className="text-[12px] tracking-[0.5em] text-white/40 mb-6">
          TECHNOLOGIA
        </p>

        <h2 className="text-[32px] sm:text-[48px] xl:text-[64px] tracking-[0.25em] font-light">
          DOŚWIADCZENIE PRZYSZŁOŚCI
        </h2>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {features.map((feature, i) => {
          const isActive = active === i;

          return (
            <FeatureCard
              key={feature.title}
              data={feature}
              active={isActive}
              onClick={() => handleToggle(i)}
            />
          );
        })}

      </div>
    </section>
  );
}

/**
 * FeatureCard Component
 * ----------------------
 * Interactive card representing a single feature.
 *
 * Responsibilities:
 * - Displays background image
 * - Handles hover and active states
 * - Reveals description on interaction
 */
function FeatureCard({ data, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative h-80 overflow-hidden border border-white/10 cursor-pointer transition duration-500"
    >

      {/* BACKGROUND IMAGE */}
      <img
        src={data.img}
        alt={data.title}
        className={`absolute inset-0 w-full h-full object-cover transition duration-700 ${
          active ? "scale-110" : "group-hover:scale-110"
        }`}
      />

      {/* OVERLAY */}
      <div
        className={`absolute inset-0 transition duration-500 ${
          active
            ? "bg-black/50"
            : "bg-black/70 group-hover:bg-black/50"
        }`}
      />

      {/* CONTENT */}
      <div className="relative z-10 p-6 flex flex-col justify-end h-full">

        {/* TITLE */}
        <h3 className="text-[14px] tracking-[0.3em] mb-3">
          {data.title}
        </h3>

        {/* DESCRIPTION */}
        <p
          className={`text-white/60 text-sm leading-relaxed transition duration-500 ${
            active
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          {data.desc}
        </p>

      </div>

      {/* GLOW EFFECT */}
      <div
        className={`absolute inset-0 pointer-events-none transition duration-500 ${
          active
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
        style={{
          boxShadow: "inset 0 0 60px rgba(255,255,255,0.1)",
        }}
      />
    </div>
  );
}
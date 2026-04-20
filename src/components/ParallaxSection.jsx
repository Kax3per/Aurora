import React, { useEffect, useRef, useState } from "react";

import bg1 from "../assets/parallax3.avif";
import bg2 from "../assets/parallax5.avif";
import bg3 from "../assets/parallax7.avif";
import bg4 from "../assets/parallax9.avif";
import bg5 from "../assets/parallaxX.avif";

/**
 * Slides data
 * ------------
 * Defines content for each scroll step:
 * - background image
 * - textual content (title, subtitle, description)
 * - stats used in animated counters
 */
const slides = [
  {
    bg: bg1,
    title: "AURORA 3",
    subtitle: "URBAN DOMINANCE",
    desc: "Aurora 3 to nowa generacja SUV-a zaprojektowana z myślą o dynamicznym stylu życia w mieście i poza nim...",
    stats: { power: 700, range: 600, accel: 42 },
  },
  {
    bg: bg2,
    title: "AURORA 5",
    subtitle: "PURE BALANCE",
    desc: "Aurora 5 została stworzona jako idealna równowaga pomiędzy osiągami a codzienną funkcjonalnością...",
    stats: { power: 520, range: 540, accel: 48 },
  },
  {
    bg: bg3,
    title: "AURORA 7",
    subtitle: "PERFORMANCE REDEFINED",
    desc: "Aurora 7 redefiniuje pojęcie osiągów w segmencie sedanów...",
    stats: { power: 780, range: 620, accel: 36 },
  },
  {
    bg: bg4,
    title: "AURORA 9",
    subtitle: "LIMITLESS SPACE",
    desc: "Aurora 9 to definicja podróżowania bez ograniczeń...",
    stats: { power: 640, range: 720, accel: 45 },
  },
  {
    bg: bg5,
    title: "AURORA X",
    subtitle: "OPEN FREEDOM",
    desc: "Aurora X to czysta esencja wolności i emocji...",
    stats: { power: 820, range: 500, accel: 35 },
  },
];

export default function CinematicScroll() {
  /**
   * Reference to section element
   * Used for scroll progress calculations
   */
  const sectionRef = useRef(null);

  /**
   * Current slide index
   */
  const [index, setIndex] = useState(0);

  /**
   * Previous slide index (used for background transition)
   */
  const [prevIndex, setPrevIndex] = useState(0);

  /**
   * Scroll direction
   * Determines animation direction (up/down)
   */
  const [direction, setDirection] = useState("down");

  /**
   * Animated stats values
   */
  const [power, setPower] = useState(0);
  const [range, setRange] = useState(0);
  const [accel, setAccel] = useState(0);

  // 🔥 SCROLL
  /**
   * Scroll handler
   * ---------------
   * Calculates scroll progress relative to section height
   * and maps it to slide index
   */
  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      /**
       * Progress normalized between 0 and 1
       */
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height - windowHeight))
      );

      /**
       * Converts progress into slide index
       */
      const newIndex = Math.min(
        slides.length - 1,
        Math.floor(progress * slides.length)
      );

      /**
       * Updates state only when index changes
       */
      if (newIndex !== index) {
        setDirection(newIndex > index ? "down" : "up");
        setPrevIndex(index);
        setIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);

    /**
     * Cleanup listener on unmount
     */
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  // 🔥 COUNTER
  /**
   * Counter animation effect
   * -------------------------
   * Animates stats values when slide changes
   */
  useEffect(() => {
    const target = slides[index].stats;

    /**
     * Generic counter animation function
     */
    const animate = (setter, value, duration = 1200) => {
      let start = 0;

      const step = () => {
        /**
         * Increment value per frame
         */
        start += value / (duration / 16);

        if (start < value) {
          setter(Math.floor(start));
          requestAnimationFrame(step);
        } else {
          setter(value);
        }
      };

      step();
    };

    /**
     * Trigger animations for all stats
     */
    animate(setPower, target.power);
    animate(setRange, target.range);
    animate(setAccel, target.accel);
  }, [index]);

  return (
    /**
     * Section height extended (300vh)
     * Enables multi-step scroll storytelling
     */
    <section ref={sectionRef} className="relative h-[300vh] bg-black">

      {/* STICKY */}
      {/* Sticky container keeps content fixed during scroll */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BACKGROUND */}
        {/* Previous background fades out */}
        <img
          key={prevIndex}
          src={slides[prevIndex].bg}
          className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fadeOut"
        />

        {/* Current background fades in */}
        <img
          key={index}
          src={slides[index].bg}
          className="absolute inset-0 w-full h-full object-cover opacity-100 animate-fadeIn"
        />

        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* 🔥 CONTENT */}
        {/* Main content container (responsive positioning) */}
        <div
          className="
          absolute z-20
          
          /* MOBILE + TABLET */
          top-[10%] left-1/2 -translate-x-1/2 w-[90%] text-center
          
          /* DESKTOP */
          xl:top-[12%] xl:left-[8%] xl:translate-x-0 xl:w-auto xl:text-left xl:max-w-130
        "
        >

          {/* MODEL LABEL */}
          <p className="text-[10px] sm:text-[12px] tracking-[0.5em] text-white/40 mb-3 sm:mb-4">
            MODEL
          </p>

          {/* TITLE */}
          {/* Animated depending on scroll direction */}
          <h1
            key={index + "-title"}
            className={`
              font-semibold text-white tracking-[0.15em] mb-3 sm:mb-4
              text-[28px] sm:text-[42px] md:text-[52px] xl:text-[82px]
              ${direction === "down" ? "animate-slideUp" : "animate-slideDown"}
            `}
            style={{
              textShadow: "0 0 25px rgba(255,255,255,0.25)",
            }}
          >
            {slides[index].title}
          </h1>

          {/* SUBTITLE */}
          <h2 className="text-[11px] sm:text-[13px] md:text-[14px] tracking-[0.4em] text-white/60 mb-4 sm:mb-6">
            {slides[index].subtitle}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-white/70 text-[13px] sm:text-[15px] md:text-[16px] leading-relaxed mb-6 sm:mb-10">
            {slides[index].desc}
          </p>

          {/* 🔥 STATS */}
          {/* Animated numeric indicators */}
          <div className="
            flex justify-center xl:justify-start
            gap-6 sm:gap-10
          ">

            {/* POWER */}
            <div>
              <p className="text-[20px] text-white sm:text-[24px] xl:text-[28px] font-light">
                {power}+
              </p>
              <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.3em]">
                KM
              </p>
            </div>

            {/* RANGE */}
            <div>
              <p className="text-[20px] text-white sm:text-[24px] xl:text-[28px] font-light">
                {range} KM
              </p>
              <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.3em]">
                ZASIĘG
              </p>
            </div>

            {/* ACCELERATION */}
            <div>
              <p className="text-[20px] text-white sm:text-[24px] xl:text-[28px] font-light">
                {(accel / 10).toFixed(1)}s
              </p>
              <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.3em]">
                0–100
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* ANIMATIONS */}
      {/* Keyframe animations used for transitions */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(80px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-80px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease forwards;
        }

        .animate-fadeOut {
          animation: fadeOut 0.8s ease forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease forwards;
        }
      `}</style>
    </section>
  );
}
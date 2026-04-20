import React, { useEffect, useRef, useState } from "react";
import leftCar from "../assets/electric1.avif";
import rightCar from "../assets/electric2.avif";

/**
 * ElectricSection Component
 * --------------------------
 * Showcase section highlighting electric technology features.
 *
 * Core Features:
 * - Scroll-triggered animations (IntersectionObserver)
 * - Animated counters (power, range, acceleration)
 * - Parallax effect (desktop only)
 * - Fully responsive layout (mobile vs desktop split)
 *
 * UX Concept:
 * Combines storytelling (text + imagery) with dynamic metrics
 * to create a premium, automotive-style presentation.
 */
export default function ElectricSection() {
  /** Section reference for visibility tracking */
  const sectionRef = useRef(null);

  /** Reference for parallax animation */
  const parallaxRef = useRef(null);

  /** Controls animation start */
  const [start, setStart] = useState(false);

  /** Animated stats */
  const [power, setPower] = useState(0);
  const [range, setRange] = useState(0);
  const [acc, setAcc] = useState(0);

  /**
   * Effect: Intersection Observer
   * --------------------------------
   * Triggers animations when section becomes visible.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStart(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  /**
   * Effect: Counter animation engine
   * --------------------------------
   * Animates numeric values using requestAnimationFrame.
   */
  useEffect(() => {
    if (!start) return;

    /**
     * Generic animation function for numeric values
     *
     * @param {Function} setter - React state setter
     * @param {number} target - Target value
     * @param {number} duration - Animation duration (ms)
     */
    const animate = (setter, target, duration = 1200) => {
      let startTime = null;

      const step = (time) => {
        if (!startTime) startTime = time;

        const progress = time - startTime;

        const value = Math.min(
          target,
          Math.floor((progress / duration) * target)
        );

        setter(value);

        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    /** Start animations */
    animate(setPower, 700);
    animate(setRange, 600);
    animate(setAcc, 42, 1400);
  }, [start]);

  /**
   * Effect: Parallax system (desktop only)
   * --------------------------------------
   * Adds subtle depth to left image based on scroll position.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || window.innerWidth < 1280) return;

      const rect = sectionRef.current.getBoundingClientRect();

      /**
       * Offset scaled down for subtle motion
       */
      const offset = rect.top * 0.15;

      parallaxRef.current.style.transform =
        `translateY(${offset}px) scale(1.03)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /* ================= ELECTRIC SECTION ================= */
    <section
      ref={sectionRef}
      className="bg-black text-white w-full py-20 xl:py-28 overflow-hidden"
    >

      {/* ================= HEADER ================= */}
      <div
        className={`text-center mb-14 xl:mb-20 px-6 ${
          start ? "animate-fade" : "opacity-0"
        }`}
      >
        <p className="text-[10px] sm:text-[12px] tracking-[0.5em] text-white/40 mb-4 sm:mb-6">
          ELEKTRYFIKACJA
        </p>

        <h2 className="text-[28px] sm:text-[42px] xl:text-[64px] tracking-[0.25em] font-light">
          PRZYSZŁOŚĆ JEST ELEKTRYCZNA
        </h2>

        {/* DECORATIVE DIVIDER */}
        <div className="w-16 xl:w-24 h-px bg-white/20 mx-auto mt-6 xl:mt-8" />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative w-full xl:h-155">

        {/* ================= MOBILE / TABLET ================= */}
        <div className="xl:hidden px-6 space-y-10">

          {/* IMAGE */}
          <div className="relative h-65 sm:h-80 overflow-hidden">
            <img
              src={leftCar}
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/60 to-black" />
          </div>

          {/* TEXT BLOCK */}
          <div className={`${start ? "animate-fade" : "opacity-0"} max-w-md`}>
            <h3 className="text-[22px] sm:text-[26px] tracking-[0.25em] mb-4">
              CZYSTA MOC <br /> ZERO KOMPROMISÓW
            </h3>

            <p className="text-white/60 text-sm leading-relaxed">
              Nasze napędy elektryczne łączą natychmiastową moc z najwyższą wydajnością.
              Bez emisji. Bez hałasu. Bez kompromisów.
            </p>

            <button className="mt-6 border border-white/40 px-6 py-2 text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition">
              DOWIEDZ SIĘ WIĘCEJ →
            </button>
          </div>

          {/* STATS */}
          <div className="flex justify-between text-center">
            <Stat value={`${power}+`} label="KM" />
            <Stat value={`${range} KM`} label="ZASIĘG" />
            <Stat value={`${(acc / 10).toFixed(1)}s`} label="0–100" />
          </div>

          {/* SECOND IMAGE */}
          <img src={rightCar} className="w-full object-contain opacity-80" />
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden xl:block">

          {/* LEFT IMAGE (PARALLAX) */}
          <div
            ref={parallaxRef}
            className="absolute inset-y-0 left-[-5%] w-[55%] transition-transform duration-300 will-change-transform"
          >
            <img
              src={leftCar}
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/20 via-black/60 to-black" />
          </div>

          {/* TEXT */}
          <div className="absolute top-[30%] left-[35%] -translate-y-1/2 z-20 max-w-95 pr-10">

            <h3 className={`${start ? "animate-fade delay-100" : "opacity-0"} text-[32px] tracking-[0.25em] mb-6`}>
              CZYSTA MOC <br /> ZERO KOMPROMISÓW
            </h3>

            <p className={`${start ? "animate-fade delay-200" : "opacity-0"} text-white/60`}>
              Nasze napędy elektryczne łączą natychmiastową moc z najwyższą wydajnością.
            </p>

            <button className={`${start ? "animate-fade delay-300" : "opacity-0"} mt-8 border border-white/40 px-7 py-3 text-[12px] tracking-[0.35em] hover:bg-white hover:text-black transition`}>
              DOWIEDZ SIĘ WIĘCEJ →
            </button>
          </div>

          {/* RIGHT SIDE (STATS + IMAGE) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] px-10">

            <div className="flex justify-between mb-12">
              <Stat value={`${power}+`} label="KM MOCY" />
              <Stat value={`${range} KM`} label="ZASIĘG" />
              <Stat value={`${(acc / 10).toFixed(1)}s`} label="0–100" />
            </div>

            <img
              src={rightCar}
              className={`w-full object-contain opacity-80 ${start ? "animate-fade delay-300" : "opacity-0"}`}
            />
          </div>

          {/* DIVIDER LINE */}
          <div className="absolute left-[55%] top-0 h-full w-px bg-white/10" />
        </div>

      </div>

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateY(40px);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .animate-fade {
          animation: fade 1s ease forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </section>
  );
}

/**
 * Stat Component
 * ----------------
 * Reusable UI element for displaying metric + label.
 */
function Stat({ value, label }) {
  return (
    <div>
      <p className="text-[22px] xl:text-[32px] font-light">{value}</p>
      <p className="text-white/40 text-[10px] xl:text-[11px] tracking-[0.3em]">
        {label}
      </p>
    </div>
  );
}
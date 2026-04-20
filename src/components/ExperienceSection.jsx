import React, { useEffect, useRef, useState } from "react";
import video from "../assets/interior.mp4";

/**
 * ExperienceVideo Component
 * --------------------------
 * Fullscreen video section showcasing product experience.
 *
 * Core Features:
 * - Background video with parallax effect
 * - Scroll-triggered content animations
 * - Layered overlays for readability (dark + gradient)
 *
 * UX Concept:
 * Combines cinematic video with minimal typography
 * to create an immersive, premium storytelling block.
 */
export default function ExperienceVideo() {
  /** Section reference (used for observer + parallax calculations) */
  const sectionRef = useRef(null);

  /** Video reference for transform manipulation */
  const videoRef = useRef(null);

  /** Controls text animation visibility */
  const [visible, setVisible] = useState(false);

  /**
   * Effect: Intersection Observer
   * --------------------------------
   * Triggers fade-in animations when section enters viewport.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  /**
   * Effect: Parallax system
   * ------------------------
   * Applies vertical offset to video based on scroll position.
   *
   * Note:
   * Subtle scaling prevents empty edges during movement.
   */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current || !videoRef.current) return;

      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = sectionRef.current.getBoundingClientRect();

          /** Reduced multiplier for smooth cinematic motion */
          const offset = rect.top * 0.2;

          videoRef.current.style.transform =
            `translateY(${offset}px) scale(1.1)`;

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    /* ================= VIDEO SECTION ================= */
    <section
      ref={sectionRef}
      className="relative h-[90vh] xl:h-screen w-full overflow-hidden bg-black text-white"
    >

      {/* ================= VIDEO BACKGROUND ================= */}
      <video
        ref={videoRef}
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 will-change-transform"
      />

      {/* ================= OVERLAYS ================= */}

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 h-full flex items-center px-6 sm:px-10 xl:px-20">

        <div className="max-w-xl">

          {/* SECTION LABEL */}
          <p className={`text-[11px] tracking-[0.5em] text-white/40 mb-6 ${
            visible ? "animate-fade delay-100" : "opacity-0"
          }`}>
            EXPERIENCE
          </p>

          {/* HEADLINE */}
          <h2
            className={`text-[32px] sm:text-[48px] xl:text-[72px] font-light tracking-[0.2em] mb-6 ${
              visible ? "animate-fade delay-200" : "opacity-0"
            }`}
            style={{ textShadow: "0 0 25px rgba(255,255,255,0.2)" }}
          >
            WNĘTRZE NOWEJ ERY
          </h2>

          {/* DESCRIPTION */}
          <p className={`text-white/70 leading-relaxed mb-8 ${
            visible ? "animate-fade delay-300" : "opacity-0"
          }`}>
            Aurora redefiniuje doświadczenie jazdy poprzez połączenie luksusu,
            minimalizmu i zaawansowanej technologii. Każdy detal wnętrza
            został zaprojektowany, aby zapewnić maksymalny komfort,
            intuicyjną obsługę i absolutną ciszę.
          </p>

          {/* CTA */}
          <button className={`border border-white/40 px-8 py-3 text-[12px] tracking-[0.3em] hover:bg-white hover:text-black transition ${
            visible ? "animate-fade delay-400" : "opacity-0"
          }`}>
            ODKRYJ WNĘTRZE →
          </button>

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
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

    </section>
  );
}
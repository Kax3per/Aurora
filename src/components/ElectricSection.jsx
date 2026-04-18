import React, { useEffect, useRef, useState } from "react";
import leftCar from "../assets/electric1.png";
import rightCar from "../assets/electric2.png";

export default function ElectricSection() {
  const sectionRef = useRef(null);
  const parallaxRef = useRef(null);

  const [start, setStart] = useState(false);

  const [power, setPower] = useState(0);
  const [range, setRange] = useState(0);
  const [acc, setAcc] = useState(0);

  // 🔥 OBSERVER
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

  // 🔥 COUNTER
  useEffect(() => {
    if (!start) return;

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
        if (progress < duration) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    animate(setPower, 700);
    animate(setRange, 600);
    animate(setAcc, 42, 1400);
  }, [start]);

  // 🔥 PARALLAX (only desktop)
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || window.innerWidth < 1280) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const offset = rect.top * 0.15;

      parallaxRef.current.style.transform = `translateY(${offset}px) scale(1.03)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white w-full py-20 xl:py-28 overflow-hidden"
    >
      {/* HEADER */}
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

        <div className="w-16 xl:w-24 h-[1px] bg-white/20 mx-auto mt-6 xl:mt-8" />
      </div>

      {/* MAIN */}
      <div className="relative w-full xl:h-[620px]">

        {/* 🔥 MOBILE / TABLET */}
        <div className="xl:hidden px-6 space-y-10">

          {/* IMAGE */}
          <div className="relative h-[260px] sm:h-[320px] overflow-hidden">
            <img
              src={leftCar}
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/60 to-black" />
          </div>

          {/* TEXT */}
          <div className={`${start ? "animate-fade" : "opacity-0"} max-w-md`}>
            <h3 className="text-[22px] sm:text-[26px] tracking-[0.25em] mb-4">
              CZYSTA MOC <br /> ZERO KOMPROMISÓW
            </h3>

            <p className="text-white/60 text-sm leading-relaxed">
              Nasze napędy elektryczne łączą natychmiastową moc z najwyższą
              wydajnością. Bez emisji. Bez hałasu. Bez kompromisów.
            </p>

            <button className="mt-6 border border-white/40 px-6 py-2 text-[11px] tracking-[0.3em] hover:bg-white hover:text-black transition">
              DOWIEDZ SIĘ WIĘCEJ →
            </button>
          </div>

          {/* STATS */}
          <div className="flex justify-between text-center">
            <div>
              <p className="text-[22px]">{power}+</p>
              <p className="text-white/40 text-[10px] tracking-[0.3em]">KM</p>
            </div>

            <div>
              <p className="text-[22px]">{range} KM</p>
              <p className="text-white/40 text-[10px] tracking-[0.3em]">
                ZASIĘG
              </p>
            </div>

            <div>
              <p className="text-[22px]">
                {(acc / 10).toFixed(1)}s
              </p>
              <p className="text-white/40 text-[10px] tracking-[0.3em]">
                0–100
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src={rightCar}
            className="w-full object-contain opacity-80"
          />
        </div>

        {/* 🔥 DESKTOP */}
        <div className="hidden xl:block">

          {/* LEFT IMAGE */}
          <div
            ref={parallaxRef}
            className="absolute inset-y-0 left-[-5%] w-[55%] transition-transform duration-300"
          >
            <img
              src={leftCar}
              className="w-full h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/60 to-black" />
          </div>

          {/* TEXT */}
          <div className="absolute top-[30%] left-[35%] -translate-y-1/2 z-20 max-w-[380px] pr-10">

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

          {/* RIGHT */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[45%] px-10">

            <div className="flex justify-between mb-12">

              <div>
                <p className="text-[32px] font-light">{power}+</p>
                <p className="text-white/40 text-[11px] tracking-[0.3em]">KM MOCY</p>
              </div>

              <div>
                <p className="text-[32px] font-light">{range} KM</p>
                <p className="text-white/40 text-[11px] tracking-[0.3em]">ZASIĘG</p>
              </div>

              <div>
                <p className="text-[32px] font-light">
                  {(acc / 10).toFixed(1)}s
                </p>
                <p className="text-white/40 text-[11px] tracking-[0.3em]">0–100</p>
              </div>

            </div>

            <img
              src={rightCar}
              className={`w-full object-contain opacity-80 ${start ? "animate-fade delay-300" : "opacity-0"}`}
            />
          </div>

          {/* LINE */}
          <div className="absolute left-[55%] top-0 h-full w-[1px] bg-white/10" />
        </div>

      </div>

      {/* 🔥 ANIMATIONS */}
      <style jsx>{`
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
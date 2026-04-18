import React, { useEffect, useRef, useState } from "react";
import translations from "../translations";
import background from "../assets/background.png";
import aurora3 from "../assets/aurora3.png";
import aurora5 from "../assets/aurora5.png";
import aurora7 from "../assets/aurora7.png";
import aurora9 from "../assets/aurora9.png";
import auroraX from "../assets/auroraX.png";


const models = [
  {
    name: "AURORA 3",
    car: aurora3,
    title: "URBAN DOMINANCE",
    desc: "Kompaktowy SUV zaprojektowany do miasta i poza nim.",
    sub: "Dynamiczny napęd, inteligentne systemy i przestrzeń, która dopasowuje się do Twojego stylu życia.",
  },
  {
    name: "AURORA 5",
    car: aurora5,
    title: "PURE BALANCE",
    desc: "Hatchback łączący osiągi i codzienną wygodę.",
    sub: "Zwinność w mieście, stabilność na trasie i design, który przyciąga spojrzenia.",
  },
  {
    name: "AURORA 7",
    car: aurora7,
    title: "PERFORMANCE REDEFINED",
    desc: "Sedan z nową definicją osiągów i technologii.",
    sub: "Moc, precyzja i zaawansowane systemy, które wynoszą jazdę na zupełnie nowy poziom.",
  },
  {
    name: "AURORA 9",
    car: aurora9,
    title: "LIMITLESS SPACE",
    desc: "Combi stworzone do długich podróży.",
    sub: "Przestrzeń, komfort i osiągi, które sprawiają, że każda podróż staje się doświadczeniem premium.",
  },
  {
    name: "AURORA X",
    car: auroraX,
    title: "OPEN FREEDOM",
    desc: "Kabriolet dla tych, którzy chcą poczuć wszystko.",
    sub: "Wiatr, prędkość i emocje zamknięte w perfekcyjnej formie designu i technologii.",
  },
];

function preloadImages(srcs) {
  srcs.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

export default function Hero() {
  const [active, setActive] = useState(2);
  const [prevIdx, setPrevIdx] = useState(2);
  const [fade, setFade] = useState(false);
  const bgRef = useRef(null);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) next();
    if (diff < -50) prev();
  };

  const model = models[active];
  const prevModel = models[prevIdx];

  useEffect(() => {
    preloadImages(models.map((m) => m.car));
  }, []);

  const changeTo = (idx) => {
    if (idx === active) return;
    setPrevIdx(active);
    setFade(true);
    setTimeout(() => {
      setActive(idx);
      setFade(false);
    }, 220);
  };

  const next = () => changeTo((active + 1) % models.length);
  const prev = () => changeTo((active - 1 + models.length) % models.length);

  const [lang, setLang] = useState(
  localStorage.getItem("lang") || "pl"
);

useEffect(() => {
  localStorage.setItem("lang", lang);
}, [lang]);

  return (
    <section className="relative h-screen w-full bg-black text-white overflow-hidden">

      {/* BACKGROUND */}
      <img
        ref={bgRef}
        src={background}
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300"
      />

      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex flex-col xl:flex-row items-center justify-center xl:justify-start px-6 sm:px-10 xl:px-16">

        {/* TEXT */}
        <div className="max-w-xl text-center xl:text-left mt-24 xl:mt-0">

          <p className="text-[11px] sm:text-[13px] tracking-[0.5em] text-white/50 mb-4 sm:mb-6">
            AURORA
          </p>

          <h1 className={`text-[34px] sm:text-[48px] xl:text-[68px] leading-[1.1] font-semibold transition-all duration-500 ${
            fade ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}>
            {model.title}
          </h1>

          <p className={`mt-4 text-white/70 transition-all duration-500 ${
            fade ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}>
            {model.desc}
          </p>

          <p className={`mt-2 text-white/50 transition-all duration-500 ${
            fade ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}>
            {model.sub}
          </p>

          <button className="mt-6 border border-white/40 px-6 py-3 text-sm hover:bg-white hover:text-black transition">
            DOWIEDZ SIĘ WIĘCEJ →
          </button>
        </div>

        {/* CAR */}
        <div
          className="relative w-full xl:absolute xl:bottom- xl:right-[6%] mt-10 xl:mt-120 xl:w-[52%] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >

          <img
            key={model.car}
            src={model.car}
            className="w-full object-contain animate-slide"
          />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[40%] blur-3xl opacity-60" />

        </div>
      </div>

      {/* DESKTOP */}
      <div className="hidden xl:flex absolute bottom-10 left-1/2 -translate-x-1/2 z-30 gap-10 text-[12px] tracking-[0.3em]">
        {models.map((m, i) => (
          <span
            key={m.name}
            onClick={() => changeTo(i)}
            className={`cursor-pointer ${
              i === active
                ? "text-white border-b border-white pb-1"
                : "text-white/40 hover:text-white"
            }`}
          >
            {m.name}
          </span>
        ))}
      </div>

      {/* MOBILE + IPAD */}
      <div className="xl:hidden absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-10">
        <button onClick={prev} className="w-12 h-12 text-4xl">←</button>
        <button onClick={next} className="w-12 h-12 text-4xl">→</button>
      </div>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(80px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide {
          animation: slide 0.7s ease-out;
        }
      `}</style>
    </section>
  );
}
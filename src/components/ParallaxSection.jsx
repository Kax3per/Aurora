import React, { useEffect, useRef, useState } from "react";

import bg1 from "../assets/parallax3.png";
import bg2 from "../assets/parallax5.png";
import bg3 from "../assets/parallax7.png";
import bg4 from "../assets/parallax9.png";
import bg5 from "../assets/parallaxX.png";

const slides = [
  {
    bg: bg1,
    title: "AURORA 3",
    subtitle: "URBAN DOMINANCE",
    desc: "Aurora 3 to nowa generacja SUV-a zaprojektowana z myślą o dynamicznym stylu życia w mieście i poza nim. Aurora 3 łączy kompaktową formę z przestronnością, oferując inteligentne systemy wspomagające jazdę, natychmiastową reakcję napędu elektrycznego oraz wyjątkową zwrotność. To samochód, który dostosowuje się do Ciebie – niezależnie od tego, czy poruszasz się w zatłoczonym centrum, czy uciekasz poza miasto. Maksymalna kontrola, cisza i komfort na każdym kilometrze.",
    stats: { power: 700, range: 600, accel: 42 },
  },

  {
    bg: bg2,
    title: "AURORA 5",
    subtitle: "PURE BALANCE",
    desc: "Aurora 5 została stworzona jako idealna równowaga pomiędzy osiągami a codzienną funkcjonalnością. Hatchback, który oferuje dynamiczne przyspieszenie, precyzyjne prowadzenie i nowoczesny design przyciągający uwagę. Zaawansowane systemy zarządzania energią i inteligentna aerodynamika zapewniają optymalny zasięg i stabilność. To samochód dla tych, którzy oczekują więcej – więcej stylu, więcej technologii i więcej przyjemności z jazdy.",
    stats: { power: 520, range: 540, accel: 48 },
  },

  {
    bg: bg3,
    title: "AURORA 7",
    subtitle: "PERFORMANCE REDEFINED",
    desc: "Aurora 7 redefiniuje pojęcie osiągów w segmencie sedanów. Dzięki natychmiastowemu momentowi obrotowemu i zaawansowanemu układowi napędowemu dostarcza niezwykle płynną, a jednocześnie agresywną dynamikę jazdy. Każdy element został zaprojektowany z myślą o maksymalnej precyzji – od zawieszenia po cyfrowe systemy kontroli trakcji. To nie tylko samochód – to narzędzie do doświadczania prędkości w najczystszej formie.",
    stats: { power: 780, range: 620, accel: 36 },
  },

  {
    bg: bg4,
    title: "AURORA 9",
    subtitle: "LIMITLESS SPACE",
    desc: "Aurora 9 to definicja podróżowania bez ograniczeń. Przestronne wnętrze, najwyższej klasy materiały i technologia, która sprawia, że każda podróż staje się doświadczeniem premium. Dzięki zwiększonemu zasięgowi i zoptymalizowanej efektywności energetycznej możesz pokonywać długie dystanse bez kompromisów. Komfort, cisza i stabilność sprawiają, że każda trasa – niezależnie od długości – staje się przyjemnością.",
    stats: { power: 640, range: 720, accel: 45 },
  },

  {
    bg: bg5,
    title: "AURORA X",
    subtitle: "OPEN FREEDOM",
    desc: "Aurora X to czysta esencja wolności i emocji. Kabriolet nowej generacji, który łączy elektryczną moc z otwartą przestrzenią i bezpośrednim kontaktem z otoczeniem. Minimalistyczna konstrukcja, maksymalne osiągi i perfekcyjna aerodynamika tworzą doświadczenie jazdy, które trudno porównać z czymkolwiek innym. To samochód dla tych, którzy nie chcą kompromisów – tylko pełnej kontroli i maksymalnych doznań.",
    stats: { power: 820, range: 500, accel: 35 },
  },
];

export default function CinematicScroll() {
  const sectionRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState("down");

  const [power, setPower] = useState(0);
  const [range, setRange] = useState(0);
  const [accel, setAccel] = useState(0);

  // 🔥 SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height - windowHeight))
      );

      const newIndex = Math.min(
        slides.length - 1,
        Math.floor(progress * slides.length)
      );

      if (newIndex !== index) {
        setDirection(newIndex > index ? "down" : "up");
        setPrevIndex(index);
        setIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  // 🔥 COUNTER
  useEffect(() => {
    const target = slides[index].stats;

    const animate = (setter, value, duration = 1200) => {
      let start = 0;
      const step = () => {
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

    animate(setPower, target.power);
    animate(setRange, target.range);
    animate(setAccel, target.accel);
  }, [index]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-black">

      {/* STICKY */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* BACKGROUND */}
        <img
          key={prevIndex}
          src={slides[prevIndex].bg}
          className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fadeOut"
        />

        <img
          key={index}
          src={slides[index].bg}
          className="absolute inset-0 w-full h-full object-cover opacity-100 animate-fadeIn"
        />

        <div className="absolute inset-0 bg-black/60" />

        {/* 🔥 CONTENT */}
        <div
          className="
          absolute z-20
          
          /* MOBILE + TABLET */
          top-[10%] left-1/2 -translate-x-1/2 w-[90%] text-center
          
          /* DESKTOP */
          xl:top-[12%] xl:left-[8%] xl:translate-x-0 xl:w-auto xl:text-left xl:max-w-[520px]
        "
        >

          {/* MODEL */}
          <p className="text-[10px] sm:text-[12px] tracking-[0.5em] text-white/40 mb-3 sm:mb-4">
            MODEL
          </p>

          {/* TITLE */}
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

          {/* SUB */}
          <h2 className="text-[11px] sm:text-[13px] md:text-[14px] tracking-[0.4em] text-white/60 mb-4 sm:mb-6">
            {slides[index].subtitle}
          </h2>

          {/* DESC */}
          <p className="text-white/70 text-[13px] sm:text-[15px] md:text-[16px] leading-relaxed mb-6 sm:mb-10">
            {slides[index].desc}
          </p>

          {/* 🔥 STATS */}
          <div className="
            flex justify-center xl:justify-start
            gap-6 sm:gap-10
          ">

            <div>
              <p className="text-[20px] text-white sm:text-[24px] xl:text-[28px] font-light">
                {power}+
              </p>
              <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.3em]">
                KM
              </p>
            </div>

            <div>
              <p className="text-[20px] text-white sm:text-[24px] xl:text-[28px] font-light">
                {range} KM
              </p>
              <p className="text-white/40 text-[9px] sm:text-[11px] tracking-[0.3em]">
                ZASIĘG
              </p>
            </div>

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
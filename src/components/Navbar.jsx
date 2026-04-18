import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/aurora.png";

const links = [
  "MODELE",
  "ELEKTRYFIKACJA",
  "INNOWACJE",
  "ŚWIAT AURORA",
  "KONTAKT",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <header className="absolute top-0 left-0 w-full z-50">
        <div className="w-full px-4 sm:px-6 md:px-10 py-4 md:py-5 flex items-center justify-between text-white">

          {/* LOGO */}
          <img
            src={logo}
            alt="logo"
            className="h-10 sm:h-12 md:h-16 lg:h-20"
          />

          {/* DESKTOP NAV (dopiero XL) */}
          <nav className="hidden xl:flex items-center gap-12 text-[12px] tracking-[0.25em] font-light text-white/80">
            {links.map((item) => (
              <a
                key={item}
                className="relative hover:text-white transition duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* RIGHT */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">

            {/* CONFIGURATOR (desktop) */}
            <button className="hidden xl:block border border-white/50 px-6 py-2 text-[11px] tracking-[0.25em] text-white hover:bg-white hover:text-black transition duration-300">
              CONFIGURATOR
            </button>

            {/* LANG (desktop) */}
            <div className="hidden xl:flex gap-3 text-[12px] tracking-[0.3em] text-white/40">
              <span className="text-white">PL</span>
              <span>/</span>
              <span className="hover:text-white">EN</span>
              <span>/</span>
              <span className="hover:text-white">FR</span>
            </div>

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen(true)}
              className="xl:hidden text-white"
            >
              <Menu size={26} />
            </button>

          </div>
        </div>
      </header>

      {/* MOBILE / TABLET MENU */}
      {open && (
        <div className="fixed inset-0 z-[9999]">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* CONTENT */}
          <div className="relative z-50 h-full flex flex-col items-center justify-center gap-8 sm:gap-10 px-6 text-white">

            {/* CLOSE */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              className="absolute top-5 right-5 text-white"
            >
              <X size={30} />
            </button>

            {/* LINKS */}
            {links.map((item, i) => (
              <a
                key={item}
                onClick={() => setOpen(false)}
                className="text-[24px] sm:text-[28px] md:text-[34px] tracking-[0.3em] font-light text-white/80 hover:text-white transition relative group"
                style={{
                  animation: "fadeUp 0.5s ease forwards",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {item}

                <span className="absolute left-1/2 -bottom-2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0 shadow-[0_0_10px_white]" />
              </a>
            ))}

            {/* CONFIGURATOR (FIXED TEXT COLOR 🔥) */}
            <button
              onClick={() => setOpen(false)}
              className="mt-6 border border-white px-8 py-3 tracking-[0.3em] text-sm text-white bg-transparent hover:bg-white hover:text-black transition duration-300"
            >
              CONFIGURATOR
            </button>

          </div>

          {/* LANG */}
          <div className="absolute bottom-8 w-full flex justify-center gap-4 text-sm tracking-[0.3em] text-white/40 z-50">
            <span className="text-white">PL</span>
            <span>/</span>
            <span>EN</span>
            <span>/</span>
            <span>FR</span>
          </div>
        </div>
      )}

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
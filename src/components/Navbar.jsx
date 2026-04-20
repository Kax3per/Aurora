import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/aurora.png";

/**
 * Main navigation links
 * Static navigation structure for primary sections
 */
const links = [
  "MODELE",
  "ELEKTRYFIKACJA",
  "INNOWACJE",
  "KONTAKT",
];

export default function Navbar() {
  /**
   * Controls visibility of mobile menu overlay
   * true  -> menu open
   * false -> menu closed
   */
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      {/* Top-level navigation bar positioned over hero section */}
      <header className="absolute top-0 left-0 w-full z-50">
        <div className="w-full px-4 sm:px-6 md:px-10 py-4 md:py-5 flex items-center justify-between text-white">

          {/* LOGO */}
          {/* Brand identity element with responsive sizing */}
          <img
            src={logo}
            alt="logo"
            className="h-10 sm:h-12 md:h-16 lg:h-20"
          />

          {/* DESKTOP NAV (dopiero XL) */}
          {/* Visible only on XL screens and above */}
          <nav className="hidden xl:flex items-center gap-12 text-[12px] tracking-[0.25em] font-light text-white/80">
            {links.map((item) => (
              <a
                key={item}
                /**
                 * Navigation item with animated underline
                 * Uses pseudo-element (::after) for hover effect
                 */
                className="relative hover:text-white transition duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-px after:bg-white after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* RIGHT */}
          {/* Container for secondary actions (CTA, language, menu toggle) */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">

            {/* CONFIGURATOR (desktop) */}
            {/* Primary CTA button, visible only on desktop */}
            <button className="hidden xl:block border border-white/50 px-6 py-2 text-[11px] tracking-[0.25em] text-white hover:bg-white hover:text-black transition duration-300">
              CONFIGURATOR
            </button>

            {/* LANG (desktop) */}
            {/* Language selector UI (no logic attached) */}
            <div className="hidden xl:flex gap-3 text-[12px] tracking-[0.3em] text-white/40">
              <span className="text-white">PL</span>
              <span>/</span>
              <span className="hover:text-white">EN</span>
              <span>/</span>
              <span className="hover:text-white">FR</span>
            </div>

            {/* HAMBURGER */}
            {/* Mobile trigger for opening fullscreen menu */}
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
      {/* Rendered conditionally when menu is open */}
      {open && (
        <div className="fixed inset-0 z-9999">

          {/* BACKDROP */}
          {/* Dark overlay with blur, closes menu on click */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          {/* CONTENT */}
          {/* Centered navigation content */}
          <div className="relative z-50 h-full flex flex-col items-center justify-center gap-8 sm:gap-10 px-6 text-white">

            {/* CLOSE */}
            {/* Close button with event propagation blocked */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevents triggering backdrop click
                setOpen(false);
              }}
              className="absolute top-5 right-5 text-white"
            >
              <X size={30} />
            </button>

            {/* LINKS */}
            {/* Mobile navigation links with staggered animation */}
            {links.map((item, i) => (
              <a
                key={item}
                onClick={() => setOpen(false)}
                /**
                 * Each item animates in sequence using delay
                 */
                className="text-[24px] sm:text-[28px] md:text-[34px] tracking-[0.3em] font-light text-white/80 hover:text-white transition relative group"
                style={{
                  animation: "fadeUp 0.5s ease forwards",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {item}

                {/* Underline glow effect on hover */}
                <span className="absolute left-1/2 -bottom-2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full group-hover:left-0 shadow-[0_0_10px_white]" />
              </a>
            ))}

            {/* CONFIGURATOR (FIXED TEXT COLOR 🔥) */}
            {/* CTA duplicated for mobile context */}
            <button
              onClick={() => setOpen(false)}
              className="mt-6 border border-white px-8 py-3 tracking-[0.3em] text-sm text-white bg-transparent hover:bg-white hover:text-black transition duration-300"
            >
              CONFIGURATOR
            </button>

          </div>

          {/* LANG */}
          {/* Mobile language selector positioned at bottom */}
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
      {/* Keyframe animation used for mobile menu items */}
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
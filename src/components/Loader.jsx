import React from "react";

/**
 * Loader Component
 * -----------------
 * Fullscreen loading overlay displayed during app initialization.
 *
 * Responsibilities:
 * - Blocks UI interaction while app is loading
 * - Displays brand identity (AURORA)
 * - Provides visual loading feedback via animation
 *
 * UX Concept:
 * Minimalistic, high-contrast loader reinforcing brand presence
 * while indicating progress through motion (pulse + loading bar).
 */
export default function Loader() {
  return (
    /* ================= FULLSCREEN OVERLAY ================= */
    <div className="fixed inset-0 z-9999 bg-black flex items-center justify-center">

      {/* ================= CENTERED CONTENT ================= */}
      <div className="text-center">

        {/* BRAND LOGO / TITLE */}
        <h1 className="text-white text-[28px] tracking-[0.5em] animate-pulse">
          AURORA
        </h1>

        {/* ================= LOADING INDICATOR ================= */}
        <div className="mt-6 w-32 h-px bg-white/20 mx-auto overflow-hidden">

          {/* ANIMATED PROGRESS BAR */}
          <div className="h-full bg-white animate-loadingBar" />

        </div>

      </div>

      {/* ================= ANIMATIONS ================= */}
      <style jsx>{`
        /**
         * Loading bar animation
         * ----------------------
         * Simulates progress using width expansion.
         * Looping animation to indicate ongoing process.
         */
        @keyframes loadingBar {
          0% { width: 0%; }
          50% { width: 80%; }
          100% { width: 100%; }
        }

        .animate-loadingBar {
          animation: loadingBar 1.8s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}
import React, { useState, useRef, useEffect } from "react";
import clickSound from "../assets/click.mp3";

/**
 * Static configuration data
 * --------------------------
 * Represents available options for the configurator.
 * In production, this would typically come from an API or CMS.
 */
const models = [
  { name: "AURORA 3", price: 180000 },
  { name: "AURORA 5", price: 220000 },
  { name: "AURORA 7", price: 280000 },
  { name: "AURORA 9", price: 320000 },
  { name: "AURORA X", price: 360000 },
];

const engines = [
  { name: "FULL ELECTRIC", price: 0 },
  { name: "HYBRID", price: 12000 },
  { name: "PLUG-IN HYBRID", price: 20000 },
];

const wheels = [
  { name: "19” STANDARD", price: 0 },
  { name: "21” SPORT", price: 6000 },
  { name: "22” PERFORMANCE", price: 12000 },
];

const extras = [
  { name: "PANORAMIC ROOF", price: 8000 },
  { name: "AUTOPILOT", price: 15000 },
  { name: "PREMIUM AUDIO", price: 7000 },
  { name: "HEATED SEATS", price: 4000 },
  { name: "AMBIENT LIGHT", price: 3000 },
];

/**
 * ConfiguratorPro Component
 * --------------------------
 * Interactive product configurator allowing users to:
 * - Select base model
 * - Customize engine and wheels
 * - Add optional extras
 * - View real-time price calculation
 *
 * UX Features:
 * - Immediate visual feedback (sound + vibration)
 * - Sticky summary panel
 * - Clear pricing breakdown
 */
export default function ConfiguratorPro() {
  /** Selected indices for each configuration group */
  const [model, setModel] = useState(0);
  const [engine, setEngine] = useState(0);
  const [wheel, setWheel] = useState(0);

  /** Array of selected extras (indices) */
  const [selectedExtras, setSelectedExtras] = useState([]);

  /** Audio reference for interaction feedback */
  const audioRef = useRef(null);

  /**
   * Effect: Initialize audio feedback
   * ----------------------------------
   * Prepares click sound instance on mount.
   */
  useEffect(() => {
    audioRef.current = new Audio(clickSound);
    audioRef.current.volume = 0.25;
  }, []);

  /**
   * Feedback system
   * ----------------
   * Provides multi-sensory feedback:
   * - Vibration (supported mobile devices)
   * - Sound (fallback + desktop)
   */
  const feedback = () => {
    /** Haptic feedback (if supported) */
    if (navigator.vibrate) {
      navigator.vibrate(15);
    }

    /** Audio feedback */
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  /**
   * Toggles extra option selection
   *
   * @param {number} i - Index of extra option
   */
  const toggleExtra = (i) => {
    feedback();

    setSelectedExtras((prev) =>
      prev.includes(i)
        ? prev.filter((x) => x !== i)
        : [...prev, i]
    );
  };

  /**
   * Computes total price dynamically
   */
  const total =
    models[model].price +
    engines[engine].price +
    wheels[wheel].price +
    selectedExtras.reduce((sum, i) => sum + extras[i].price, 0);

  return (
    /* ================= CONFIGURATOR SECTION ================= */
    <section className="bg-black text-white py-28 px-6 xl:px-20">

      {/* ================= HEADER ================= */}
      <div className="text-center mb-20">
        <p className="text-[12px] tracking-[0.5em] text-white/30 mb-6">
          KONFIGURATOR
        </p>

        <h2 className="text-[32px] sm:text-[48px] xl:text-[64px] tracking-[0.2em] font-light">
          ZBUDUJ SWOJĄ AURORĘ
        </h2>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid xl:grid-cols-[1fr_400px] gap-16">

        {/* ================= CONFIG OPTIONS ================= */}
        <div className="space-y-12">

          {/* MODEL SELECTION */}
          <div>
            <p className="text-[11px] tracking-[0.4em] text-white/30 mb-4">
              MODEL
            </p>

            <div className="flex flex-wrap gap-4">
              {models.map((m, i) => (
                <button
                  key={m.name}
                  onClick={() => {
                    feedback();
                    setModel(i);
                  }}
                  className={`px-5 py-2 rounded-full ${
                    model === i
                      ? "bg-white text-black"
                      : "border border-white/20 text-white/60 hover:text-white"
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          {/* ENGINE SELECTION */}
          <div>
            <p className="text-[11px] tracking-[0.4em] text-white/30 mb-4">
              NAPĘD
            </p>

            <div className="space-y-3">
              {engines.map((e, i) => (
                <button
                  key={e.name}
                  onClick={() => {
                    feedback();
                    setEngine(i);
                  }}
                  className={`w-full flex justify-between px-5 py-3 rounded-lg ${
                    engine === i
                      ? "bg-white text-black"
                      : "border border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <span>{e.name}</span>
                  <span>+{e.price} zł</span>
                </button>
              ))}
            </div>
          </div>

          {/* WHEELS SELECTION */}
          <div>
            <p className="text-[11px] tracking-[0.4em] text-white/30 mb-4">
              FELGI
            </p>

            <div className="space-y-3">
              {wheels.map((w, i) => (
                <button
                  key={w.name}
                  onClick={() => {
                    feedback();
                    setWheel(i);
                  }}
                  className={`w-full flex justify-between px-5 py-3 rounded-lg ${
                    wheel === i
                      ? "bg-white text-black"
                      : "border border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <span>{w.name}</span>
                  <span>+{w.price} zł</span>
                </button>
              ))}
            </div>
          </div>

          {/* EXTRAS SELECTION */}
          <div>
            <p className="text-[11px] tracking-[0.4em] text-white/30 mb-4">
              DODATKI
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {extras.map((ex, i) => (
                <button
                  key={ex.name}
                  onClick={() => toggleExtra(i)}
                  className={`px-4 py-3 rounded-lg text-left ${
                    selectedExtras.includes(i)
                      ? "bg-white text-black"
                      : "border border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <div>{ex.name}</div>
                  <div className="text-xs opacity-70">
                    +{ex.price} zł
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ================= SUMMARY PANEL ================= */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-fit sticky top-20">

          <p className="text-white/40 text-sm mb-2">
            TWOJA KONFIGURACJA
          </p>

          {/* SELECTED OPTIONS */}
          <div className="space-y-2 mb-6 text-sm">
            <p>{models[model].name}</p>
            <p>{engines[engine].name}</p>
            <p>{wheels[wheel].name}</p>

            {selectedExtras.map((i) => (
              <p key={i}>{extras[i].name}</p>
            ))}
          </div>

          {/* PRICE SUMMARY */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-white/40 text-sm mb-2">
              CENA KOŃCOWA
            </p>

            <p className="text-[32px] font-light">
              {total.toLocaleString()} zł
            </p>

            {/* CTA */}
            <button
              onClick={feedback}
              className="mt-6 w-full border border-white/40 py-3 tracking-[0.3em] text-sm hover:bg-white hover:text-black transition"
            >
              ZAMÓW →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
import React from "react";

/**
 * Footer Component
 * -----------------
 * Global footer section providing:
 * - Brand identity and description
 * - Navigation links (models, technology, company)
 * - Newsletter subscription form
 * - Social links
 * - Legal information
 *
 * UX Purpose:
 * Acts as a final navigation hub and trust-building element.
 */
export default function Footer() {
  return (
    /* ================= FOOTER ================= */
    <footer className="bg-black text-white border-t border-white/10">

      {/* ================= TOP SECTION ================= */}
      <div className="px-6 xl:px-20 py-20 grid sm:grid-cols-2 xl:grid-cols-5 gap-12">

        {/* ================= BRAND ================= */}
        <div>
          <h2 className="text-[20px] tracking-[0.3em] mb-6">
            AURORA
          </h2>

          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Nowa generacja mobilności. Technologia, design i emocje
            połączone w jedną wizję przyszłości.
          </p>
        </div>

        {/* ================= MODELS ================= */}
        <FooterColumn
          title="MODELE"
          items={["Aurora 3", "Aurora 5", "Aurora 7", "Aurora 9", "Aurora X"]}
        />

        {/* ================= TECHNOLOGY ================= */}
        <FooterColumn
          title="TECHNOLOGIA"
          items={["Elektryfikacja", "Autopilot", "AI Drive", "Bezpieczeństwo"]}
        />

        {/* ================= COMPANY ================= */}
        <FooterColumn
          title="FIRMA"
          items={["O nas", "Kariera", "Kontakt", "Dealerzy"]}
        />

        {/* ================= NEWSLETTER ================= */}
        <div>
          <p className="text-[11px] tracking-[0.4em] text-white/40 mb-6">
            NEWSLETTER
          </p>

          <p className="text-white/50 text-sm mb-4">
            Otrzymuj informacje o nowych modelach i technologii.
          </p>

          {/* INPUT */}
          <div className="flex border border-white/20">
            <input
              type="email"
              placeholder="EMAIL"
              className="bg-transparent px-4 py-3 text-sm w-full outline-none"
            />
            <button
              className="px-4 border-l border-white/20 hover:bg-white hover:text-black transition"
              aria-label="Subscribe"
            >
              →
            </button>
          </div>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4 mt-6 text-white/60">
            <span className="hover:text-white cursor-pointer">IG</span>
            <span className="hover:text-white cursor-pointer">FB</span>
            <span className="hover:text-white cursor-pointer">YT</span>
          </div>
        </div>

      </div>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="border-t border-white/10 px-6 xl:px-20 py-6 flex flex-col sm:flex-row justify-between text-white/40 text-xs">

        {/* COPYRIGHT */}
        <p>
          © {new Date().getFullYear()} AURORA. All rights reserved.
        </p>

        {/* LEGAL LINKS */}
        <div className="flex gap-6 mt-4 sm:mt-0">
          <span className="hover:text-white cursor-pointer">
            Privacy Policy
          </span>
          <span className="hover:text-white cursor-pointer">
            Terms of Service
          </span>
          <span className="hover:text-white cursor-pointer">
            Cookies
          </span>
        </div>

      </div>

    </footer>
  );
}

/**
 * FooterColumn Component
 * -----------------------
 * Reusable column for footer navigation links.
 *
 * @param {string} title - Column heading
 * @param {string[]} items - List of links
 */
function FooterColumn({ title, items }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.4em] text-white/40 mb-6">
        {title}
      </p>

      <ul className="space-y-3 text-white/70 text-sm">
        {items.map((item) => (
          <li
            key={item}
            className="hover:text-white cursor-pointer transition"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
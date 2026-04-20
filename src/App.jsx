import React, { useEffect, useState } from "react";
import Home from "./page/Home";
import Loader from "./components/Loader";

/**
 * App Component
 * --------------
 * Root component responsible for:
 * - Initial loading state management
 * - Displaying loader screen
 * - Rendering main application content
 *
 * UX Strategy:
 * Implements hybrid loading approach:
 * - Minimum loader display time (for smooth perception)
 * - Early exit if key asset (hero image) loads faster
 */
export default function App() {

  /**
   * Loading state
   * true  -> loader visible
   * false -> main content visible
   */
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // 🔥 FAST LOAD STRATEGY

    /**
     * Fallback timeout
     * -----------------
     * Ensures loader is displayed for a minimum time
     * to avoid flicker and create smooth transition
     */
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1200); // max 1.2s loader

    /**
     * Hero image detection
     * ---------------------
     * Attempts to detect first image in DOM
     * Used as signal for "content ready"
     */
    const heroImg = document.querySelector("img");

    if (heroImg) {

      /**
       * If image is already cached / loaded
       */
      if (heroImg.complete) {
        clearTimeout(timeout);
        setLoading(false);

      } else {

        /**
         * Wait for image to finish loading
         */
        heroImg.onload = () => {
          clearTimeout(timeout);
          setLoading(false);
        };
      }
    }

    /**
     * Cleanup timeout on unmount
     */
    return () => clearTimeout(timeout);

  }, []);

  return (
    <>
      {/* LOADER */}
      {/* Displayed while loading state is true */}
      {loading && <Loader />}

      {/* MAIN CONTENT */}
      {/* Fades in after loading completes */}
      <div
        className={`transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Home />
      </div>
    </>
  );
}
import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ElectricSection from "../components/ElectricSection";
import ParallaxSection from "../components/ParallaxSection";
import FeaturesSection from "../components/FeaturesSection";
import ExperienceSection from "../components/ExperienceSection";
import ConfiguratorSection from "../components/ConfiguratorSection";
import Footer from "../components/Footer";

/**
 * Home Page Component
 * --------------------
 * Main landing page composition.
 *
 * Responsibilities:
 * - Assembles all major UI sections in correct order
 * - Defines overall page structure and flow
 *
 * UX Flow (top → bottom):
 * 1. Navbar – global navigation
 * 2. Hero – first impression / branding
 * 3. ElectricSection – product value (technology)
 * 4. ParallaxSection – visual storytelling
 * 5. FeaturesSection – key capabilities overview
 * 6. ExperienceSection – immersive presentation
 * 7. ConfiguratorSection – user interaction / conversion
 * 8. Footer – navigation + legal + secondary info
 *
 * Architecture Note:
 * This component acts as a layout/composition layer only.
 * It does not contain business logic.
 */
export default function Home() {
    return (
        <>
            {/* GLOBAL NAVIGATION */}
            {/* Persistent top navigation across the page */}
            <Navbar />

            {/* HERO SECTION */}
            {/* Entry point with strongest visual impact */}
            <Hero />

            {/* ELECTRIC SECTION */}
            {/* Highlights core technology (electric system) */}
            <ElectricSection />

            {/* PARALLAX SECTION */}
            {/* Adds depth and cinematic scrolling experience */}
            <ParallaxSection />

            {/* FEATURES SECTION */}
            {/* Presents key product features in structured format */}
            <FeaturesSection />

            {/* EXPERIENCE SECTION */}
            {/* Focuses on immersive user experience / interior */}
            <ExperienceSection />

            {/* CONFIGURATOR SECTION */}
            {/* Interactive section for user engagement and conversion */}
            <ConfiguratorSection />

            {/* FOOTER */}
            {/* Final navigation and additional information */}
            <Footer />
        </>
    );
}
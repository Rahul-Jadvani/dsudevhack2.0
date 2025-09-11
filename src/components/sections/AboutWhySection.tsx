
import Iridescence from "@/blocks/Backgrounds/Iridescence/Iridescence";
import LetterGlitch from "@/blocks/Backgrounds/LetterGlitch/LetterGlitch";
import React from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";


const AboutWhySection = () => {
  const navigate = useNavigate();
  // celebration function
  const handleNavigate = () => {
    // Trigger confetti
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
    });

    // Navigate to winners page after short delay
    setTimeout(() => {
      navigate("/winners"); // make sure this path matches your route
    }, 500); // 500ms delay so confetti shows
  };
  return (
    <section className="about-why-section w-full h-full py-12 mb-20 sm:mt-0 bg-white relative overflow-hidden">
         {/* <div
        onClick={handleNavigate}
        className="w-full flex justify-center mb-10 relative z-10 cursor-pointer"
      >
        <div className="border-2 border-blue-500 bg-white/70 backdrop-blur-md rounded-lg shadow-lg p-6 flex flex-col items-center text-center max-w-xl hover:scale-105 transition-transform duration-200">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3">
            Excited to know the Winners?
          </h3>
          <p className="text-base text-gray-700 mb-4 font-medium">
            Click below to reveal the champions of DSU DEVHACK 2025!
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent double trigger
              handleNavigate();
            }}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-200"
          >
            Know the Winners
          </button>
        </div>
      </div> */}
      {/* LetterGlitch as background */}
      <div className="absolute inset-0 w-full h-full -z-1 pointer-events-none">
        <Iridescence
  color={[0.5, 0.5, 1]}
  mouseReact={true}
  amplitude={0.8}
  speed={0.5}
/>
      </div>
      {/* Main content */}
      <div className="container  mx-auto px-4 flex flex-col md:flex-row gap-8 justify-center items-stretch relative z-10">
        {/* About Column */}
        <div className="flex-1 border-2 border-blue-400 bg-transparent backdrop-blur-sm rounded-xl p-6 shadow-xl flex flex-col justify-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-black text-center">
            About DSU DEVHACK 2025
          </h2>
          <p className="text-base font-semibold sm:text-lg leading-relaxed mb-3 sm:mb-6 text-white/90 text-justify">
            DSU DEVHACK 2025 is a national-level hackathon pushing the
            boundaries of innovation in AI, ML, IoT, Blockchain, Cybersecurity,
            and Cloud at DSU Harohalli, Banglore, Karnataka.
          </p>
          <p className="text-base font-semibold sm:text-lg leading-relaxed mb-3 sm:mb-6 text-white/90 text-justify">
            This event gathers brilliant minds nationwide to create
            revolutionary solutions. It provides a platform for developers,
            designers, and enthusiasts to transform ideas, showcase skills, and
            network.
          </p>
        </div>
        {/* Why Participate Column */}
        <div className="flex-1 border-2 border-blue-400 bg-transparent backdrop-blur-sm rounded-xl p-6 shadow-xl flex flex-col justify-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-black text-center">
            Why Participate?
          </h2>
          <p className="text-base font-semibold sm:text-lg leading-relaxed mb-3 sm:mb-6 text-white text-justify whitespace-pre-line">
            Showcase your technical skills and creativity Network with industry
            professionals and peers Win exciting prizes and recognition Learn
            new technologies and methodologies Build solutions that address
            real-world challenges
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutWhySection;

import React from "react";

const AboutWhySection = () => {
  return (
    <section className="about-why-section w-full py-12 bg-white">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {/* About Column */}
        <div className="flex-1 bg-transparent rounded-xl p-6 shadow-md flex flex-col justify-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black text-justify">
            About DSU DEVHACK 2025
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-6 text-[#333333] text-justify">
            DSU DEVHACK 2025 is a national-level hackathon pushing the
            boundaries of innovation in AI, ML, IoT, Blockchain, Cybersecurity,
            and Cloud at DSU Harohalli, Banglore, Karnataka.
          </p>
          <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-6 text-[#333333] text-justify">
            This event gathers brilliant minds nationwide to create
            revolutionary solutions. It provides a platform for developers,
            designers, and enthusiasts to transform ideas, showcase skills, and
            network.
          </p>
        </div>
        {/* Why Participate Column */}
        <div className="flex-1 bg-transparent rounded-xl p-6 shadow-md flex flex-col justify-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black text-justify">
            Why Participate?
          </h2>
          <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-6 text-[#333333] text-justify whitespace-pre-line">
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

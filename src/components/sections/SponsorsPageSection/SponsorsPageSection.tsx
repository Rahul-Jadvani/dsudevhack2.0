import { Fragment } from 'react';
import './SponsorsPageSection.css';

export const SponsorsPageSection = () => {
  return (
    <section id="sponsors" className="sponsors-section">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="sponsors-title text-center">
          Our Sponsors
        </h2>

        <div className="py-8">
          {/* Coming Soon Animation using Tailwind */}
          <div className="max-w-3xl mx-auto bg-[#0f172a]/80 backdrop-blur-md p-12 rounded-xl border border-[#1e293b]/50 flex flex-col items-center justify-center mb-16">
            {/* Coming Soon Text */}
            <div className="flex justify-center mb-8">
              {Array.from("COMING SOON").map((letter, index) => (
                <span
                  key={index}
                  className="inline-block text-4xl md:text-5xl font-extrabold text-white mx-1 animate-pulse"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: '2s'
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>

            {/* Pulsing Circles */}
            <div className="relative w-48 h-48 my-8">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[#7B61FF]/80 to-transparent opacity-70 animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[#7B61FF]/80 to-transparent opacity-70 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-[#7B61FF]/80 to-transparent opacity-70 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }}></div>
            </div>

            {/* Description Text */}
            <p className="text-center text-gray-300 text-lg max-w-xl">
              We're in the process of finalizing our sponsors for this event.
              <br />
              Check back soon for updates!
            </p>
          </div>

          {/* Become a Sponsor Button - keeping the original class */}
          <div className="mt-16 text-center">
            <button
              type="button"
              className="sponsor-button group"
            >
              <span className="relative z-10">Become a Sponsor</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

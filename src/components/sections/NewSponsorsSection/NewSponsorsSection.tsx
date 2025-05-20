import './NewSponsorsSection.css';
import './NewSponsorsGrid.css';
import { useEffect, useRef } from 'react';

export const NewSponsorsSection = () => {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Add animation delay to each letter
    letterRefs.current.forEach((letter, index) => {
      if (letter) {
        letter.style.animationDelay = `${index * 0.07}s`;
      }
    });

    // Add animation delay to glitch lines
    lineRefs.current.forEach((line, index) => {
      if (line) {
        line.style.animationDelay = `${index * 0.3}s`;
        line.style.left = `${Math.random() * 100}%`;
        line.style.width = `${Math.random() * 30 + 10}%`;
        line.style.height = `${Math.random() * 1 + 1}px`;
        line.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      }
    });
  }, []);



  return (
    <section id="sponsors" className="new-sponsors-section">
      <div className="container mx-auto px-4 py-8">
        <h2 className="sponsors-title text-center mb-12">
          Our Sponsors
        </h2>

        {/* Coming Soon Animation Container */}
        <div className="bg-[#0a1525]/90 backdrop-blur-md rounded-none border-y border-[#7B61FF]/30 p-12 mb-12 max-w-5xl mx-auto relative overflow-hidden">
          {/* Glitch lines */}
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              ref={el => lineRefs.current[i] = el}
              className="absolute bg-[#7B61FF] animate-glitch-line"
            ></div>
          ))}

          {/* Noise overlay */}
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay"></div>

          {/* Coming Soon Text */}
          <div className="flex flex-col items-center justify-center mb-12 relative">
            <div className="text-xs md:text-sm font-mono text-[#7B61FF] tracking-widest mb-2 animate-blink">
              // SPONSORS_STATUS
            </div>

            {/* Desktop view - single line */}
            <div className="hidden md:flex flex-wrap justify-center mb-2 relative">
              {Array.from("COMING SOON").map((letter, index) => (
                <span
                  key={index}
                  ref={el => letterRefs.current[index] = el}
                  className={`text-7xl font-black ${letter === " " ? "mx-3" : "mx-1"} inline-block animate-glitch-text coming-soon-letter`}
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* Mobile view - stacked words */}
            <div className="flex md:hidden flex-col items-center justify-center mb-2 relative">
              <div className="flex justify-center">
                {Array.from("COMING").map((letter, index) => (
                  <span
                    key={`mobile-1-${index}`}
                    ref={el => letterRefs.current[index] = el}
                    className="text-5xl font-black mx-1 inline-block animate-glitch-text coming-soon-letter"
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <div className="flex justify-center mt-2">
                {Array.from("SOON").map((letter, index) => (
                  <span
                    key={`mobile-2-${index}`}
                    ref={el => letterRefs.current[index + 7] = el}
                    className="text-5xl font-black mx-1 inline-block animate-glitch-text coming-soon-letter"
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <div className="h-1 w-40 bg-gradient-to-r from-transparent via-[#7B61FF] to-transparent my-6 animate-width-pulse"></div>
          </div>

          {/* Description Text */}
          <div className="relative z-10">
            <p className="text-center text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              We're in the process of finalizing our sponsors for this event.
              <br className="hidden md:block" />
              <span className="text-[#7B61FF] font-medium">Check back soon for updates!</span>
            </p>

            <div className="flex justify-center mt-8">
              <div className="px-4 py-2 border border-[#7B61FF]/50 text-xs font-mono text-[#7B61FF] tracking-wider animate-pulse-subtle">
                LOADING_SPONSORS...
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes glitchText {
            0%, 100% {
              color: #f8f9fa;
              transform: translateY(0);
              filter: drop-shadow(0 0 5px rgba(123, 97, 255, 0.5));
            }
            10% {
              transform: translateY(-2px);
              color: #7B61FF;
              filter: drop-shadow(0 0 10px rgba(123, 97, 255, 0.8));
            }
            20% {
              transform: translateY(0);
            }
            30% {
              transform: translateX(1px);
            }
            40% {
              transform: translateX(-1px);
              color: #f8f9fa;
            }
            50% {
              transform: translateY(1px);
              filter: drop-shadow(0 0 15px rgba(123, 97, 255, 0.8));
            }
            60% {
              transform: translateY(0);
              color: #7B61FF;
            }
            70% {
              transform: translateX(-1px);
            }
            80% {
              transform: translateX(1px);
            }
            90% {
              transform: translateY(-1px);
              color: #f8f9fa;
            }
          }

          @keyframes glitchLine {
            0% {
              transform: translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            20% {
              transform: translateX(5px);
            }
            30% {
              transform: translateX(-5px);
            }
            40% {
              transform: translateX(0);
              opacity: 0;
            }
            100% {
              opacity: 0;
            }
          }

          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }

          @keyframes widthPulse {
            0%, 100% {
              width: 40%;
              opacity: 0.8;
            }
            50% {
              width: 60%;
              opacity: 0.5;
            }
          }

          @keyframes pulseSubtle {
            0%, 100% {
              opacity: 0.8;
            }
            50% {
              opacity: 0.5;
            }
          }

          .animate-glitch-text {
            animation: glitchText 4s ease-in-out infinite;
          }

          .animate-glitch-line {
            animation: glitchLine 3s ease-out infinite;
            position: absolute;
            top: 0;
            left: 0;
            height: 1px;
            width: 100px;
            background: #7B61FF;
            opacity: 0;
          }

          .animate-blink {
            animation: blink 2s ease-in-out infinite;
          }

          .animate-width-pulse {
            animation: widthPulse 4s ease-in-out infinite;
          }

          .animate-pulse-subtle {
            animation: pulseSubtle 2s ease-in-out infinite;
          }

          .bg-noise {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }

          .coming-soon-letter {
            text-shadow: 0 0 5px rgba(123, 97, 255, 0.8);
            font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          `
        }} />

        {/* Become a Sponsor button */}
        <div className="become-sponsor-container">
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="become-sponsor-button"
          >
            <div className="become-sponsor-button-text">
              Become a sponsor
            </div>
            <div className="arrow-container">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="arrow-icon">
                <path d="M7 17l10-10M7 7h10v10" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

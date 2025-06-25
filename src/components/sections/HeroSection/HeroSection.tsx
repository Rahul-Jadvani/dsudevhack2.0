import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  theme?: 'light' | 'dark';
}

export const HeroSection = (_props: HeroSectionProps) => {
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const keyboardWrapRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Update screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-09-12T00:00:00');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !keyboardWrapRef.current || !contentWrapRef.current) return;

    if (!isMobile && window.innerWidth > 992) {
      gsap.timeline({
        scrollTrigger: {
          trigger: "#pin-keyboard",
          start: "50% 50%",
          endTrigger: ".hero-section",
          end: "bottom 50%",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: false,
        }
      });
    }

    const allContentSections = gsap.utils.toArray('.hero-content-section');
    gsap.set(allContentSections, { clearProps: "all" });

    gsap.set('.about-section', { opacity: 1, visibility: 'visible' });
    gsap.set('.why-section', { opacity: 1, visibility: 'visible' });

    const contentSections = gsap.utils.toArray('.hero-content-section');
    contentSections.forEach((section: any, index: number) => {
      if (index > 0) {
        gsap.set(section, { opacity: 0.7, y: 30 });
      }
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 40%",
          toggleActions: "play none none reverse",
          once: false,
          markers: false,
        }
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[60vh] w-full overflow-hidden bg-gradient-to-b from-white to-gray-100 pt-0"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(24,minmax(0,1fr))] grid-rows-[repeat(24,minmax(0,1fr))] gap-[1px] pointer-events-none aspect-square">
        {Array.from({ length: 576 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-full aspect-square border border-black/10 bg-gradient-to-br from-white to-gray-50"
          />
        ))}
      </div>

      <div className="flex flex-col-reverse items-center lg:justify-between lg:flex-row relative w-full justify-start">
        {/* Left side - Scrollable content */}
        <div
          ref={contentWrapRef}
          className={`relative w-full py-0 pl-8 sm:pl-12 items-center h-[calc(100dvh)] max-h-screen overflow-y-auto scrollbar-none scroll-p-8 -z-1`}
        >
          {/* First content section */}
          <div className="min-h-[60vh] flex flex-col justify-center py-6 scroll-snap-start mb-8 relative">
            {/* University info for desktop */}
            {!isMobile && (
              <div className="absolute top-12 left-12 z-[5] max-w-[400px] flex items-center p-2 sm:p-4">
                <img
                  src="/images/dsu.png"
                  alt="DSU Logo"
                  className="w-12 h-12 sm:w-20 sm:h-20 object-contain mr-2 sm:mr-4"
                />
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h3 className="text-[17px] sm:text-[20px] font-semibold m-0 text-black">Dayananda Sagar University</h3>
                  <p className="text-[13px] sm:text-[15px] mt-1 mb-0 text-[#333]">School of Engineering, Harohalli</p>
                </div>
              </div>
            )}
            <div className="max-w-full w-full sm:w-[600px] p-3 sm:p-6 bg-transparent rounded-xl mb-4 transition-transform duration-300 hover:-translate-y-1 relative overflow-visible mt-40">
              <div className="flex flex-col items-center mb-3 max-w-full overflow-visible">
                <div className="flex flex-col items-center max-w-full overflow-hidden">
                  <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight m-0 text-black text-center max-w-full">DSU</h1>
                  <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight m-0 text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00D2FF] text-center max-w-full">DEVHACK 2.0</h1>
                </div>
              </div>
              <p className="text-base sm:text-xl mb-6 text-[#333333] leading-relaxed text-center">National-level hybrid hackathon for undergraduate engineering students</p>

              {/* Countdown timer */}
              <div className="flex justify-between mb-6 max-w-[350px] sm:max-w-[400px] mx-auto">
                {["Days", "Hours", "Mins", "Secs"].map((label, idx) => (
                  <div key={label} className="flex flex-col items-center rounded-lg p-1 sm:p-2 min-w-[55px] sm:min-w-[75px] text-[#333] shadow-sm bg-[#84b7f2]">
                    <span className="text-xl sm:text-2xl font-bold mb-1">
                      {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds][idx]}
                    </span>
                    <span className="text-xs sm:text-sm uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="px-5 py-3 sm:px-8 sm:py-4 bg-[#000f1d] text-[#f2f3f5] font-medium text-base sm:text-lg border-2 border-black rounded-none cursor-pointer flex items-center justify-center transition-all duration-300 relative overflow-hidden mx-auto z-[1] pr-[48px] sm:pr-[60px] max-w-[210px] sm:max-w-[250px] w-full group"
              >
                Register Now
                <div className="flex items-center justify-center bg-[#4da2ff] h-full w-[36px] sm:w-[50px] absolute transition-all duration-300 z-[2] right-0 top-0 bottom-0 text-lg sm:text-xl group-hover:bg-[#3b82f6] group-hover:right-auto group-hover:left-0 group-hover:rotate-0">
                  →
                </div>
              </button>
            </div>
          </div>

          {/* Video section for mobile/tablet */}
          {isMobile && (
            <div className="min-h-[35vh] flex flex-col justify-center items-center py-1 scroll-snap-start mb-2 relative">
              <div className="max-w-full w-full sm:w-[600px] p-1.5 sm:p-3 bg-transparent rounded-xl mb-2 transition-transform duration-300 hover:-translate-y-1 relative overflow-visible">
                <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                  <img
                    src="/images/images/new-svg-unscreen.gif"
                    alt="DSU DEVHACK"
                    className="w-full h-full object-contain"
                    style={{ 
                      filter: 'brightness(1.05) contrast(1.05) saturate(1.1',
                      imageRendering: 'crisp-edges',
                      WebkitBackfaceVisibility: 'hidden',
                      backfaceVisibility: 'hidden'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* About section */}
          <div className="min-h-[35vh] flex flex-col justify-center py-1.5 scroll-snap-start mb-3 relative opacity-100 visible">
            <div className="max-w-full w-full sm:w-[600px] p-1.5 sm:p-3 bg-transparent rounded-xl mb-2 transition-transform duration-300 hover:-translate-y-1 relative overflow-visible">
              <div className="flex lg:items-start lg:flex-row flex-col-reverse items-center gap-2 sm:gap-3">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black">About DSU DEVHACK 2025</h2>
                  <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-6 text-[#333333]">
                    DSU DEVHACK 2025 is a national-level hackathon pushing the boundaries of innovation in AI, ML, IoT, Blockchain, Cybersecurity, and Cloud at DSU Harohalli, Banglore, Karnataka. 🛠
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-6 text-[#333333]">
                    This event gathers brilliant minds nationwide to create revolutionary solutions. It provides a platform for developers, designers, and enthusiasts to transform ideas, showcase skills, and network. 🤝
                  </p>
                </div>
                {/* <img
                  src="/images/hb-logo.png"
                  alt="DSU Campus"
                  className="w-28 h-28 sm:w-48 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
                /> */}
              </div>
            </div>
          </div>

            {/* Why Participate section */}
          <div className="min-h-[50vh] flex flex-col justify-center py-4 scroll-snap-start mb-6 relative opacity-100 visible" id="why-section">
            <div className="max-w-full w-full sm:w-[600px] p-3 sm:p-6 bg-transparent rounded-xl mb-4 transition-transform duration-300 hover:-translate-y-1 relative overflow-visible">
              <div className="flex items-center lg:items-start lg:flex-row flex-col-reverse gap-3 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black">Why Participate?</h2>
                  <div className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-6 text-[#333333] space-y-1 sm:space-y-3">
                    <p>Showcase your technical skills and creativity</p>
                    <p>Network with industry professionals and peers</p>
                    <p>Win exciting prizes and recognition</p>
                    <p>Learn new technologies and methodologies</p>
                    <p>Build solutions that address real-world challenges</p>
                  </div>
                </div>
                {/* <img
                  src="/images/hb-logo.png"
                  alt="DSU Campus"
                  className="w-28 h-28 sm:w-48 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
                /> */}
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Video (Desktop only) */}
        {!isMobile && (
          <div
            ref={keyboardWrapRef}
            className="relative w-full h-screen flex flex-col justify-start items-center overflow-hidden"
          >
            {/* Desktop view - Video */}
            <div className="relative w-full h-full flex items-start justify-center ">
              <img
                src="/images/images/new-svg-unscreen.gif"
                alt="DSU DEVHACK"
                className="w-[80%] h-[80%] object-contain"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.05) saturate(1.1',
                  imageRendering: 'crisp-edges',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}; 
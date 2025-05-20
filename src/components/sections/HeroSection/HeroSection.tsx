import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  theme?: 'light' | 'dark';
}

export const HeroSection = (_props: HeroSectionProps) => {
  // Animation refs
  const cursorRef = useRef<SVGSVGElement>(null);
  const messageBoxRef = useRef<SVGGElement>(null);
  const keysRef = useRef<(HTMLImageElement | null)[]>([]);

  // Scroll pinning refs
  const sectionRef = useRef<HTMLElement>(null);
  const keyboardWrapRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMobile, setIsMobile] = useState(false);

  // Update screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 992);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animations (Cursor, etc.) stay desktop only
  useEffect(() => {
    if (isMobile) return;
    if (!cursorRef.current || keysRef.current.length === 0) return;

    const cursor = cursorRef.current;
    let currentKeyIndex = 0;

    const keySequence = [0, 2, 5, 1, 0, 2];
    let sequenceIndex = 0;

    const animateCursorToKey = () => {
      currentKeyIndex = keySequence[sequenceIndex];
      let key = keysRef.current[currentKeyIndex];

      sequenceIndex = (sequenceIndex + 1) % keySequence.length;

      if (!key) {
        gsap.to(cursor, {
          x: "40%",
          y: "15%",
          duration: 1,
          ease: "power2.inOut",
          onComplete: () => {
            setTimeout(animateCursorToKey, 800);
          }
        });
        return;
      }

      const keyRect = key.getBoundingClientRect();
      const cursorRect = cursor.getBoundingClientRect();
      const parentRect = cursor.parentElement?.getBoundingClientRect();

      if (!parentRect) return;

      let targetX = keyRect.left - parentRect.left + (keyRect.width / 2) - (cursorRect.width / 2);
      let targetY = keyRect.top - parentRect.top + (keyRect.height / 2) - (cursorRect.height / 2);

      const padding = 20;
      const maxX = Math.min(parentRect.width * 0.8, 800) - cursorRect.width;
      const maxY = (parentRect.height * 0.4) - cursorRect.height;
      targetX = Math.max(padding, Math.min(targetX, maxX));
      targetY = Math.max(padding, Math.min(targetY, maxY));
      targetY = targetY - 8;

      gsap.to(cursor, {
        x: targetX,
        y: targetY,
        duration: 1,
        ease: "power1.out",
        onComplete: () => {
          handleKeyHover(currentKeyIndex, true);

          setTimeout(() => {
            handleKeyHover(currentKeyIndex, false);
            setTimeout(() => {
              animateCursorToKey();
            }, 400);
          }, 300);
        }
      });
    };

    const timer = setTimeout(() => {
      gsap.set(cursor, { x: "30%", y: "10%" });
      animateCursorToKey();
    }, 1000);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf(cursor);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!messageBoxRef.current) return;
    const messageBox = messageBoxRef.current;

    gsap.to(messageBox, {
      y: -3,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => {
      gsap.killTweensOf(messageBox);
    };
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

  // Handle key hover animations
  const handleKeyHover = (index: number, isEnter: boolean) => {
    const key = keysRef.current[index];
    if (!key) return;
    if (isEnter) {
      gsap.to(key, {
        y: 5,
        scale: 0.95,
        filter: 'drop-shadow(0px 4px 2px rgba(0,0,0,0.3))',
        duration: 0.2,
        ease: "power2.out"
      });
    } else {
      gsap.to(key, {
        y: 0,
        scale: 1,
        filter: 'drop-shadow(0px 8px 4px rgba(0,0,0,0.2))',
        duration: 0.3,
        ease: "elastic.out(1, 0.5)"
      });
    }
  };

  // SVG keys to display
  const keySvgs = [
    '/images/images/D.svg',
    '/images/images/E.svg',
    '/images/images/V.svg',
    '/images/images/H.svg',
    '/images/images/A.svg',
    '/images/images/C.svg',
    '/images/images/K.svg',
    '/images/images/2.svg',
    '/images/images/point.svg',
    '/images/images/0.svg'
  ];

  // Use only the first 7 SVGs for mobile view
  const mobileSvgs = keySvgs.slice(0, 7);
  const displayedSvgs = isMobile ? mobileSvgs : keySvgs;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[60vh] w-full overflow-hidden bg-white"
    >
      <div className="flex flex-col-reverse items-center lg:justify-between lg:flex-row relative w-full justify-center">
        {/* Left side - Scrollable content */}
        <div
          ref={contentWrapRef}
          className={`relative w-full py-4 px-2 sm:px-4 items-center h-[calc(100dvh)] max-h-screen overflow-y-auto scrollbar-none scroll-p-8 -z-1`}
        >
          {/* First content section */}
          <div className="min-h-[60vh] flex flex-col justify-center py-6 scroll-snap-start mb-8 relative">
            <div className="max-w-full w-full sm:w-[600px] p-3 sm:p-6 bg-white/95 rounded-xl mb-4 transition-transform duration-300 hover:-translate-y-1 relative overflow-visible">
              <div className="flex flex-col items-center mb-3 max-w-full overflow-visible">
                <img
                  src="/images/hb-logo.png"
                  alt="DSU DevHack Logo"
                  className="w-24 h-24 sm:w-32 sm:h-32 mb-4 object-contain filter drop-shadow-md transition-transform duration-300 hover:rotate-12"
                />
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

          {/* About section */}
          <div className="min-h-[50vh] flex flex-col justify-center py-4 scroll-snap-start mb-6 relative opacity-100 visible">
            <div className="max-w-full w-full sm:w-[600px] p-3 sm:p-6 bg-white/95 rounded-xl mb-4 transition-transform duration-300 hover:-translate-y-1 relative overflow-visible">
              <div className="flex lg:items-start lg:flex-row flex-col-reverse items-center gap-3 sm:gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-black">About DSU DEVHACK 2025</h2>
                  <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-6 text-[#333333]">
                    DSU DEVHACK 2025 is a national-level hackathon pushing the boundaries of innovation in AI, ML, IoT, Blockchain, Cybersecurity, and Cloud at DSU Harohalli, Banglore, Karnataka. 🛠
                  </p>
                  <p className="text-base sm:text-lg leading-relaxed mb-3 sm:mb-6 text-[#333333]">
                    This event gathers brilliant minds nationwide to create revolutionary solutions. It provides a platform for developers, designers, and enthusiasts to transform ideas, showcase skills, and network. 🤝
                  </p>
                </div>
                <img
                  src="/images/hb-logo.png"
                  alt="DSU Campus"
                  className="w-28 h-28 sm:w-48 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Why Participate section */}
          <div className="min-h-[50vh] flex flex-col justify-center py-4 scroll-snap-start mb-6 relative opacity-100 visible">
            <div className="max-w-full w-full sm:w-[600px] p-3 sm:p-6 bg-white/95 rounded-xl mb-4 transition-transform duration-300 hover:-translate-y-1 relative overflow-visible">
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
                <img
                  src="/images/hb-logo.png"
                  alt="DSU Campus"
                  className="w-28 h-28 sm:w-48 sm:h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right side - SVG Keys */}
        <div
          ref={keyboardWrapRef}
          className={`
            relative w-full
            ${isMobile ? 'h-auto pt-4 pb-4 flex flex-col items-center justify-center bg-[#f9fafb]' : 'h-screen flex flex-col justify-center items-center pl-2 sm:pl-8 overflow-hidden'}
          `}
        >
          {/* University info */}
          <div className={`${isMobile ? 'static mb-4' : 'absolute top-5'} z-[5] max-w-[400px] flex items-center p-2 sm:p-4`}>
            <img
              src="/images/dsu.png"
              alt="DSU Logo"
              className="w-10 h-10 sm:w-16 sm:h-16 object-contain mr-2 sm:mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-base sm:text-xl font-semibold m-0 text-black">Dayananda Sagar University</h3>
              <p className="text-xs sm:text-sm mt-1 mb-0 text-[#333]">School of Engineering, Harohalli</p>
            </div>
          </div>

          {/* Mobile view - SVGs in a single line */}
          {isMobile && (
            <div className="w-full pb-2">
              <div className="flex flex-row justify-center items-center py-0 mx-auto">
                {displayedSvgs.map((svgPath, index) => (
                  <img
                    key={index}
                    src={svgPath}
                    alt={`Key ${index}`}
                    ref={el => keysRef.current[index] = el}
                    className="w-[80px] h-[80px] xs:w-[85px] xs:h-[85px] sm:w-[90px] sm:h-[90px] object-contain"
                    style={{
                      filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.1))',
                      transition: 'transform 0.2s ease-out',
                      margin: '0 -35px'
                    }}
                    onMouseEnter={() => handleKeyHover(index, true)}
                    onMouseLeave={() => handleKeyHover(index, false)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Desktop view - absolute positioned SVGs */}
          {!isMobile && (
            <div className="relative w-full h-full">
              {displayedSvgs.map((svgPath, index) => (
                <img
                  key={index}
                  src={svgPath}
                  alt={`Key ${index}`}
                  ref={el => keysRef.current[index] = el}
                  className={`absolute w-[340px] h-[340px] sm:w-[390px] sm:h-[390px] lg:w-[450px] lg:h-[450px] object-contain ${getSvgPositionClass(index)}`}
                  style={{
                    filter: 'drop-shadow(0px 8px 4px rgba(0,0,0,0.2))',
                    transition: 'transform 0.2s ease-out'
                  }}
                  onMouseEnter={() => handleKeyHover(index, true)}
                  onMouseLeave={() => handleKeyHover(index, false)}
                />
              ))}

              {/* Cursor SVG */}
              <svg
                ref={cursorRef}
                className="absolute top-[20%] left-[35%] -translate-x-1/2 -translate-y-1/2 z-10 filter drop-shadow-md pointer-events-none will-change-transform opacity-95"
                width="64"
                height="64"
                viewBox="0 0 24.00 24.00"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.1,4.46l7.21,15.92A1.17,1.17,0,0,0,12.5,20l1.26-6.23L20,12.5a1.17,1.17,0,0,0,.39-2.19L4.46,3.1A1,1,0,0,0,3.1,4.46Z"
                  style={{ fill: '#ffffff', strokeWidth: 2 }}
                />
                <path
                  d="M3.1,4.46l7.21,15.92A1.17,1.17,0,0,0,12.5,20l1.26-6.23L20,12.5a1.17,1.17,0,0,0,.39-2.19L4.46,3.1A1,1,0,0,0,3.1,4.46Z"
                  style={{ fill: 'none', stroke: '#000000', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: 2 }}
                />
              </svg>

              {/* Message Box */}
              <div className="absolute bottom-[90px] right-[150px] z-[5] pointer-events-none">
                <svg width={80} height={80} viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="35" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                  <g ref={messageBoxRef}>
                    <rect x="20" y="30" width="40" height="20" rx="4" fill="#FFFFFF" stroke="#000000" strokeWidth="1" />
                    <g className="message-dots">
                      <circle className="dot dot-1" cx="30" cy="40" r="2.5" fill="#000000" />
                      <circle className="dot dot-2" cx="40" cy="40" r="2.5" fill="#000000" />
                      <circle className="dot dot-3" cx="50" cy="40" r="2.5" fill="#000000" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Helper function for absolute position classes (desktop)
const getSvgPositionClass = (index: number): string => {
  // Only use on desktop
  const positions = [
    'top-[0px] left-[0px] -rotate-12', // D
    'top-[20px] left-[130px] rotate-6', // E
    'top-[10px] left-[350px] -rotate-6', // V
    'top-[40px] left-[250px] rotate-12', // H
    'top-[160px] left-[0px] -rotate-6', // A
    'top-[160px] left-[150px] rotate-6', // C
    'top-[160px] left-[300px] -rotate-6', // K
    'top-[280px] left-[120px] rotate-6', // 2
    'top-[280px] left-[0px] -rotate-12', // .
    'top-[280px] left-[250px] rotate-12', // 0
  ];
  return positions[index % positions.length];
};

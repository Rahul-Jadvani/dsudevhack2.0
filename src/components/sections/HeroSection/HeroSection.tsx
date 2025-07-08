import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import './HeroSection.css';
import RightSection from "../../../rightanimation/Rightsection";
import Squares from "@/blocks/Backgrounds/Squares/Squares";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  theme?: "light" | "dark";
}

export const HeroSection = (_props: HeroSectionProps) => {
  // Animation refs
  const sectionRef = useRef<HTMLElement>(null);
  const keyboardWrapRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMobile, setIsMobile] = useState(false);

  // Update screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date("2025-09-12T00:00:00");
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !keyboardWrapRef.current ||
      !contentWrapRef.current
    )
      return;

    // Guard for pin-keyboard and hero-section
    const pinKeyboard = document.getElementById("pin-keyboard");
    const heroSection = document.querySelector(".hero-section");
    if (!isMobile && window.innerWidth > 992 && pinKeyboard && heroSection) {
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
        },
      });
    }

    // Guard for about-section
    const aboutSection = document.querySelector(".about-section");
    if (aboutSection) {
      gsap.set(".about-section", { opacity: 1, visibility: "visible" });
    }
    // Guard for why-section
    const whySection = document.querySelector(".why-section");
    if (whySection) {
      gsap.set(".why-section", { opacity: 1, visibility: "visible" });
    }

    // Animate hero-content-section if present
    const contentSections = gsap.utils.toArray(".hero-content-section");
    if (contentSections.length > 0) {
      gsap.set(contentSections, { clearProps: "all" });
      contentSections.forEach((section, index) => {
        const el = section as HTMLElement;
        if (index > 0) {
          gsap.set(el, { opacity: 0.7, y: 30 });
        }
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "top 40%",
            toggleActions: "play none none reverse",
            once: false,
            markers: false,
          },
        });
      });
    }

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative sm:top-0 -top-20 h-[112vh] sm:h-[100vh] w-[100vw] overflow-hidden bg-gradient-to-b from-white to-gray-100"
    >
      {/* Squares Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none -z-4">
        <Squares
          speed={0.8}
          squareSize={
            typeof window !== "undefined" && window.innerWidth < 768 ? 50 : 40
          }
          direction="diagonal"
          borderColor="lightblue"
          hoverFillColor="#ab00ff"
        />
      </div>

      <div className="flex flex-col-reverse items-center lg:justify-between lg:flex-row relative w-full justify-start">
        {/* Left side - Scrollable content */}
        <div
          ref={contentWrapRef}
          className={`relative w-full py-0 px-2 sm:pl-12 items-center h-[calc(100dvh)] max-h-screen overflow-y-auto scrollbar-none scroll-p-8 -z-1`}
        >
          {/* First content section */}
          <div className="min-h-[70vh] sm:min-h-[90vh] flex flex-col justify-center py-6 scroll-snap-start relative">
            {/* University info for desktop */}
            {!isMobile && (
              <div className="hidden absolute top-0 left-12 max-w-[450px] md:flex items-center  sm:p-4">
                <img
                  src="/images/dsu.png"
                  alt="DSU Logo"
                  className="w-14 h-14 sm:w-20 sm:h-20 object-contain mr-2 sm:mr-4"
                />
                <div className="flex flex-col gap-1 sm:gap-2">
                  <h1 className="text-[17px] sm:text-[20px] m-0 text-black font-bold">
                    Dayananda Sagar University
                  </h1>
                  <p className="text-[13px] sm:text-[15px] mt-1 mb-0 text-[#333]">
                    School of Engineering, Harohalli
                  </p>
                </div>
              </div>
            )}
            <div className="max-w-full w-full sm:w-[600px] sm:p-6 bg-transparent rounded-xl transition-transform duration-300 hover:-translate-y-1 relative overflow-visible flex flex-col items-center justify-center">
              <div className="flex flex-col items-center max-w-full overflow-visible">
                <div className="flex flex-col items-center max-w-full overflow-hidden">
                  <h1 className="text-4xl sm:text-8xl font-extrabold leading-tight text-black text-center max-w-full">
                    DSU
                  </h1>
                  <h1 className="text-4xl sm:text-8xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#7B61FF] to-[#00D2FF] text-center max-w-full">
                    DEVHACK 2.0
                  </h1>
                </div>
              </div>
              <p className="text-base sm:text-xl mb-6 text-[#333333] leading-relaxed font-bold text-center">
                National-level hackathon for undergraduate engineering
                students
              </p>

              {/* Countdown timer */}
              <div className="flex justify-between mb-6 max-w-[350px] sm:max-w-[400px] mx-auto gap-4">
                {["Days", "Hours", "Mins", "Secs"].map((label, idx) => (
                  <div
                    key={label}
                    className="flex flex-col items-center rounded-lg p-1 sm:p-2 min-w-[55px] sm:min-w-[75px] text-[#333] shadow-sm bg-[#84b7f2]"
                  >
                    <span className="text-xl sm:text-2xl font-bold mb-1">
                      {
                        [
                          timeLeft.days,
                          timeLeft.hours,
                          timeLeft.minutes,
                          timeLeft.seconds,
                        ][idx]
                      }
                    </span>
                    <span className="text-xs sm:text-sm uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="w-full flex justify-center">
                <div
                  className="apply-button devfolio-button"
                  data-hackathon-slug="dsudevhack2"
                  data-button-theme="dark"
                ></div>
              </div>
            </div>
          </div>

          {/* Video section for mobile/tablet */}
          {isMobile && (
            <div className="-z-1 scale-[0.7] bottom-32 sm:bottom-36 flex right-44 justify-end items-center relative w-full">
              <RightSection />
              {/* <div style={{ height: "220px" }} /> */}
            </div>
          )}

          {/* About section */}
          {/* REMOVED: About section for extraction */}

          {/* Why Participate section */}
          {/* REMOVED: Why Participate section for extraction */}
        </div>

        {/* Right side - Video (Desktop only) */}
        {!isMobile && (
          <div
            ref={keyboardWrapRef}
            // (gsap animation removed, keep static id for styling/position)
            // id="pin-keyboard"
            className="relative w-full h-screen flex flex-col justify-start items-center overflow-hidden -z-6"
          >
            {/* Desktop view - Video */}
            <div
              className="relative right-60 top-32"
              style={{ width: "1000px", maxWidth: "40vw" }}
            >
              {/* <img
                src="/images/images/new-svg-unscreen.gif"
                alt="DSU DEVHACK"
                className="w-[80%] h-[80%] object-contain"
                style={{ 
                  filter: 'brightness(1.05) contrast(1.05) saturate(1.1)',
                  imageRendering: 'crisp-edges',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden'
                }}
              /> */}
              <div className="scale-[0.7] xl:scale-[0.7] origin-top-left w-full ">
                <RightSection />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

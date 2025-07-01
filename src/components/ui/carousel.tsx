"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useId, useEffect, useImperativeHandle, forwardRef } from "react";
import "../sections/OrganisingTeamSection/OrganisingTeamSection.css";

interface SlideData {
  title: string;
  subtitle?: string;
  button: string;
  src: string;
  instagram?: string;
  linkedin?: string;
  phoneNumber?: string;
}

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);

  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;

      const x = xRef.current;
      const y = yRef.current;

      slideRef.current.style.setProperty("--x", `${x}px`);
      slideRef.current.style.setProperty("--y", `${y}px`);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
  };

  const handleMouseLeave = () => {
    xRef.current = 0;
    yRef.current = 0;
  };

  const imageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.style.opacity = "1";
  };

  const { src, button, title, subtitle, instagram, linkedin } = slide;

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="group relative flex flex-1 flex-col items-center justify-center text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[50vmin] h-[50vmin] mx-[4vmin] z-10 cursor-pointer select-none overflow-hidden carousel-one-card-mobile hover:scale-105"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        {/* Background with member image (spans whole card) */}
        <div
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-300 rounded-[1.6em] overflow-hidden group-hover:blur-sm`}
          style={src ? { backgroundImage: `url('${src}')` } : {}}
        />

        {/* Member Image - Only appears on hover */}
        <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 animate-smooth z-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bottom-8 group-hover:right-8">
          <img
            className="w-24 h-24 rounded-full object-cover border-3 border-white shadow-lg"
            alt={title}
            src={src}
            onLoad={imageLoaded}
          />
        </div>

        {/* Member Info - Always Visible, Disappears on Hover */}
        <div className="absolute bottom-4 left-4 z-20 animate-smooth group-hover:opacity-0 group-hover:transform group-hover:translate-y-4 text-left">
          <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg max-w-xs min-w-[180px] w-fit border border-white/20 shadow-md text-left">
            <h2 className="text-xl font-bold text-black mb-1 drop-shadow-lg text-left">{title}</h2>
            {subtitle && (
              <p className="text-base text-black mb-0.5 drop-shadow-lg text-left">
                {subtitle.split('&').map((part, index) => (
                  <div key={index} className="leading-tight text-left">
                    {part.trim()}
                  </div>
                ))}
              </p>
            )}
            {slide.phoneNumber && (
              <p className="text-sm text-black drop-shadow-lg font-semibold text-left">{slide.phoneNumber}</p>
            )}
          </div>
        </div>

        {/* Animated Boxes - Socials and Logo, show on hover */}
        {instagram && (
          <div
            className="absolute w-[60%] h-[60%] bottom-[-0.1em] left-[-0.1em] p-4 text-right bg-white/60 border-t-2 border-r border-white rounded-custom shadow-lg transform-origin-bottom-left animate-smooth-slow cursor-pointer hover:bg-white/80 opacity-0 group-hover:opacity-100 group-hover:bottom-[-0.1em] group-hover:left-[-0.1em]"
            onClick={e => { e.stopPropagation(); window.open(instagram, '_blank', 'noopener,noreferrer'); }}
          >
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-gray-600 animate-smooth hover:fill-gray-800">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
          </div>
        )}
        {linkedin && (
          <div
            className="absolute w-[40%] h-[40%] bottom-[-0.1em] left-[-0.1em] p-4 text-right bg-white/60 border-t-2 border-r border-white rounded-custom shadow-lg transform-origin-bottom-left animate-smooth-slow transition-delay-200 cursor-pointer hover:bg-white/80 opacity-0 group-hover:opacity-100 group-hover:bottom-[-0.1em] group-hover:left-[-0.1em]"
            onClick={e => { e.stopPropagation(); window.open(linkedin, '_blank', 'noopener,noreferrer'); }}
          >
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-gray-600 animate-smooth hover:fill-gray-800">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
          </div>
        )}
        {/* Logo Box - show on hover */}
        <div className="absolute w-[25%] h-[25%] bottom-[-25%] left-[-25%] p-4 text-right bg-white/60 border-t-2 border-r border-white rounded-custom shadow-lg transform-origin-bottom-left animate-smooth-slow transition-delay-400 group-hover:bottom-[-0.1em] group-hover:left-[-0.1em] opacity-0 group-hover:opacity-100">
          <div className="relative w-10 h-10">
            <img
              src="/images/logos/logoo9.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Decorative Box - show on hover */}
        <div className="absolute w-[8%] h-[8%] bottom-[-8%] left-[-8%] bg-white/60 border-t-2 border-r border-white rounded-custom shadow-lg transform-origin-bottom-left animate-smooth-slow transition-delay-600 group-hover:bottom-[-0.1em] group-hover:left-[-0.1em] opacity-0 group-hover:opacity-100" />
      </li>
    </div>
  );
};

interface CarouselControlProps {
  type: string;
  title: string;
  handleClick: () => void;
}

const CarouselControl = ({
  type,
  title,
  handleClick,
}: CarouselControlProps) => {
  return (
    <button
      className={`w-12 h-12 flex items-center justify-center bg-black/20 hover:bg-black/30 rounded-full focus:outline-none transition duration-200 pointer-events-auto ${type === "previous" ? "rotate-180" : ""
        }`}
      title={title}
      onClick={handleClick}
    >
      <IconArrowNarrowRight className="text-white w-6 h-6" />
    </button>
  );
};

interface CarouselProps {
  slides: SlideData[];
  loop?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
}

export interface CarouselHandle {
  handlePreviousClick: () => void;
  handleNextClick: () => void;
}

export const Carousel = forwardRef<CarouselHandle, CarouselProps>(
  ({
    slides,
    loop = true,
    autoplay = true,
    autoplayInterval = 1500,
  }, ref) => {
    const [current, setCurrent] = useState(0);

    const handlePreviousClick = () => {
      const previous = current - 1;
      setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
      const next = current + 1;
      setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index: number) => {
      if (current !== index) {
        setCurrent(index);
      }
    };

    useImperativeHandle(ref, () => ({
      handlePreviousClick,
      handleNextClick,
    }));

    useEffect(() => {
      if (!autoplay) return;

      const interval = setInterval(() => {
        handleNextClick();
      }, autoplayInterval);

      return () => clearInterval(interval);
    }, [autoplay, autoplayInterval, handleNextClick]);

    const id = useId();

    return (
      <div
        className="relative w-full h-[80vw] sm:w-[70vmin] sm:h-[70vmin] mx-auto max-w-2xl"
        aria-labelledby={`carousel-heading-${id}`}
      >
        <ul
          className="absolute flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${current * (100 / slides.length)}%)`,
          }}
        >
          {slides.map((slide, index) => (
            <Slide
              key={index}
              slide={slide}
              index={index}
              current={current}
              handleSlideClick={handleSlideClick}
            />
          ))}
        </ul>
      </div>
    );
  }
);

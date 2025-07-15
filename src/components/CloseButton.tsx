'use client';
import React, { useState } from 'react';
import './Timeline.css';

const CloseButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href="https://dsudevhack2.devfolio.co/application"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Button Container */}
        <div className="relative w-44 md:w-52 h-14 md:h-16
                        border-[3px] border-stone-800 rounded-lg
                        bg-yellow-400
                        shadow-[4px_4px_0_#292524]
                        active:shadow-[2px_2px_0_#292524]
                        transition-all duration-150 overflow-hidden">

          {/* Blue wave wash effect (right to left) */}
          <div className="absolute inset-0 overflow-hidden rounded-md">
            <div
              className={`absolute top-0 right-0 h-full w-full bg-gradient-to-l from-blue-500 to-cyan-400 
                          transition-all duration-500 ease-out ${
                            isHovered ? 'translate-x-0' : 'translate-x-full'
                          }`}
            />
          </div>

          {/* Animated border glow elements */}
          {/* Top border */}
          <span className="
            absolute
            top-0
            left-0
            w-full
            h-0.5
            bg-gradient-to-l
            from-transparent
            via-yellow-500
            to-transparent
            animate-moveRight
          "></span>
          
          {/* Right border */}
          <span className="
            absolute
            top-0
            right-0
            h-full
            w-0.5
            bg-gradient-to-t
            from-transparent
            via-yellow-500
            to-transparent
            animate-moveDown
          "></span>
          
          {/* Bottom border */}
          <span className="
            absolute
            bottom-0
            left-0
            w-full
            h-0.5
            bg-gradient-to-r
            from-transparent
            via-yellow-500
            to-transparent
            animate-moveLeft
          "></span>
          
          {/* Left border */}
          <span className="
            absolute
            top-0
            left-0
            h-full
            w-0.5
            bg-gradient-to-b
            from-transparent
            via-yellow-500
            to-transparent
            animate-moveUp
          "></span>

          {/* Register label */}
          <button
            name="register"
            type="button"
            className="relative z-10 flex w-full h-full items-center justify-center
                       font-bold text-black text-sm md:text-base tracking-wide
                       transform transition-transform duration-300
                       group-hover:scale-95"
          >
            REGISTER
          </button>
        </div>
      </a>

      {/* Robot / Point image container */}
      <div className="absolute top-1/2 -translate-y-1/2
                      pointer-events-none select-none
                      transition-all duration-500
                      right-0 translate-x-[85%] group-hover:left-0 group-hover:right-auto group-hover:-translate-x-[55%]">

        {/* Peep image (default) */}
        <div
          className={`relative transition-opacity duration-300 ${
            isHovered ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src="/images/peep.png"
            alt="robot mascot"
            className="w-10 md:w-14 relative z-20 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>

        {/* Point image (shows on hover) */}
        <div
          className={`absolute top-0 left-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src="/images/point.png"
            alt="connection point"
            className="w-16 md:w-20 relative z-20 animate-bounce"
          />
        </div>
      </div>
    </div>
  );
};

export default CloseButton;
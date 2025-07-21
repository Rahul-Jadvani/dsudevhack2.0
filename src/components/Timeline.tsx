import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

// Color palette for timeline cards
const cardColors = [
  "#93c5fd", // blue
  "#f9a8d4", // pink
  "#86efac", // green
  "#fde047", // yellow
  "#fca5a5", // red
  "#d8b4fe", // purple
  "#a5b4fc", // indigo
  "#c4b5fd", // violet
];

// Card component for timeline stages
const TimelineCard = ({ title, subtitle, date, color, className = "" }: { title: string, subtitle: string, date: string, color: string, className?: string }) => {
  // Extract day and month from date string
  const extractDateInfo = (dateStr: string) => {
    // Handle different date formats
    if (dateStr.includes('1st')) return { day: '1', month: 'JUL' };
    if (dateStr.includes('25th')) return { day: '25', month: 'JUL' };
    if (dateStr.includes('18th')) return { day: '18', month: 'AUG' };
    if (dateStr.includes('20th')) return { day: '20', month: 'AUG' };
    if (dateStr.includes('1st September')) return { day: '1', month: 'SEP' };
    if (dateStr.includes('12th September')) return { day: '12', month: 'SEP' };
    if (dateStr.includes('13th September')) return { day: '13', month: 'SEP' };
    return { day: '25', month: 'SEP' }; // fallback
  };

  const { day, month } = extractDateInfo(date);

  return (
    <StyledWrapper className={className} style={{ '--card-color': color } as React.CSSProperties}>
      <div className="parent">
        <div className="card">
          <div className="content-box">
            <span className="card-title">{title}</span>
            <p className="card-content">{subtitle}</p>
          </div>
          <div className="date-box">
            <span className="month">{month}</span>
            <span className="date">{day}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

// Add a function to generate the glow style for the circle
const getGlowStyle = (color: string, isActive: boolean) =>
  isActive
    ? {
      boxShadow: `0 0 24px 8px ${color}, 0 0 60px 16px ${color}55`,
      border: `2px solid ${color}`,
    }
    : {};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  
  .parent {
    width: 300px;
    padding: 20px;
    perspective: 1000px;
  }

  @media (min-width: 768px) {
    .parent {
      width: 400px;
      padding: 25px;
    }
  }

  .card {
    padding-top: 30px;
    border: 3px solid #141414;
    transform-style: preserve-3d;
    background: linear-gradient(135deg, #0000 18.75%, #f3f3f3 0 31.25%, #0000 0),
      repeating-linear-gradient(45deg, #f3f3f3 -6.25% 6.25%, #141414 0 18.75%);
    background-size: 60px 60px;
    background-position:
      0 0,
      0 0;
    background-color: #141414;
    width: 100%;
    box-shadow: rgba(142, 142, 142, 0.3) 0px 30px 30px -10px;
    transition: all 0.5s ease-in-out;
  }

  .card:hover {
    background-position:
      -100px 100px,
      -100px 100px;
    transform: rotate3d(0.5, 1, 0, 30deg);
  }

  .content-box {
    background: var(--card-color, #8ed500);
    transition: all 0.5s ease-in-out;
    padding: 40px 25px 20px 25px;
    transform-style: preserve-3d;
  }

  .content-box .card-title {
    display: inline-block;
    color: #141414;
    font-size: 25px;
    font-weight: 900;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 50px);
  }

  @media (min-width: 768px) {
    .content-box .card-title {
      font-size: 32px;
    }
  }

  .content-box .card-title:hover {
    transform: translate3d(0px, 0px, 60px);
  }

  .content-box .card-content {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 700;
    color: #141414;
    transition: all 0.5s ease-in-out;
    transform: translate3d(0px, 0px, 30px);
  }

  @media (min-width: 768px) {
    .content-box .card-content {
      font-size: 16px;
    }
  }

  .content-box .card-content:hover {
    transform: translate3d(0px, 0px, 60px);
  }



  .date-box {
    position: absolute;
    top: 20px;
    right: 30px;
    height: 60px;
    width: 60px;
    background: #141414;
    border: 1px solid var(--card-color, #8ed500);
    padding: 10px;
    transform: translate3d(0px, 0px, 80px);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 17px 10px -10px;
  }

  .date-box span {
    display: block;
    text-align: center;
  }

  .date-box .month {
    color: var(--card-color, #8ed500);
    font-size: 9px;
    font-weight: 700;
  }

  .date-box .date {
    font-size: 20px;
    font-weight: 900;
    color: var(--card-color, #8ed500);
  }

  @media (max-width: 768px) {
    .parent {
      width: 240px;
      padding: 10px;
    }
    
    .content-box .card-title {
      font-size: 20px;
    }
    
    .content-box .card-content {
      font-size: 10px;
    }
    
    .date-box {
      height: 50px;
      width: 50px;
      top: 20px;
      right: 20px;
    }
    
    .date-box .date {
      font-size: 16px;
    }
  }
`;

// Add pulsing glow animation CSS
const glowAnimationStyle = `
@keyframes pulse-glow {
  0% { box-shadow: 0 0 6px 1px var(--glow-color), 0 0 10px 2px var(--glow-color-alpha); }
  50% { box-shadow: 0 0 10px 2px var(--glow-color), 0 0 16px 4px var(--glow-color-alpha); }
  100% { box-shadow: 0 0 6px 1px var(--glow-color), 0 0 10px 2px var(--glow-color-alpha); }
}
.glow-animate {
  animation: pulse-glow 2.0s infinite;
}
`;

// Inject the animation style into the document head
if (typeof window !== 'undefined' && !document.getElementById('timeline-glow-style')) {
  const style = document.createElement('style');
  style.id = 'timeline-glow-style';
  style.innerHTML = glowAnimationStyle;
  document.head.appendChild(style);
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);
  const [progressHeight, setProgressHeight] = React.useState(0);
  const [circleCenters, setCircleCenters] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  // Progress bar animation logic
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const desktopItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const mobileItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Compute all circle centers on mobile
  React.useEffect(() => {
    const updateCenters = () => {
      if (window.innerWidth >= 768) {
        setCircleCenters([]);
        return;
      }
      const timelineContainer = ref.current;
      if (!timelineContainer) return;
      const containerRect = timelineContainer.getBoundingClientRect();
      const centers: number[] = [];
      for (let i = 0; i < mobileItemRefs.current.length; i++) {
        const item = mobileItemRefs.current[i];
        if (item) {
          const circle = item.querySelector('.rounded-full');
          if (circle) {
            const circleRect = circle.getBoundingClientRect();
            const center = (circleRect.top - containerRect.top) + (circleRect.height / 2);
            centers.push(center);
          } else {
            // fallback: use top of the item
            const itemRect = item.getBoundingClientRect();
            centers.push(itemRect.top - containerRect.top + (itemRect.height / 2));
          }
        }
      }
      setCircleCenters(centers);
    };
    updateCenters();
    window.addEventListener('resize', updateCenters);
    return () => window.removeEventListener('resize', updateCenters);
  }, [data.length]);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Check if we're on mobile (screen width < 768px)
          const mobileCheck = window.innerWidth < 768;
          setIsMobile(mobileCheck);
          const refs = mobileCheck ? mobileItemRefs : desktopItemRefs;

          if (refs.current.length === 0) return;

          // Get the timeline container position
          const timelineContainer = ref.current;
          if (!timelineContainer) return;

          const containerRect = timelineContainer.getBoundingClientRect();
          const containerTop = containerRect.top;
          const containerHeight = containerRect.height;

          // Calculate scroll progress within the timeline section
          const scrollProgress = Math.max(0, Math.min(1,
            (window.innerHeight - containerTop) / (window.innerHeight + containerHeight)
          ));

          // Map scroll progress to active index
          const newActive = Math.floor(scrollProgress * refs.current.length);
          setActiveIndex(Math.min(newActive, refs.current.length - 1));

          // Progress bar fill height logic
          if (mobileCheck) {
            // On mobile, fill up to the center of the current active circle
            if (circleCenters.length > 0) {
              setProgressHeight(circleCenters[Math.min(newActive, circleCenters.length - 1)] || 0);
            } else {
              setProgressHeight(0);
            }
          } else {
            // On desktop, fill as before
            setProgressHeight(((Math.min(newActive + 1, refs.current.length)) / refs.current.length) * containerHeight);
          }

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Ensure first circle is active on mount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [data.length, circleCenters]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mt-16 mb-2" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>Timeline</h2>
          {data.map((item, index) => {
            // Extract subtitle and date from item.content
            let subtitle = '';
            let date = '';
            if (React.isValidElement(item.content)) {
              const children = item.content.props.children;
              if (Array.isArray(children) && children.length > 1) {
                subtitle = children[0]?.props?.children || '';
                date = children[1]?.props?.children || '';
              }
            }
            // Alternate left/right for desktop
            const isLeft = index % 2 === 0;
            return (
              <>
                {/* Desktop: alternating layout (unchanged) */}
                <div
                  key={index}
                  ref={el => desktopItemRefs.current[index] = el}
                  className={`relative w-full hidden md:flex flex-row items-center pt-10 md:pt-24 md:gap-0 group timeline-node-hover`}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Left card (even) */}
                  <div className={`w-1/2 ${isLeft ? 'justify-end pr-8 flex' : 'justify-end pr-8 invisible'}`}>
                    {isLeft && (
                      <TimelineCard title={item.title} subtitle={subtitle} date={date} color={cardColors[index % cardColors.length]} className="group-hover:shadow-2xl group-hover:scale-105" />
                    )}
                  </div>
                  {/* Center bar and circle always centered */}
                  <div className="flex flex-col items-center z-10 md:w-0 md:min-w-[80px] md:max-w-[80px] md:items-center items-start">
                    <div
                      className={`h-10 w-10 md:h-16 md:w-16 rounded-full bg-white dark:bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg relative md:mx-auto ml-2 z-20 ${index <= activeIndex ? 'glow-animate' : ''}`}
                      style={
                        index <= activeIndex
                          ? ({
                            ...getGlowStyle(cardColors[index % cardColors.length], true),
                            '--glow-color': cardColors[index % cardColors.length],
                            '--glow-color-alpha': cardColors[index % cardColors.length] + '55',
                          } as any) as React.CSSProperties
                          : undefined
                      }
                    >
                      <img
                        src={`/images/time circles/${index + 1}.png`}
                        alt={`Timeline ${index + 1}`}
                        className="h-full w-full object-contain transition-all duration-300"
                      />
                    </div>
                  </div>
                  {/* Right card (odd) */}
                  <div className={`w-1/2 ${!isLeft ? 'justify-start pl-8 flex' : 'justify-start pl-8 invisible'}`}>
                    {!isLeft && (
                      <TimelineCard title={item.title} subtitle={subtitle} date={date} color={cardColors[index % cardColors.length]} className="group-hover:shadow-2xl group-hover:scale-105" />
                    )}
                  </div>
                </div>
                {/* Mobile: bar/circle in left column, card in right column, no overlap */}
                <div
                  ref={el => mobileItemRefs.current[index] = el}
                  className="md:hidden w-full flex flex-row items-start pt-10 group timeline-node-hover"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex flex-col items-center w-16 flex-shrink-0 z-10">
                    <div
                      className={`h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg relative z-20 ${index <= activeIndex ? 'glow-animate' : ''}`}
                      style={
                        index <= activeIndex
                          ? ({
                            ...getGlowStyle(cardColors[index % cardColors.length], true),
                            '--glow-color': cardColors[index % cardColors.length],
                            '--glow-color-alpha': cardColors[index % cardColors.length] + '55',
                          } as any) as React.CSSProperties
                          : undefined
                      }
                    >
                      <img
                        src={`/images/time circles/${index + 1}.png`}
                        alt={`Timeline ${index + 1}`}
                        className="h-full w-full object-contain transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex-1 ml-4">
                    <TimelineCard title={item.title} subtitle={subtitle} date={date} color={cardColors[index % cardColors.length]} className="group-hover:shadow-2xl group-hover:scale-105" />
                  </div>
                </div>
              </>
            );
          })}
          {/* Vertical bar: centered on desktop, left on mobile (adjust left for more space) */}
          <div
            style={{ height: height + "px" }}
            className="absolute md:left-1/2 md:-translate-x-1/2 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] z-0"
          >
            <motion.div
              animate={{ height: progressHeight, opacity: 1 }}
              transition={{
                duration: isMobile ? 0.6 : 0.6,
                ease: 'easeInOut'
              }}
              className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}; 
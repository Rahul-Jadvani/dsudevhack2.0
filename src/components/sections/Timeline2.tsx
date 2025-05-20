"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./timeline.css";
import items from "./schedule";
import Reveal from "./Reveal";
import "../../styles/timeline/background.css";

export default function Timeline2() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollPosition = window.scrollY + windowHeight / 2;

      const activeIndex = items.findIndex((item) => {
        const cardElement = document.getElementById(`card-${item.key}`);
        if (!cardElement) return false;

        const cardTop = cardElement.offsetTop;
        const cardBottom = cardTop + cardElement.offsetHeight;

        return scrollPosition >= cardTop && scrollPosition < cardBottom;
      });

      setActiveCardIndex(activeIndex === -1 ? 0 : activeIndex);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  return (
    <div className="mt-36 sm:mt-56">
      <h1 className="text-center text-white text-3xl sm:text-4xl md:text-4xl xl:text-5xl font-logo timelineContainer1">
        Schedule
      </h1>
      <div className="mt-32 ">
        <div className="timeline flex justify-center items-center mx-auto ">
          <div className=" ">
            <div className="outer flex flex-col items-center m-5 ">
              {items.map((item, index) => (
                <TimelineCard
                  key={item.key}
                  item={item}
                  index={index}
                  active={index <= activeCardIndex}
                  activeCard={index === activeCardIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const TimelineCard = ({ item, index, active, activeCard }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-50% 0px",
  });

  return (
    <div
      id={`card-${item.key}`}
      className={`box zinc-700   ${activeCard ? "active-card" : ""} ${
        active ? "active" : ""
      }`}
      ref={ref}
    >
      <Reveal even={item.key % 2 !== 0}>
        <div className="info glassy-div">
          <h3 className="title md:text-lg text-md">{item.title}</h3>
          <div className="flex flex-col data">
            <h3 className="md:text-xl font-semibold py-2 ">{item.cardTitle}</h3>
            <p>{item.cardDetailedText}</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}; 
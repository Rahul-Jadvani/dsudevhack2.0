"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import "./timeline.css";
import items from "./schedule";
import Reveal from "./Reveal";
import { useTheme } from "../../../lib/theme-context";
import { motion, AnimatePresence } from "framer-motion";


export default function Timeline2() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { theme } = useTheme();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="timeline flex justify-center items-center mx-auto">
        <div className="relative w-full">
          <motion.div
            className="outer flex flex-col items-center m-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {items.map((item, index) => (
              <TimelineCard
                key={item.key}
                item={item}
                index={index}
                active={index <= activeCardIndex}
                activeCard={index === activeCardIndex}
                theme={theme}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const TimelineCard = ({ item, index, active, activeCard, theme }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-50% 0px",
  });

  // Animation variants for the timeline card
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: item.key % 2 === 0 ? -50 : 50,
      y: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut"
      }
    },
    hover: {
      y: 0,
      transition: {
        duration: 0
      }
    }
  };

  // Animation variants for the dot
  const dotVariants = {
    initial: { scale: 0 },
    animate: {
      scale: activeCard ? 1.5 : 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Animation variants for the info card
  const infoVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.2 + 0.3
      }
    },
    hover: {
      scale: 1,
      boxShadow: "none",
      transition: { duration: 0 }
    }
  };

  return (
    <motion.div
      id={`card-${item.key}`}
      className={`box ${theme === 'light' ? 'light' : ''} ${activeCard ? "active-card" : ""} ${
        active ? "active" : ""
      }`}
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        className="dot-animation"
        variants={dotVariants}
        initial="initial"
        animate="animate"
      />

      <Reveal even={item.key % 2 !== 0}>
        <motion.div
          className="info glassy-div"
          variants={infoVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3
            className="title md:text-lg text-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {item.title}
          </motion.h3>
          <motion.div
            className="flex flex-col data"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 + 0.6 }}
          >
            <h3 className={`md:text-xl font-semibold py-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
              {item.cardTitle}
            </h3>
            <p className={theme === 'light' ? 'text-gray-600' : 'text-gray-300'}>
              {item.cardDetailedText}
            </p>
          </motion.div>
        </motion.div>
      </Reveal>
    </motion.div>
  );
};

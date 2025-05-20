"use client";
import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface props {
  children: JSX.Element;
  width?: "fit-content" | "full";
  even?: boolean;
}

export default function Reveal({ children, even = false }: props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      style={{ position: "relative" }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, x: even ? -200 : 200 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
} 
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
        duration: 0.001, // lower = faster response
      easing: (t) => t, // linear easing = no artificial slow-in/out
      gestureOrientation: 'vertical',
      wheelMultiplier: 1.5, // can increase responsiveness
      touchMultiplier: 2,   // snappier on touch devices
      infinite: false,
    });

    const raf = (time: DOMHighResTimeStamp) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);
};

export default useLenis;


import React, { useEffect, useRef } from 'react';

const BoxLoader = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    
    const rotateBox = () => {
      if (!box) return;
      const time = Date.now() * 0.001;
      box.style.transform = `rotateX(${Math.sin(time) * 15}deg) rotateY(${Math.cos(time) * 15}deg)`;
      requestAnimationFrame(rotateBox);
    };
    
    const animationId = requestAnimationFrame(rotateBox);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="box-container perspective-500">
      <div 
        ref={boxRef} 
        className="box w-5 h-5 relative transform-style-3d transition-transform"
      >
        <div className="box-face box-face-front absolute w-full h-full bg-indigo-300 opacity-70"></div>
        <div className="box-face box-face-back absolute w-full h-full bg-indigo-500 opacity-70"></div>
        <div className="box-face box-face-right absolute w-full h-full bg-indigo-400 opacity-70"></div>
        <div className="box-face box-face-left absolute w-full h-full bg-indigo-400 opacity-70"></div>
        <div className="box-face box-face-top absolute w-full h-full bg-indigo-200 opacity-70"></div>
        <div className="box-face box-face-bottom absolute w-full h-full bg-indigo-600 opacity-70"></div>
      </div>
    </div>
  );
};

export default BoxLoader;

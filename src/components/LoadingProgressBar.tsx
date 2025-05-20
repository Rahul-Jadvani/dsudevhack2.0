import React, { useState, useEffect } from 'react';
import BoxLoader from './BoxLoader';

interface LoadingProgressBarProps {
  onComplete: () => void;
}

const LoadingProgressBar: React.FC<LoadingProgressBarProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Start with a quick jump to 90%
    const initialTimer = setTimeout(() => {
      setProgress(90);
    }, 500);
    
    // Then slowly reach 100% and trigger completion
    const completeTimer = setTimeout(() => {
      setProgress(100);
      // Call onComplete after a small delay when 100% is reached
      setTimeout(() => {
        onComplete();
      }, 600);
    }, 3000);
    
    return () => {
      clearTimeout(initialTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col w-full max-w-md">
      <div className="flex loading-box rounded-none bg-transparent">
        <div className="progress-indicator flex items-center justify-center px-4 py-3">
          <BoxLoader />
        </div>
        <div className="flex-1 px-4 py-3 text-gray-800 font-mono text-lg">
          INITIALIZING...
        </div>
        <div className="px-4 py-3 text-gray-800 font-mono text-lg">
          {progress}%
        </div>
      </div>
      <div className="loading-box rounded-none mt-1 h-8 w-full bg-transparent">
        <div 
          className="h-full progress-bar animate-progress-fill" 
          style={{ 
            width: `${progress}%`, 
            transition: "width 2.5s ease-in-out"
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingProgressBar;

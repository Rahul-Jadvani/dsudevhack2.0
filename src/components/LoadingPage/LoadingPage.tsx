import { useState, useEffect } from 'react';
import './LoadingPage.css';

interface LoadingPageProps {
  onComplete: () => void;
  initialProgress?: number;
  loadingTime?: number;
}

export const LoadingPage = ({
  onComplete,
  initialProgress = 0,
  loadingTime = 1000
}: LoadingPageProps) => {
  const [progress, setProgress] = useState(initialProgress);
  const [isVisible, setIsVisible] = useState(true);

  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10; // Increased from 5 to 10 for faster progress
        if (newProgress >= 100) {
          clearInterval(interval);

          // Start exit animation and immediately complete
          setExitAnimation(true);

          // No delay - immediately complete
          setIsVisible(false);
          onComplete();

          return 100;
        }
        return newProgress;
      });
    }, loadingTime / 40); // Reduced from loadingTime/20 to loadingTime/40 for faster updates

    return () => clearInterval(interval);
  }, [loadingTime, onComplete]);

  const getCurrentDate = () => {
    return "August-September";
  };

  // Create an array of 10 segments for the progress bar (changed from 20 to match the new increment of 10)
  const segments = Array.from({ length: 10 }, (_, i) => {
    const segmentProgress = (i + 1) * 10;
    return {
      filled: progress >= segmentProgress,
      active: progress >= segmentProgress - 10 && progress < segmentProgress
    };
  });

  if (!isVisible) return null;

  return (
    <div className={`loading-page-container ${exitAnimation ? 'exit' : ''}`}>
      <div className={`loading-modal ${exitAnimation ? 'exit' : ''}`}>
        <div className="loading-header">
          <div className="loading-date">
            <span className="loading-date-tag">&lt;date&gt;</span> {getCurrentDate()} <span className="loading-date-tag">&lt;/date&gt;</span>
          </div>
          <button type="button" className="loading-close-button">×</button>
        </div>
        <div className="loading-content">
          <div className="loading-progress-container">
            <div className="loading-progress-header">
              <div className="loading-progress-text">
                <div className="loading-progress-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M3 8H13 M8 3L13 8L8 13"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                INITIALIZING...
              </div>
              <div className="loading-progress-percentage">{progress}%</div>
            </div>
            <div className="loading-progress-bar">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className={`loading-progress-bar-segment ${segment.filled ? (segment.active ? 'active' : '') : 'empty'}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

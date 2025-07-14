import { useState, useEffect, useRef, useMemo } from "react";
import "./LoadingPage.css";

interface LoadingPageProps {
  onComplete: () => void;
  initialProgress?: number;
  loadingTime?: number;
}

export const LoadingPage = ({
  onComplete,
  initialProgress = 0,
  loadingTime = 1000,
}: LoadingPageProps) => {
  const [progress, setProgress] = useState(initialProgress);
  const [isVisible, setIsVisible] = useState(true);
  const [exitAnimation, setExitAnimation] = useState(false);

  const mounted = useRef(true);

  /* faster interval: only 10 ticks (increments of 10) */
  useEffect(() => {
    const step = 10;
    const intervalMs = (loadingTime * 0.15) / (100 / step);
    const interval = setInterval(() => {
      if (!mounted.current) return;

      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          // Allow final paint, then exit
          requestAnimationFrame(() => {
            setExitAnimation(true);
            setIsVisible(false);
            onComplete();
          });
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [loadingTime, onComplete]);

  /* memoised segment data (re‑computes only when progress changes) */
  const segments = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const segmentProgress = (i + 1) * 10;
      return {
        filled: progress >= segmentProgress,
        active: progress >= segmentProgress - 10 && progress < segmentProgress,
      };
    });
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div className={`loading-page-container ${exitAnimation ? "exit" : ""}`}>
      <div className={`loading-modal ${exitAnimation ? "exit" : ""}`}>
        <div className="loading-header">
          <div className="loading-date">
            <span className="loading-date-tag">&lt;date&gt;</span>{" "}
            August-September{" "}
            <span className="loading-date-tag">&lt;/date&gt;</span>
          </div>
          <button type="button" className="loading-close-button">
            ×
          </button>
        </div>

        <div className="loading-content">
          <div className="loading-progress-container">
            <div className="loading-progress-header">
              <div className="loading-progress-text">
                <div className="loading-progress-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
              {segments.map((s, i) => (
                <div
                  key={i}
                  className={`loading-progress-bar-segment ${
                    s.filled ? (s.active ? "active" : "") : "empty"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;

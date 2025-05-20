import React, { useEffect, useState } from 'react';
import './CurtainTransition.css';

interface CurtainTransitionProps {
  isLoading: boolean;
  onTransitionComplete: () => void;
}

const CurtainTransition: React.FC<CurtainTransitionProps> = ({
  isLoading,
  onTransitionComplete
}) => {
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Start opening the curtain when loading is complete
      setIsCurtainOpen(true);

      // Immediately trigger the fade out and complete transition
      // No delay between loading page and main content
      setIsFadingOut(true);

      // Notify parent that transition is complete immediately
      onTransitionComplete();
    }
  }, [isLoading, onTransitionComplete]);

  // If loading is still happening, don't render the curtain yet
  if (isLoading) {
    return null;
  }

  return (
    <div className={`curtain-container ${isCurtainOpen ? 'curtain-open' : ''} ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="curtain-left"></div>
      <div className="curtain-right"></div>
      <div className="curtain-logo">
        {/* Using a text logo instead of an image since logo.png doesn't exist */}
        <div className="text-logo">DSU DEVHACK</div>
      </div>
    </div>
  );
};

export default CurtainTransition;

import React, { useState } from 'react';
import LoadingProgressBar from '../components/LoadingProgressBar';
import { X } from "lucide-react";
import { Home } from './Home';

const Index = () => {
  const [loading, setLoading] = useState(true);
  const getCurrentDate = () => {
    const date = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month}-${year}`;
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="light-grid-background min-h-screen w-full flex flex-col items-center bg-white">
        <div className="w-full max-w-3xl mt-4">

          {/* Header bar with date and close button */}
          <div className="light-header-bar flex justify-between items-center mb-0 bg-white">
            <div className="flex items-center">
              <span className="text-indigo-500 font-mono">&lt;date&gt;</span>
              <span className="text-gray-800 px-2 font-mono">{getCurrentDate()}</span>
              <span className="text-indigo-500 font-mono">&lt;/date&gt;</span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                aria-label="Close"
                className="light-close-btn w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>

          {/* Main loading container */}
          <div className="light-loading-container h-96 flex flex-col items-center justify-center bg-white">
            <LoadingProgressBar onComplete={handleLoadingComplete} />
          </div>
        </div>
      </div>
    );
  }

  return <Home />;
};

export default Index;

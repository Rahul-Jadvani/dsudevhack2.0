import { useState } from 'react';
import { Navigation } from '../components/layout/Navigation';
import { AlternateHeader } from '../components/layout/AlternateHeader';

export const HeaderDemo = () => {
  const [showAlternate, setShowAlternate] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Show either the main Navigation header or the AlternateHeader */}
      {showAlternate ? <AlternateHeader /> : <Navigation />}

      {/* Content with padding to account for the fixed header */}
      <div className="pt-24 md:pt-16 px-6">
        <h1 className="text-3xl font-bold mb-6">Header Demo</h1>

        <div className="mb-8">
          <button
            type="button"
            onClick={() => setShowAlternate(!showAlternate)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Switch to {showAlternate ? 'Main' : 'Alternate'} Header
          </button>
        </div>

        <div className="prose max-w-3xl">
          <h2>Header Styles</h2>
          <p>
            This page demonstrates two different header styles based on the provided design:
          </p>
          <ul>
            <li><strong>Main Header:</strong> Dark navy top bar with date, white bottom bar with title and menu</li>
            <li><strong>Alternate Header:</strong> White bar with title on left and dark navy date section on right</li>
          </ul>
          <p>
            Click the button above to toggle between the two styles.
          </p>
        </div>
      </div>
    </div>
  );
};

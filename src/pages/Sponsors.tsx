
import { useState } from 'react';
import { MainLayout } from '../components/layout/MainLayout';
import '../components/sections/SponsorsPageSection/SponsorsPageSection.css';

export const Sponsors = () => {
  const [hoveredSponsor, setHoveredSponsor] = useState<number | null>(null);

  return (
    <MainLayout>
      <div className="sponsors-section container px-6 py-12">
        <h1 className="sponsors-title text-4xl md:text-6xl font-bold mb-12">Sponsors</h1>

        {/* Track Sponsor */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center category-title" style={{ color: '#c2410c' }}>Track Sponsor</h3>
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                name: "Tezos India",
                logo: "Tezos India",
                logoUrl: "/sponsors/tezos-india.png"
              }
            ].map((sponsor, index) => (
              <div
                key={index}
                className="relative overflow-hidden group cursor-pointer sponsor-card track-sponsor float-animation-1"
                onMouseEnter={() => setHoveredSponsor(index)}
                onMouseLeave={() => setHoveredSponsor(null)}
              >
                <div className="p-6 flex flex-col h-64">
                  <div className="text-gray-300 text-lg mb-4 sponsor-name">
                    {sponsor.name}
                  </div>
                  <div className="flex-1 flex items-center justify-center logo-container">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className="logo-image"
                      />
                    ) : (
                      <div className="text-4xl font-bold text-amber-500">
                        {sponsor.logo}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 transition-opacity duration-300 ${hoveredSponsor === index ? 'opacity-100' : ''}`}
                ></div>

                {/* Animated corner badge */}
                <div className="absolute top-4 right-4 bg-amber-500 text-white w-10 h-10 flex items-center justify-center rounded-full opacity-0 transform scale-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L14.5 9.5L20 10L16 14L17.5 20L12 17L6.5 20L8 14L4 10L9.5 9.5L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center category-title" style={{ color: '#b45309' }}>Gold Sponsors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Verbwire",
                logo: "Verbwire",
                logoUrl: "/sponsors/verbwire.png"
              },
              {
                name: "Devfolio",
                logo: "Devfolio",
                logoUrl: "/sponsors/devfolio.png"
              },
              {
                name: "Polygon",
                logo: "Polygon",
                logoUrl: "/sponsors/polygon.png"
              },
              {
                name: "Aptos",
                logo: "Aptos",
                logoUrl: "/sponsors/aptos.png"
              }
            ].map((sponsor, index) => (
              <div
                key={index}
                className={`relative overflow-hidden group cursor-pointer sponsor-card gold-sponsor ${index === 0 ? 'float-animation-3' : ''}`}
                onMouseEnter={() => setHoveredSponsor(index + 1)}
                onMouseLeave={() => setHoveredSponsor(null)}
              >
                <div className="p-6 flex flex-col h-56">
                  <div className="text-gray-300 text-lg mb-4 sponsor-name">
                    {sponsor.name}
                  </div>
                  <div className="flex-1 flex items-center justify-center logo-container">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className="logo-image"
                      />
                    ) : (
                      <div className="text-3xl font-bold text-yellow-500">
                        {sponsor.logo}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 opacity-0 transition-opacity duration-300 ${hoveredSponsor === index + 1 ? 'opacity-100' : ''}`}
                ></div>

                {/* Animated corner badge */}
                <div className="absolute top-4 right-4 bg-yellow-500 text-white w-8 h-8 flex items-center justify-center rounded-full opacity-0 transform scale-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15.713L18.01 19.213L16.597 12.43L21.856 7.76666L14.945 7.16999L12 0.786987L9.05501 7.16999L2.14401 7.76666L7.40401 12.43L5.99001 19.213L12 15.713Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center category-title" style={{ color: '#334155' }}>Silver Sponsors</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              {
                name: "AIC DSU Innovation Foundation",
                logo: "AIC DSU",
                logoUrl: "/sponsors/aic-dsu.png"
              },
              {
                name: "ETHIndia",
                logo: "ETHIndia",
                logoUrl: "/sponsors/ethindia.png"
              },
              {
                name: "Axure",
                logo: "Axure",
                logoUrl: "/sponsors/axure.png"
              },
              {
                name: ".XYZ",
                logo: ".XYZ",
                logoUrl: "/sponsors/xyz.png"
              },
              {
                name: "Beeceptor",
                logo: "Beeceptor",
                logoUrl: "/sponsors/beeceptor.png"
              }
            ].map((sponsor, index) => (
              <div
                key={index}
                className="relative overflow-hidden group cursor-pointer sponsor-card silver-sponsor"
                onMouseEnter={() => setHoveredSponsor(index + 5)}
                onMouseLeave={() => setHoveredSponsor(null)}
                style={{ animation: sponsor.animation }}
              >
                <div className="p-4 flex flex-col h-40">
                  <div className="text-gray-300 text-sm mb-2 sponsor-name">
                    {sponsor.name}
                  </div>
                  <div className="flex-1 flex items-center justify-center logo-container">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className="logo-image"
                      />
                    ) : (
                      <div className="text-xl font-medium text-slate-400">
                        {sponsor.logo}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-slate-400/10 to-slate-500/10 opacity-0 transition-opacity duration-300 ${hoveredSponsor === index + 5 ? 'opacity-100' : ''}`}
                ></div>

                {/* Animated corner badge */}
                <div className="absolute top-2 right-2 bg-slate-400 text-white w-6 h-6 flex items-center justify-center rounded-full opacity-0 transform scale-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 shadow-lg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Partners */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center category-title" style={{ color: '#7e22ce' }}>Community Partners</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                name: "AoPS - Art of Problem Solving",
                logo: "AoPS",
                logoUrl: "/sponsors/aops.png"
              },
              {
                name: "UrBuddy by OSCode",
                logo: "UrBuddy",
                logoUrl: "/sponsors/urbuddy.png"
              }
            ].map((sponsor, index) => (
              <div
                key={index}
                className="relative overflow-hidden group cursor-pointer sponsor-card community-partner"
                onMouseEnter={() => setHoveredSponsor(index + 10)}
                onMouseLeave={() => setHoveredSponsor(null)}
                style={{ animation: sponsor.animation }}
              >
                <div className="p-4 flex flex-col h-40">
                  <div className="text-gray-300 text-sm mb-2 sponsor-name">
                    {sponsor.name}
                  </div>
                  <div className="flex-1 flex items-center justify-center logo-container">
                    {sponsor.logoUrl ? (
                      <img
                        src={sponsor.logoUrl}
                        alt={sponsor.name}
                        className="logo-image"
                      />
                    ) : (
                      <div className="text-xl font-medium text-purple-400">
                        {sponsor.logo}
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 transition-opacity duration-300 ${hoveredSponsor === index + 10 ? 'opacity-100' : ''}`}
                ></div>

                {/* Animated corner badge */}
                <div className="absolute top-2 right-2 bg-purple-500 text-white w-6 h-6 flex items-center justify-center rounded-full opacity-0 transform scale-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100 shadow-lg">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            type="button"
            className="sponsor-button group"
          >
            <span className="relative z-10">Become a Sponsor</span>
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

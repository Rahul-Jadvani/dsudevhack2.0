import './NewSponsorsSection.css';
import './NewSponsorsGrid.css';

interface SponsorLogo {
  name: string;
  logoUrl: string;
  bgColor?: string;
}

export const NewSponsorsSection = () => {

  // Platinum/Track Sponsor (1 box)
  const platinumRowSponsors: SponsorLogo[] = [];

  // Gold Sponsors (4 boxes)
  const topRowSponsors: SponsorLogo[] = [
    {
     name: "AIC DSU Innovation Foundation",
      logoUrl: "/sponsors/aic-dsu.png",
    }
  ];

  // Silver Sponsors (5 boxes)
  const middleRowSponsors: SponsorLogo[] = [
    {
      name: "ETH India",
      logoUrl: "/sponsors/ethindia-light.svg",
    },
  ];

  // Community Partners (2 boxes)
  const bottomRowSponsors: SponsorLogo[] = [
    {
      name: "Devfolio",
      logoUrl: "/sponsors/Devfolio_Logo-White.png",
    },
  ];



  return (
    <section id="sponsors" className="new-sponsors-section">
      <div className="container mx-auto px-4 py-8">
        <h2 className="sponsors-title text-center mb-12">
          Our Sponsors
        </h2>



        {/* New Sponsors Grid Layout */}
        <div className="sponsors-grid-container mb-12">
          {/* Platinum Sponsors heading */}
          <div className="sponsors-grid-heading">
            <h4>Platinum Sponsors</h4>
          </div>

          {/* Platinum row - 1 extra large sponsor */}
          <div className="sponsors-platinum-row">
            {platinumRowSponsors.length > 0 ? (
              platinumRowSponsors.map((sponsor, index) => (
                <div
                  key={`platinum-${index}`}
                  className="sponsor-platinum-box"
                >
                  <div className="sponsor-name-label">
                    <span data-sponsor-el="left">{sponsor.name}</span>
                    <span data-sponsor-el="arrow">[↗]</span>
                  </div>
                  <div className="sponsor-logo-wrapper">
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      onError={(e) => {
                        // Fallback for missing images
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/200?text=' + sponsor.name;
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="sponsor-platinum-box flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-center">
                  {Array.from("COMING SOON").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block mx-1 animate-pulse"
                      style={{
                        animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ${index * 0.1}s infinite`,
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Gold Sponsors heading */}
          <div className="sponsors-grid-heading">
            <h4>Gold Sponsors</h4>
          </div>

          {/* Top row - 3 large sponsors */}
          <div className="sponsors-top-row">
            {topRowSponsors.map((sponsor, index) => (
              <div
                key={`top-${index}`}
                className="sponsor-top-box"
              >
                <div className="sponsor-name-label">
                  <span data-sponsor-el="left">{sponsor.name}</span>
                  <span data-sponsor-el="arrow">[↗]</span>
                </div>
                <div className="sponsor-logo-wrapper">
                  <img
                    src={sponsor.logoUrl}
                    alt={sponsor.name}
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/150?text=' + sponsor.name;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Silver Sponsors heading */}
          <div className="sponsors-grid-heading">
            <h4>Silver Sponsors</h4>
          </div>

          {/* Middle row - 7 smaller sponsors */}
          <div className="sponsors-middle-row">
            {middleRowSponsors.length > 0 ? (
              middleRowSponsors.map((sponsor, index) => (
                <div
                  key={`middle-${index}`}
                  className="sponsor-middle-box"
                >
                  <div className="sponsor-name-label">
                    <span data-sponsor-el="left">{sponsor.name}</span>
                    <span data-sponsor-el="arrow">[↗]</span>
                  </div>
                  <div className="sponsor-logo-wrapper">
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      onError={(e) => {
                        // Fallback for missing images
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/100?text=' + sponsor.name;
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="sponsor-middle-box flex flex-col items-center justify-center col-span-full">
                <div className="text-3xl font-bold text-center">
                  {Array.from("COMING SOON").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block mx-1 animate-pulse"
                      style={{
                        animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ${index * 0.1}s infinite`,
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Community Partners heading */}
          <div className="sponsors-grid-heading">
            <h4>Platform partner</h4>
          </div>

          {/* Bottom row - 7 smaller sponsors */}
          <div className="sponsors-bottom-row">
            {bottomRowSponsors.length > 0 ? (
              bottomRowSponsors.map((sponsor, index) => (
                <div
                  key={`bottom-${index}`}
                  className="sponsor-bottom-box"
                >
                  <div className="sponsor-name-label">
                    <span data-sponsor-el="left">{sponsor.name}</span>
                    <span data-sponsor-el="arrow">[↗]</span>
                  </div>
                  <div className="sponsor-logo-wrapper">
                    <img
                      src={sponsor.logoUrl}
                      alt={sponsor.name}
                      onError={(e) => {
                        // Fallback for missing images
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/100?text=' + sponsor.name;
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="sponsor-bottom-box flex flex-col items-center justify-center col-span-full">
                <div className="text-3xl font-bold text-center">
                  {Array.from("COMING SOON").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block mx-1 animate-pulse"
                      style={{
                        animation: `pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ${index * 0.1}s infinite`,
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>



      </div>
    </section>
  );
};

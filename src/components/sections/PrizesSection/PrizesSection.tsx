import './PrizesSection.css';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type PrizeCard = {
  place: string;
  amount: string;
  color: string;
  image: string;
};

type TrackPrize = {
  name: string;
  sponsor: string;
  prize: string;
  color: string;
  logoUrl: string;
  bgColor: string;
};

type Benefit = {
  provider: string;
  description: string;
  value?: string;
  eligibility: string;
  logoUrl?: string;
};

export const PrizesSection = () => {
  const prizes: PrizeCard[] = [
    {
      place: "1st place",
      amount: "₹1,00,000",
      color: "yellow",
      image: "/images/prizes/1st.png"
    },
    {
      place: "2nd place",
      amount: "₹40,000",
      color: "blue",
      image: "/images/prizes/2nd (2).png"
    },
    {
      place: "3rd place",
      amount: "₹20,000",
      color: "cyan",
      image: "/images/prizes/3rd.png"
    },
  ];

  const trackPrizes = [
    {
      label: 'Top 3 Tezos Projects',
      description: '$300 prize pool divided as follows: 1st - $150, 2nd - $100, 3rd - $50.',
      img: 'images/prizes/download.png',
      bgColor: '#f5f3ff',
    },
    {
      label: 'Non-top 3 Tezos/Etherlink',
      description: '$200 prize pool shared among non-top 3 Tezos/Etherlink projects, with a max of $40 per project.',
      img: 'images/prizes/verbwire.png',
      bgColor: '#e0f2fe',
    },
    {
      label: 'Best use of AI & Verbwire API',
      description: 'Up to $4000 in API Credits, for up to 15 teams',
      img: 'images/prizes/aptos.png',
      bgColor: '#fff7ed',
    },
    {
      label: 'Most innovative use of Verbwire API',
      description: 'Up to $1000 in API Credits, for up to 5 teams',
      img: 'images/prizes/polygon.png',
      bgColor: '#f3e8ff',
    },
    {
      label: 'Unique/Best dapp built on Aptos',
      description: '1 prize: $250. Winner of this track receives $100 in prizes from ETHIndia.',
      img: 'images/prizes/eth.png',
      bgColor: '#f0fdfa',
    },
  ];

  const benefits: Benefit[] = [
   
    {
      provider: "DSU DEVHACK",
      description: "All participants will get DSU DEVHACK certificates and more benefits coming soon!",
      eligibility: "Participants",
      logoUrl: "/images/images/hb-logo.png"
    }
  ];

  return (
    <>
      {/* Header bar */}
      <div className="fixed-header">
        <div className="header-content">
          <div className="header-title">Sui Overflow '25</div>
          <div className="header-date">
            <span className="date-tag">&lt;date&gt;</span> February-May, 2025 <span className="date-tag">&lt;/date&gt;</span>
          </div>
        </div>
      </div>

      <section id="prizes" className="prizes-section">
        <div className="container mx-auto px-4 md:px-8 lg:px-4 xl:px-2 max-w-full">
          <h1 className="prizes-heading">
            Prizes
          </h1>

          <div className="divider"></div>

          <h2 className="track-prizes-heading">
          </h2>

          <div className="prizes-grid">
            {prizes.map((prize, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: false, amount: 0.2 });
              let placeClass = '';
              if (prize.place.startsWith('1st')) placeClass = 'place-1';
              else if (prize.place.startsWith('2nd')) placeClass = 'place-2';
              else if (prize.place.startsWith('3rd')) placeClass = 'place-3';
              else if (prize.place.startsWith('4th')) placeClass = 'place-4';
              return (
                <motion.div
                  ref={ref}
                  className={`prize-card`}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
                  key={index}
                >
                  <div className={`prize-header ${placeClass}`}>
                    <span className="prize-header-group">
                      <span className="prize-hash">#</span>
                      <span className={`prize-place ${placeClass}`}>{prize.place}</span>
                      <span className="prize-bracket">{' }'}</span>
                    </span>
                  </div>
                  <div className="prize-content">
                    <img
                      src={prize.image}
                      alt={prize.place}
                      className="prize-image"
                    />
                  </div>
                  <div className="prize-footer">
                    <div className="prize-amount">{prize.amount}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="divider"></div>

          <h2 className="track-prizes-heading">
            Track Prizes
          </h2>

          <div className="track-prizes-screenshot-grid">
            {trackPrizes.map((trackPrize, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: false, amount: 0.2 });
              return (
                <motion.div
                  ref={ref}
                  className="track-prize-screenshot-card"
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                  transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
                  key={index}
                >
                  <div className="track-prize-rect-top" style={{ backgroundColor: trackPrize.bgColor }}>
                    <div className="track-prize-label-tilechain">
                      <div className="track-prize-label-tilebox">
                        <span className="track-prize-label-text">{trackPrize.label}</span>
                      </div>
                    </div>
                    <div className="track-prize-svg-placeholder">
                      {trackPrize.img && (
                        <img src={trackPrize.img} alt="Prize illustration" />
                      )}
                    </div>
                  </div>
                  <div className="track-prize-rect-bottom">
                    <div className="track-prize-desc">{trackPrize.description}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="divider"></div>

          <div className="benefits-section">
            <h2 className="benefits-heading">Participant Benefits</h2>
            <p className="benefits-subheading">Additional perks for participants and winners</p>

            <div className="benefits-grid">
              {benefits.map((benefit, index) => {
                const ref = useRef(null);
                const isInView = useInView(ref, { once: false, amount: 0.2 });
                return (
                  <motion.div
                    ref={ref}
                    className="benefit-card"
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                    transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
                    key={index}
                  >
                    <div className="benefit-content-box">
                      <div className="benefit-title-box">
                        {benefit.logoUrl && (
                          <div className="benefit-logo-container">
                            <img
                              src={benefit.logoUrl}
                              alt={benefit.provider}
                              className="benefit-logo"
                            />
                          </div>
                        )}
                        <div className="benefit-provider">{benefit.provider}</div>
                      </div>
                      <div className="benefit-desc-box">
                        <div className="benefit-description">{benefit.description}</div>
                        <div className="benefit-eligibility">
                          <span className="eligibility-label">Eligibility:</span> {benefit.eligibility}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Add padding at the bottom to prevent content from being hidden behind the fixed navbar */}
          <div className="pb-16"></div>
        </div>
      </section>


    </>
  );
};


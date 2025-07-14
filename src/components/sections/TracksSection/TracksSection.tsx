import "./TracksSection.css";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";



interface Track {
  name: string;
  color: string;
  description: string;
  bgClass: string;
  icon: string | JSX.Element;
  sponsor: string;
}

const TrackCard = ({ track, index }: { track: Track; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  if (isInView && !isMounted) {
    setIsMounted(true);
  }
}, [isInView, isMounted]);
  return (
<motion.div
  ref={ref}
  className={`track-card ${track.bgClass}`}
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
  transition={{
    type: "tween",
    duration: 0.3,
  delay: index * 0.005,
  ease: "easeOut"
  }}
>


      <div className="track-header">
        <span className={`track-arrow arrow-${track.bgClass}`}>→</span>
        <span className="track-name">{track.name}</span>
      </div>
      <div className="track-content-box">
        <div className="track-icon">{track.icon}</div>
        {track.description && (
          <div className="track-desc">{track.description}</div>
        )}
      </div>
    </motion.div>
  );
};

export const TracksSection = () => {
  const tracks: Track[] = [
    {
      name: "Sustainability",
      color: "green",
      description:
        "Innovate for a greener future: energy, environment, and sustainable solutions.",
      bgClass: "sustainability-bg",
      icon: (
        <img
          src="/images/sus.png"
          alt="Sustainability"
          className="track-icon-img"
          loading="lazy"
        />
      ),
      sponsor: "Eco Foundation",
    },
    {
      name: "Healthcare",
      color: "red",
      description:
        "Transform healthcare with technology: patient care, data, and wellness.",
      bgClass: "healthcare-bg",
      icon: (
        <img
          src="/images/healthcare.png"
          alt="Healthcare"
          className="track-icon-img"
          loading="lazy"
        />
      ),
      sponsor: "HealthTech Partners",
    },
    {
      name: "AI/ML",
      color: "purple",
      description:
        "Build intelligent systems: machine learning, automation, and smart apps.",
      bgClass: "aiml-bg",
      icon: (
        <img src="/images/ai ml.png" alt="AI/ML" className="track-icon-img" loading="lazy" />
      ),
      sponsor: "AI Alliance",
    },
    {
      name: "Web3 + Blockchain",
      color: "blue",
      description:
        "Decentralize the web: blockchain, smart contracts, and dApps.",
      bgClass: "web3-bg",
      icon: (
        <img
          src="/images/images/blockchain.webp"
          alt="Web3 + Blockchain"
          className="track-icon-img"
          loading="lazy"
        />
      ),
      sponsor: "Block Innovators",
    },
    {
      name: "IoT and Smart Cities",
      color: "teal",
      description:
        "Connect the world: IoT devices, smart infrastructure, and urban tech.",
      bgClass: "iot-bg",
      icon: (
        <img
          src="/images/iot.png"
          alt="IoT and Smart Cities"
          className="track-icon-img"
          loading="lazy"
          />
      ),
      sponsor: "Smart City Group",
    },
    {
      name: "Open Innovation",
      color: "orange",
      description: "Create without limits: any tech, any idea, any impact.",
      bgClass: "open-bg",
      icon: (
        <img
          src="/images/open innovation.png"
          alt="Open Innovation"
          className="track-icon-img"
          loading="lazy"
        />
      ),
      sponsor: "OpenX",
    },
  ];

  return (
    <section id="tracks" className="tracks-section">
      <div className="container">
        <h2 className="tracks-title">Tracks</h2>
        <div className="tracks-grid">
          {tracks.map((track, idx) => (
            <TrackCard track={track} index={idx} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

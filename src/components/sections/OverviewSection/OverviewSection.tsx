import { KeyboardCanvas } from '../../three/KeyboardCanvas';
import './OverviewSection.css';

interface OverviewSectionProps {
  theme: string;
}

export const OverviewSection = ({ theme }: OverviewSectionProps) => {
  return (
    <section id="overview" className="overview-section">
      <div className="overview-content">
        <h2 className="overview-title">
          Event Overview
        </h2>
        <div className="space-y-6">
          <p className="overview-text">
            <span className="hello">DSU DEVHACK 2025</span> is a national-level hackathon pushing the boundaries of innovation in AI, ML, IoT, Blockchain, Cybersecurity, and Cloud Computing at DSU Harohalli, Banglore, Karnataka. 🛠️
          </p>
          <p className="overview-highlight">
            This event gathers brilliant minds nationwide to create revolutionary solutions. It provides a platform for developers, designers, and enthusiasts to transform ideas, showcase skills, and network. 🤝
          </p>
          <p className="overview-text">
            Your keyboard is your sword, your idea is your challenge, code is your vision, and DSU DEVHACK is your stage! 🚨See you all in the hackathon!🔍💻  
          </p>
        </div>
      </div>
    </section>
  );
};

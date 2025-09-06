import React, { useState } from 'react';

interface Judge {
  name: string;
  designation: string;
  company: string;
  bio: string;
  linkedin: string;
}

interface JudgeCardProps {
  judge: Judge;
  index: number;
}

const JudgeCard: React.FC<JudgeCardProps> = ({ judge, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="judge-card"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="judge-content">
        {judge.linkedin && (
          <a 
            href={judge.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="judge-linkedin-icon"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        )}
        
        <div className="judge-info">
          <h3 className="judge-name">{judge.name}</h3>
          <p className="judge-designation">{judge.designation}</p>
          <p className="judge-company">{judge.company}</p>
        </div>
        
        <div 
          className={`judge-bio ${isHovered ? 'judge-bio-expanded' : ''}`}
        >
          <p className="judge-bio-text">{judge.bio}</p>
        </div>
        
        <a 
          href={judge.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="judge-linkedin-icon"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default JudgeCard;

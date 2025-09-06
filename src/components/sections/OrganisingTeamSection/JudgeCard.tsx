import React from 'react';
// Updated to fix getJudgeImageUrl function

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

// Helper function to get the correct image URL for each judge
const getJudgeImageUrl = (judgeName: string): string => {
  const imageMap: { [key: string]: string } = {
    'Kumar Satyarth': '/images/judges/kumar.jpeg',
    'Ashish Shukla': '/images/judges/ashish.jpg', 
    'Tarun Agarwal': '/images/judges/tarun.jpeg',
    'Devraj Kumar': '/images/judges/devraj.jpeg',
    'Mritunjai Rai': '/images/judges/Mritunjai.jpeg',
    'Abhay Singh': '/images/judges/Abhay singh.jpeg',
    'Velagandula Sai Teja': '/images/judges/saiteja.jpeg',
    'Prashant Srivastava': '/images/judges/Prashant.jpeg',
    'Abhay Chauhan': '/images/judges/Abhay chauhan.jpeg',
    'Ayush Gupta': '/images/judges/ayush.jpeg',
    'Upasana Singh': '/images/judges/upasana.jpeg',
    'Vishwachi Choudhary': '/images/judges/vishwachi.jpeg'
  };
  
  return imageMap[judgeName] || '/images/judges/kumar.jpeg'; 
};

const JudgeCard: React.FC<JudgeCardProps> = ({ judge, index }) => {
  return (
    <div 
      className="judge-card"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="judge-image-container">
        <img 
          src={getJudgeImageUrl(judge.name)}
          alt={judge.name}
          loading='lazy'
          className="judge-image"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const placeholder = target.nextElementSibling as HTMLElement;
            if (placeholder) placeholder.style.display = 'flex';
          }}
        />
        <div className="judge-placeholder" style={{ display: 'none' }}>
          <span className="judge-initials">
            {judge.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
      </div>
      
      <div className="judge-info">
        <h3 className="judge-name">{judge.name}</h3>
        <p className="judge-designation">{judge.designation}</p>
        <p className="judge-company">{judge.company}</p>
      </div>
      
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
    </div>
  );
};

export default JudgeCard;

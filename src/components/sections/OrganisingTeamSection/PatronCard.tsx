import React from "react";

interface Patron {
  name: string;
  designation: string;
  imageSrc: string;
}

interface PatronCardProps {
  patron: Patron;
  index: number;
}

const PatronCard: React.FC<PatronCardProps> = ({ patron, index }) => {
  return (
    <div className="patron-card-wrapper">
      <div className="patron-designation-above">
        {patron.designation}
      </div>
      <div 
        className="patron-card"
        style={{
          animationDelay: `${index * 0.1}s`
        }}
      >
        <div className="patron-image-container">
          <img 
            src={patron.imageSrc} 
            alt={patron.name}
            loading='lazy'
            className="patron-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' font-family='Arial, sans-serif' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EPatron%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div className="patron-info">
          <h3 className="patron-name">{patron.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default PatronCard;
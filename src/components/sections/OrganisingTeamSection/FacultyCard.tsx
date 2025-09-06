import React from 'react';

interface FacultyMember {
  imageSrc: string;
  name: string;
  designation: string;
}

interface FacultyCardProps {
  faculty: FacultyMember;
  index: number;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ faculty, index }) => {
  return (
    <div 
      className="faculty-card"
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="faculty-image-container">
        <img 
          src={faculty.imageSrc} 
          alt={faculty.name}
          loading='lazy'
          className="faculty-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' font-family='Arial, sans-serif' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3EFaculty Member%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>
      <div className="faculty-info">
        <h3 className="faculty-name">{faculty.name}</h3>
        <p className="faculty-designation">{faculty.designation}</p>
      </div>
    </div>
  );
};

export default FacultyCard;

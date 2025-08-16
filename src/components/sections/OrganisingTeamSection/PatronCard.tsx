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
    <div className="flex flex-col items-center gap-1"> {/* Reduced gap between badge and card */}
      {/* Designation Badge - Clean and Simple */}
      <div className="px-4 py-1">
  <span className="text-gray-800 text-lg font-semibold">
    {patron.designation}
  </span>
</div>


      {/* Tightly Fitted Image Card */}
      <div 
        className="relative w-56 h-60 rounded-xl overflow-hidden group transition-all duration-500 hover:scale-[1.00] hover:shadow-xl bg-white"
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url('${patron.imageSrc}')` }}
        />
        
        {/* Name Plate - Snug to bottom edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="bg-white/70 px-4 py-2 mx-2 mb-2 rounded-lg shadow-sm">
            <h3 className="text-gray-800 font-bold text-lg text-center">
              {patron.name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatronCard;
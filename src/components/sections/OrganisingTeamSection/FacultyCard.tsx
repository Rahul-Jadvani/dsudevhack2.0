import React from 'react';

interface TeamMember {
    name: string;
    role: string;
    contact?: string;
    designation?: string;
    instagram: string;
    linkedin: string;
    imageSrc?: string;
}

interface FacultyCardProps {
    member: TeamMember;
    cardIndex?: number;
}

const FacultyCard: React.FC<FacultyCardProps> = ({ member, cardIndex = 0 }) => {
    // Function to determine color class based on card index (6 different colors)
    const getColorClass = (index: number) => {
        const colors = [
            'bg-card-blue',      // Faculty Coordinator
            'bg-card-purple',    // Student Coordinator 1
            'bg-card-cyan',      // Student Coordinator 2
            'bg-card-yellow',    // Student Coordinator 3
            'bg-card-orange',    // Web Team Head
            'bg-card-pink'       // Marketing & Cultural Head
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="relative w-full h-[300px] rounded-[1.6em] overflow-hidden shadow-lg">
            {/* Background Image */}
            <div 
                className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat ${member.imageSrc ? '' : getColorClass(cardIndex)}`}
                style={member.imageSrc ? { backgroundImage: `url('${member.imageSrc}')` } : {}}
            />

            

            {/* Member Info - Always Visible */}
            <div className="absolute bottom-4 left-4 z-20">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg max-w-xs min-w-[180px] w-fit border border-white/20 shadow-md">
                    <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
                    <p className="text-base text-black mb-0.5">{member.role}</p>
                    {member.contact && <p className="text-sm text-black">{member.contact}</p>}
                    {member.designation && <p className="text-sm text-black">{member.designation}</p>}
                </div>
            </div>
        </div>
    );
};

export default FacultyCard;

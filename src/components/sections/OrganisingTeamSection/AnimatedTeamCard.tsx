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

interface AnimatedTeamCardProps {
    member: TeamMember;
    delay?: number;
    cardIndex?: number;
}

const AnimatedTeamCard: React.FC<AnimatedTeamCardProps> = ({ member, delay = 0, cardIndex = 0 }) => {
    // Function to determine color class based on card index (6 different colors)
    const getColorClass = (index: number) => {
        const colors = [
            'bg-card-blue',      // Faculty Coordinator
            'bg-card-purple',     // Student Coordinator 1
            'bg-card-cyan',       // Student Coordinator 2
            'bg-card-yellow',     // Student Coordinator 3
            'bg-card-orange',     // Web Team Head
            'bg-card-pink'        // Marketing & Cultural Head
        ];
        return colors[index % colors.length];
    };

    return (
        <div
            className="group relative w-full h-[300px] bg-gray-300 rounded-[1.6em] overflow-hidden shadow-lg animate-smooth cursor-pointer select-none hover:scale-105"
            style={{ animationDelay: `${delay}s` }}
        >
            {/* Background Image (with blur on hover) */}
            <div className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-300 ${member.imageSrc ? '' : getColorClass(cardIndex)} group-hover:blur-sm`}
                style={member.imageSrc ? { backgroundImage: `url('${member.imageSrc}')` } : {}} />

            {/* Member Image - Only appears on hover */}
            <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 animate-smooth z-10 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bottom-8 group-hover:right-8">
                <img
                    src={member.imageSrc || "/images/memb.png"}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-lg"
                />
            </div>

            {/* Member Info - Always Visible, Disappears on Hover */}
            <div className="absolute bottom-4 left-4 z-20 animate-smooth group-hover:opacity-0 group-hover:transform group-hover:translate-y-4">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg max-w-xs min-w-[180px] w-fit border border-white/20 shadow-md">
                    <h3 className="text-xl font-bold text-black mb-1 drop-shadow-lg">{member.name}</h3>
                    <p className="text-base text-black mb-0.5 drop-shadow-lg">{member.role}</p>
                    {member.contact && <p className="text-sm text-black drop-shadow-lg">{member.contact}</p>}
                    {member.designation && <p className="text-sm text-black drop-shadow-lg">{member.designation}</p>}
                </div>
            </div>

            {/* Animated Boxes */}
            <div
                className="absolute w-[70%] h-[70%] bottom-[-70%] left-[-70%] p-4 text-right bg-white/60 border-t-2 border-r border-white rounded-custom shadow-lg transform-origin-bottom-left animate-smooth-slow group-hover:bottom-[-0.1em] group-hover:left-[-0.1em] cursor-pointer hover:bg-white/80"
                onClick={() => window.open(member.instagram, '_blank', 'noopener,noreferrer')}
            >
                <div className="relative w-8 h-8">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-gray-600 animate-smooth hover:fill-gray-800">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                </div>
            </div>

            <div
                className="absolute w-[50%] h-[50%] bottom-[-50%] left-[-50%] p-4 text-right bg-white/60 border-t-2 border-r border-white rounded-custom shadow-lg transform-origin-bottom-left animate-smooth-slow transition-delay-200 group-hover:bottom-[-0.1em] group-hover:left-[-0.1em] cursor-pointer hover:bg-white/80"
                onClick={() => window.open(member.linkedin, '_blank', 'noopener,noreferrer')}
            >
                <div className="relative w-8 h-8">
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-gray-600 animate-smooth hover:fill-gray-800">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </div>
            </div>

            <div className="absolute w-[30%] h-[30%] bottom-[-30%] left-[-30%] p-4 text-right bg-white/60 border-t-2 border-r border-white rounded-custom shadow-lg transform-origin-bottom-left animate-smooth-slow transition-delay-400 group-hover:bottom-[-0.1em] group-hover:left-[-0.1em]">
                <div className="relative w-10 h-10">
                    <img
                        src="/images/logos/logoo9.png"
                        alt="Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>

            <div className="absolute w-[10%] h-[10%] bottom-[-10%] left-[-10%] bg-white/60 border-t-2 border-r border-white rounded-custom shadow-lg transform-origin-bottom-left animate-smooth-slow transition-delay-600 group-hover:bottom-[-0.1em] group-hover:left-[-0.1em]" />
        </div>
    );
};

export default AnimatedTeamCard; 
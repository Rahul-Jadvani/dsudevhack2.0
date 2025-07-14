"use client";

import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./OrganisingTeamSection.css";
import AnimatedTeamCard from "./AnimatedTeamCard";

const team = {
    professorCoordinator: {
        role: "Faculty Coordinator",
        name: "Dr. Bipin Kumar Rai",
        designation: "Professor, CSE",
        instagram: "https://instagram.com/your_instagram_handle",
        linkedin: "https://linkedin.com/in/your_linkedin_handle",
        imageSrc: "/images/members/sir.jpg"
    },
    studentCoordinators: [
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator",
            name: "Utkarsh Priye (Jha)",
            instagram: "https://www.instagram.com/codex_ukj",
            linkedin: "https://www.linkedin.com/in/utkarsh-priye-jha",
            imageSrc: "/images/members/Utkarsh.jpg"
        },
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator",
            name: "Ritvik Vasundh",
            instagram: "https://www.instagram.com/ritvik.you/",
            linkedin: "https://www.linkedin.com/in/ritvikvasundh/",
            imageSrc: "/images/members/Ritvik.JPG"
        },
        {
            emoji: "🧑‍🎓",
            role: "Student Coordinator & Design Head",
            name: "Jiya Patel",
            instagram: "https://instagram.com/your_instagram_handle",
            linkedin: "https://linkedin.com/in/your_linkedin_handle",
            imageSrc: "/images/members/Jiya.webp"
        },
    ],
    webTeamHeads: [
        {
            emoji: "💻",
            role: "Web Team Head",
            name: "Rahul Jadvani",
            instagram: "https://www.instagram.com/rahul.jadvani.47",
            linkedin: "http://www.linkedin.com/in/rahul-jadvani",
            imageSrc: "/images/members/Rahul.jpg"
        },
    ],
    designTeamHead: {
        emoji: "🎨",
        role: "Marketing & Cultural Head",
        name: "Ashwin",
        instagram: "https://www.instagram.com/ft.knocknards",
        linkedin: "https://linkedin.com/in/your_linkedin_handle",
        imageSrc: "/images/members/Ashwin.jpg"
    },
    // Organize team members by their respective teams
    webTeam: [
        { emoji: "🧑‍🎓", label: "Sachin Baluragi", role: "Web Team Co-Head", instagram: "https://www.instagram.com/_iamthehonouredone/profilecard/?igsh=N29xOGhpeXkzbG01", linkedin: "https://linkedin.com/in/your_linkedin_handle", imageSrc: "/images/members/Sachin.jpg" },
        { emoji: "🧑‍🎓", label: "S Shreenidhi", role: "Web Dev", instagram: "https://www.instagram.com/sreenidhi_s.29?igsh=OHBvMjMzYWMyNGgz", linkedin: "http://www.linkedin.com/in/shreenidhi-s29", imageSrc: "/images/members/S Shreenidhi.jpg" },
        { emoji: "🧑‍🎓", label: "G Nithesh", role: "Web Dev", instagram: "https://www.instagram.com/__nithesh__03?igsh=MXZ1NzZuMGtndHNodw%3D%3D&utm_source=qr", linkedin: "http://www.linkedin.com/in/g-nithesh-495380311", imageSrc: "/images/members/G Nithesh.HEIC" },
        { emoji: "🧑‍🎓", label: "Manavi P", role: "Web Dev", instagram: "https://www.instagram.com/_._manavi_._/", linkedin: "https://www.linkedin.com/in/manavi-p-576a8b279/", imageSrc: "/images/members/Manavi.jpg" },
    ],
    designTeam: [
        { emoji: "🎨", label: "Mayur", role: "Design Team", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://www.linkedin.com/in/mayur-adithya-2324aa31b", imageSrc: "/images/members/Mayur.jpg" },
        { emoji: "🎨", label: "Niharika Trivedi", role: "Design Team", instagram: "https://www.instagram.com/niharika__trivedi?igsh=MTVpNWQxemdjcjNxYw%3D%3D&utm_source=qr", linkedin: "https://www.linkedin.com/", imageSrc: "/images/members/Niharika.jpg" },
        { emoji: "🎨", label: "Moulya", role: "Design Team", instagram: "https://www.instagram.com/prasad.moulya", linkedin: "https://in.linkedin.com/in/moulya-b-9435632b5", imageSrc: "/images/members/moulya.jpg" },
        { emoji: "🎨", label: "Moulika", role: "Design Team", instagram: "https://www.instagram.com/moulika.k.reddy", linkedin: "https://www.linkedin.com/in/moulika-k-ba8694335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", imageSrc: "/images/members/moulika.jpg" },
        { emoji: "🎨", label: "Raksha", role: "Design Team", instagram: "https://www.instagram.com/_.raksha.umashankar._", linkedin: "https://www.linkedin.com/in/moulika-k-ba8694335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", imageSrc: "/images/members/raksha.JPG" },
        { emoji: "🎨", label: "Trisha", role: "Design Team", instagram: "https://www.instagram.com/trishaaa.10.___", linkedin: "https://www.linkedin.com/feed/", imageSrc: "/images/members/Trisha.PNG" },
        { emoji: "🎨", label: "Aastha", role: "Design Team", instagram: "https://www.instagram.com/aastha_6696", linkedin: "https://linkedin.com/in/your_linkedin_handle", imageSrc: "/images/members/aastha.jpg" },
    ],
    marketingTeam: [
        { emoji: "📢", label: "Ahmad", role: "Marketing Team", instagram: "https://www.instagram.com/ahhmaddx_", linkedin: "https://linkedin.com/in/your_linkedin_handle", imageSrc: "/images/members/ahmad.jpg" },
        { emoji: "📢", label: "Vivan", role: "Marketing Team", instagram: "https://www.instagram.com/vivan_rajiv_336?igsh=ZXJ2bWVnM24wM2g0", linkedin: "https://www.linkedin.com/in/vivan-rajiv-yenagimath-950b4a2b1?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", imageSrc: "/images/members/vivan_rajiv_336.jpg" },
        { emoji: "📢", label: "Niharika Trivedi", role: "Marketing Team", instagram: "https://www.instagram.com/niharika__trivedi?igsh=MTVpNWQxemdjcjNxYw%3D%3D&utm_source=qr", linkedin: "https://www.linkedin.com/", imageSrc: "/images/members/Niharika.jpg" },
        { emoji: "📢", label: "Trisha", role: "Marketing Team", instagram: "https://www.instagram.com/trishaaa.10.___", linkedin: "https://www.linkedin.com/feed/", imageSrc: "/images/members/Trisha.PNG" }
    ],
    sponsorshipTeam: [
        { emoji: "🤝", label: "Utkarsh Priye (Jha)", role: "Sponsorship Team", instagram: "https://www.instagram.com/codex_ukj", linkedin: "https://www.linkedin.com/in/utkarsh-priye-jha", imageSrc: "/images/members/Utkarsh.jpg" },
        { emoji: "🤝", label: "Ritvik Vasundh", role: "Sponsorship Team", instagram: "https://www.instagram.com/ritvik.you/", linkedin: "https://www.linkedin.com/in/ritvikvasundh/", imageSrc: "/images/members/Ritvik.JPG" },
        { emoji: "🤝", label: "Trisha", role: "Sponsorship Team", instagram: "https://www.instagram.com/trishaaa.10.___", linkedin: "https://www.linkedin.com/feed/", imageSrc: "/images/members/Trisha.PNG" },
        { emoji: "🤝", label: "Ahmad", role: "Sponsorship Team", instagram: "https://www.instagram.com/ahhmaddx_", linkedin: "https://linkedin.com/in/your_linkedin_handle", imageSrc: "/images/members/ahmad.jpg" }
    ]
};

// Social Media Icons Component
const SocialMediaIcons = ({ instagram, linkedin }: { instagram: string; linkedin: string }) => (
    <div className="flex justify-center space-x-3 mt-3">
        <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        </a>
        <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        </a>
    </div>
);

// Helper function to format role text with line breaks
const formatRole = (role: string) => {
    return role.split('&').map((part, index) => (
        <div key={index} className="leading-tight">
            {part.trim()}
        </div>
    ));
};

// Tab Component
const TabButton = ({
    isActive,
    onClick,
    children,
    icon
}: {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
    icon: string;
}) => (
    <button
        onClick={onClick}
        className={`team-tab-button flex items-center justify-center px-3 sm:px-6 py-3 rounded-lg font-medium ${isActive ? 'active' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
    >
        {icon && <span className="text-xl mr-2">{icon}</span>}
        <span>{children}</span>
    </button>
);

export const OrganisingTeamSection = () => {
    // Animation on in-view
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.15 });

    // Tab state
    const [activeTab, setActiveTab] = React.useState<'web' | 'design' | 'marketing' | 'sponsorship'>('web');

    React.useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } });
        } else {
            controls.start({ opacity: 0, y: 60 });
        }
    }, [inView, controls]);

    // Get current team members based on active tab
    const getCurrentTeamMembers = () => {
        switch (activeTab) {
            case 'web':
                return team.webTeam;
            case 'design':
                return team.designTeam;
            case 'marketing':
                return team.marketingTeam;
            case 'sponsorship':
                return team.sponsorshipTeam;
            default:
                return team.webTeam;
        }
    };

    return (
        <motion.section
            id="organising-team"
            className="organising-team-section"
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={controls}
        >
            <div className="container mx-auto px-2 sm:px-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 organising-team-title" style={{ marginTop: '2.5rem' }}>
                    Organising Team
                </h2>

                {/* Animated Cards Grid for 6 Main Members */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
                    {/* Faculty Coordinator */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                    >
                        <AnimatedTeamCard member={team.professorCoordinator} delay={0.05} cardIndex={0} />
                    </motion.div>

                    {/* Student Coordinators */}
                    {team.studentCoordinators.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 + (idx * 0.05) }}
                        >
                            <AnimatedTeamCard member={member} delay={0.1 + (idx * 0.05)} cardIndex={1 + idx} />
                        </motion.div>
                    ))}

                    {/* Web Team Head */}
                    {team.webTeamHeads.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.25 }}
                        >
                            <AnimatedTeamCard member={member} delay={0.25} cardIndex={4} />
                        </motion.div>
                    ))}

                    {/* Design Team Head */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 }}
                    >
                        <AnimatedTeamCard member={team.designTeamHead} delay={0.3} cardIndex={5} />
                    </motion.div>
                </div>

                {/* Meet the Entire Team Section with Tabs */}
                <div className="mt-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 organising-team-title">
                        Meet the Entire Team
                    </h2>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-8 px-4">
                        <div className="team-tabs flex">
                            <TabButton
                                isActive={activeTab === 'web'}
                                onClick={() => setActiveTab('web')}
                                icon=""
                            >
                                Web Team
                            </TabButton>
                            <TabButton
                                isActive={activeTab === 'design'}
                                onClick={() => setActiveTab('design')}
                                icon=""
                            >
                                Design Team
                            </TabButton>
                            <TabButton
                                isActive={activeTab === 'marketing'}
                                onClick={() => setActiveTab('marketing')}
                                icon=""
                            >
                                Marketing Team
                            </TabButton>
                            <TabButton
                                isActive={activeTab === 'sponsorship'}
                                onClick={() => setActiveTab('sponsorship')}
                                icon=""
                            >
                                Sponsorship Team
                            </TabButton>
                        </div>
                    </div>

                    {/* Team Members Grid */}
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    >
                        {getCurrentTeamMembers().map((member, index) => (
                            <motion.div
                                key={`${activeTab}-${member.label}-${index}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    ease: 'easeOut',
                                    delay: index * 0.08,
                                    type: "spring",
                                    stiffness: 100
                                }}
                            >
                                <AnimatedTeamCard
                                    member={{
                                        name: member.label,
                                        role: member.role,
                                        instagram: member.instagram,
                                        linkedin: member.linkedin,
                                        imageSrc: member.imageSrc
                                    }}
                                    delay={0}
                                    cardIndex={index}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}; 
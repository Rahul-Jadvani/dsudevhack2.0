"use client";
import CircularGallery from '@/components/ui/CircularGallery';
import * as React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./OrganisingTeamSection.css";
import AnimatedTeamCard from "./AnimatedTeamCard";
import FacultyCard from "./FacultyCard";
import PatronCard from "./PatronCard";

const chief=[
  { 
    imageSrc : "/images/one.jpg", 
    name: "Dr. D. Hemachandra Sagar",
    designation: "Chancellor, DSU",
  },
  { 
    imageSrc: "/images/two.jpeg", 
    name: "Dr. D. Premachandra Sagar", 
    designation: "Pro Chancellor, DSU" 
  },
];

const patrons = [
  { 
    imageSrc: "/images/three.jpg", 
    name: "Dr. B. S. Satyanarayana",   
    designation: "Vice Chancellor, DSU" 
  },
  { 
    imageSrc: "/images/four.jpg", 
    name: "Prof. R Janardhan",    
    designation: "Pro Vice Chancellor, DSU" 
  },
  { 
    imageSrc: "/images/five.jpg", 
    name: "Dr. Prakash S",   
    designation: "Pro Vice Chancellor, DSU" 
  },
  { 
    imageSrc: "/images/six.jpg", 
    name: "Dr. C.Puttamadappa", 
    designation: "Registrar, DSU" 
  },
  { 
    imageSrc: "/images/seven.jpeg", 
    name: "Dr.Udaya Kumar Reddy K.R", 
    designation: "Professor & Dean-SoE" 
  },
  {
    imageSrc: "/images/eight.jpg", 
    name: "Dr. Girisha G S", 
    designation: "Chairperson, CSE" 
  }
];

const team = {
  professorCoordinator: {
    role: "Faculty Coordinator",
    name: "Dr. Bipin Kumar Rai",
    designation: "Professor, CSE",
    instagram: "https://instagram.com/your_instagram_handle",
    linkedin: "https://www.linkedin.com/in/dr-bipin-kumar-rai-b3a41690/",
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
    { emoji: "🧑‍🎓", label: "G Nithesh", role: "Web Dev", instagram: "https://www.instagram.com/__nithesh__03?igsh=MXZ1NzZuMGtndHNodw%3D%3D&utm_source=qr", linkedin: "http://www.linkedin.com/in/g-nithesh-495380311", imageSrc: "/images/members/G Nithesh.jpg" },
    { emoji: "🧑‍🎓", label: "Manavi P", role: "Web Dev", instagram: "https://www.instagram.com/_._manavi_._/", linkedin: "https://www.linkedin.com/in/manavi-p-576a8b279/", imageSrc: "/images/members/Manavi.jpg" },
  ],
  designTeam: [
    { emoji: "🎨", label: "Mayur", role: "Design Team", instagram: "https://instagram.com/your_instagram_handle", linkedin: "https://www.linkedin.com/in/mayur-adithya-2324aa31b", imageSrc: "/images/members/Mayur.jpg" },
    { emoji: "🎨", label: "Niharika Trivedi", role: "Design Team", instagram: "https://www.instagram.com/niharika__trivedi?igsh=MTVpNWQxemdjcjNxYw%3D%3D&utm_source=qr", linkedin: "https://www.linkedin.com/", imageSrc: "/images/members/Niharika.jpg" },
    { emoji: "🎨", label: "Moulya B", role: "Design Team", instagram: "https://www.instagram.com/prasad.moulya", linkedin: "https://in.linkedin.com/in/moulya-b-9435632b5", imageSrc: "/images/members/moulya.jpg" },
    { emoji: "🎨", label: "Moulika K", role: "Design Team", instagram: "https://www.instagram.com/moulika.k.reddy", linkedin: "https://www.linkedin.com/in/moulika-k-ba8694335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", imageSrc: "/images/members/moulika.jpg" },
    { emoji: "🎨", label: "Raksha U ", role: "Design Team", instagram: "https://www.instagram.com/_.raksha.umashankar._", linkedin: "https://www.linkedin.com/in/moulika-k-ba8694335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", imageSrc: "/images/members/raksha.JPG" },
  ],
  marketingTeam: [
    { emoji: "📢", label: "Ahmad", role: "Marketing Team", instagram: "https://www.instagram.com/ahhmaddx_", linkedin: "https://linkedin.com/in/your_linkedin_handle", imageSrc: "/images/members/ahmad.jpg" },
    { emoji: "📢", label: "Nishchal Gowda R", role: "Marketing Team", instagram: "https://www.instagram.com/i.amgod.666?igsh=MXQzMG5xcG55aGRqcg==", linkedin: "https://www.linkedin.com/in/nishchal-gowda-r-b54208311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", imageSrc: "/images/members/Nishchal.jpg" },
    { emoji: "📢", label: "Chinmayi Palled", role: "Content Creator", instagram: "https://www.instagram.com/chinmayipalled/", linkedin: "https://linkedin.com/in/your_linkedin_handle", imageSrc: "/images/members/chinmayi.jpeg" },
  ],
  sponsorshipTeam: [
    { emoji: "🤝", label: "Utkarsh Priye (Jha)", role: "Sponsorship Team", instagram: "https://www.instagram.com/codex_ukj", linkedin: "https://www.linkedin.com/in/utkarsh-priye-jha", imageSrc: "/images/members/Utkarsh.jpg" },
    { emoji: "🤝", label: "Ritvik Vasundh", role: "Sponsorship Team", instagram: "https://www.instagram.com/ritvik.you/", linkedin: "https://www.linkedin.com/in/ritvikvasundh/", imageSrc: "/images/members/Ritvik.JPG" },
    { emoji: "🤝", label: "Trisha", role: "Sponsorship Team", instagram: "https://www.instagram.com/trishaaa.10.___", linkedin: "https://www.linkedin.com/feed/", imageSrc: "/images/members/Trisha.PNG" },
    { emoji: "🤝", label: "Aastha", role: "Sponsorship Team", instagram: "https://www.instagram.com/aastha_6696", linkedin: "https://linkedin.com/in/your_linkedin_handle", imageSrc: "/images/members/aastha.jpg" },
  ],
};

// Social Media Icons Component
const SocialMediaIcons = ({ instagram, linkedin }: { instagram: string; linkedin: string }) => (
  <div className="flex justify-center space-x-3 mt-3">
    {/* ...icons unchanged... */}
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
    className={`team-tab-button flex items-center justify-center px-3 sm:px-6 py-3 rounded-lg font-medium ${isActive ? 'active' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'}`}
  >
    {icon && <span className="text-xl mr-2">{icon}</span>}
    <span>{children}</span>
  </button>
);

export const OrganisingTeamSection = () => {
  // Animation on in-view with mobile-friendly settings
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px"
  });

  // Tab state
  const [activeTab, setActiveTab] = React.useState<'web' | 'design' | 'marketing' | 'sponsorship'>('web');
  const [currentView, setCurrentView] = React.useState<'team' | 'faculty' | 'patrons'>('team');

  React.useEffect(() => {
    if (inView) {
      controls.start({ 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.5, 
          ease: 'easeOut',
          when: "beforeChildren"
        } 
      });
    }
  }, [inView, controls]);

  // Get current team members based on active tab
  const getCurrentTeamMembers = () => {
    switch (activeTab) {
      case 'web': return team.webTeam;
      case 'design': return team.designTeam;
      case 'marketing': return team.marketingTeam;
      case 'sponsorship': return team.sponsorshipTeam;
      default: return team.webTeam;
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
      {/* MOBILE-ONLY TOP PADDING HERE */}
      <div className="container mx-auto px-2 sm:px-4 pt-8 sm:pt-0">
        {/* TABS: MOBILE-ONLY TOP MARGIN + Z-INDEX */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 sm:mt-0 mb-8 sm:mb-12 relative z-10">
          <button
            onClick={() => setCurrentView('team')}
            className={`px-6 py-2 rounded-lg font-medium ${currentView === 'team' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Organizing Team
          </button>
          <button
            onClick={() => setCurrentView('patrons')}
            className={`px-6 py-2 rounded-lg font-medium ${currentView === 'patrons' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Patrons
          </button>
          <button
            onClick={() => setCurrentView('faculty')}
            className={`px-6 py-2 rounded-lg font-medium ${currentView === 'faculty' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Faculty
          </button>
        </div>

        {currentView === 'team' ? (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 organising-team-title" style={{ marginTop: '2.5rem' }}>
              Organising Team
            </h2>

            {/* Animated Cards Grid for 6 Main Members */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {/* Faculty Coordinator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: "tween", duration: 0.5, delay: 0.05 }
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <AnimatedTeamCard member={team.professorCoordinator} delay={0.05} cardIndex={0} />
              </motion.div>

              {/* Student Coordinators */}
              {team.studentCoordinators.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { type: "tween", duration: 0.5, delay: 0.1 + (idx * 0.05) }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <AnimatedTeamCard member={member} delay={0.1 + (idx * 0.05)} cardIndex={1 + idx} />
                </motion.div>
              ))}

              {/* Web Team Head */}
              {team.webTeamHeads.map((member, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: { type: "tween", duration: 0.5, delay: 0.25 }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <AnimatedTeamCard member={member} delay={0.25} cardIndex={4} />
                </motion.div>
              ))}

              {/* Design Team Head */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { type: "tween", duration: 0.5, delay: 0.3 }
                }}
                viewport={{ once: true, margin: "-50px" }}
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
                  <TabButton isActive={activeTab === 'web'} onClick={() => setActiveTab('web')} icon="">
                    Web Team
                  </TabButton>
                  <TabButton isActive={activeTab === 'design'} onClick={() => setActiveTab('design')} icon="">
                    Design Team
                  </TabButton>
                  <TabButton isActive={activeTab === 'marketing'} onClick={() => setActiveTab('marketing')} icon="">
                    Marketing Team
                  </TabButton>
                  <TabButton isActive={activeTab === 'sponsorship'} onClick={() => setActiveTab('sponsorship')} icon="">
                    Sponsorship Team
                  </TabButton>
                </div>
              </div>

              {/* Team Members Grid */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.3, ease: 'easeOut' }}
                className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              >
                {getCurrentTeamMembers().map((member, index) => (
                  <motion.div
                    key={`${activeTab}-${member.label}-${index}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { type: "tween", duration: 0.5, delay: index * 0.05 }
                    }}
                    viewport={{ once: true, margin: "-50px" }}
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
          </>
        ) : currentView === 'faculty' ? (
          <>
            {/* Faculty Coordinator Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-center mb-8 organising-team-title">
                Faculty Coordinator
              </h3>
              <div className="flex justify-center">
                <FacultyCard 
                  faculty={{
                    imageSrc: team.professorCoordinator.imageSrc,
                    name: team.professorCoordinator.name,
                    designation: team.professorCoordinator.role + " - " + team.professorCoordinator.designation
                  }} 
                  index={0} 
                />
              </div>
            </div>

            {/* Organising Team Members Section */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8 organising-team-title">
                Organising Team Members
              </h3>
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { name: "Dr. Meenakshi Malhotra", designation: "Associate Professor", imageSrc: "/images/Meenakshi.jpg" },
                  { name: "Dr. Sivananda Reddy", designation: "Associate Professor", imageSrc: "/images/sivananda.jpg" },
                  { name: "Prof. Bharath M B", designation: "Assistant Professor", imageSrc: "/images/bharatm.jpg" },
                  { name: "Prof. Dharmendra D P", designation: "Assistant Professor", imageSrc: "/images/Dharmendra.jpg" },
                  { name: "Dr. Kumar Dilip", designation: "Associate Professor", imageSrc: "/images/DrKumar.jpg" },
                  { name: "Prof. Yashaswini H C", designation: "Assistant Professor", imageSrc: "/images/Yashaswini.jpg" },
                  { name: "Dr. Shreekant Salotagi", designation: "Assistant Professor", imageSrc: "/images/Shreekant.jpg" },
                  { name: "Dr. Naresh P", designation: "Assistant Professor", imageSrc: "" },
                  { name: "Prof. Smriti Bharti", designation: "Assistant Professor", imageSrc: "/images/Smriti.jpg" },
                  { name: "Prof. Shivani", designation: "Assistant Professor", imageSrc: "" },
                  { name: "Dr Naitik ST", designation: "Assistant Professor", imageSrc: "/images/Naitik.jpg" }
                ].map((faculty, i) => (
                  <FacultyCard 
                    key={i + 1}
                    faculty={{
                      imageSrc: faculty.imageSrc,
                      name: faculty.name,
                      designation: faculty.designation
                    }} 
                    index={i + 1} 
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 organising-team-title" style={{ marginTop: '2.5rem' }}>
              Chief Patrons
            </h2>

            <div className="flex flex-wrap justify-center gap-6 p-8 pb-0">
              {chief.map((patron, index) => (
                <PatronCard patron={patron} key={index} index={index} />
              ))}
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 organising-team-title" style={{ marginTop: '2.5rem' }}>
              Patrons
            </h2>

            <div className="flex flex-wrap justify-center gap-6 p-8">
              {patrons.map((patron, index) => (
                <PatronCard patron={patron} key={index} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.section>
  );
};

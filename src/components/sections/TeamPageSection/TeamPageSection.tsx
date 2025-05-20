import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TeamPageSection.css';

type TeamMember = {
  name: string;
  role: string;
  image: string;
  category: 'organizers' | 'volunteers' | 'sponsors';
  color: string;
};

export const TeamPageSection = () => {
  const [activeCategory, setActiveCategory] = useState<'organizers' | 'volunteers' | 'sponsors'>('organizers');
  const [direction, setDirection] = useState<number>(1); // 1 for right, -1 for left
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('team');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const teamMembers: TeamMember[] = [
    { name: "Dr. Jane Smith", role: "Lead Organizer", image: "/images/team/avatar1.svg", category: "organizers", color: "#60A5FA" },
    { name: "Prof. John Doe", role: "Technical Director", image: "/images/team/avatar2.svg", category: "organizers", color: "#34D399" },
    { name: "Dr. Emily Clark", role: "Program Manager", image: "/images/team/avatar3.svg", category: "organizers", color: "#F472B6" },
    { name: "Alex Johnson", role: "Event Coordinator", image: "/images/team/avatar4.svg", category: "organizers", color: "#A78BFA" },

    { name: "Maria Garcia", role: "Technical Mentor", image: "/images/team/avatar5.svg", category: "volunteers", color: "#FBBF24" },
    { name: "Kevin Lee", role: "Marketing Lead", image: "/images/team/avatar6.svg", category: "volunteers", color: "#F87171" },
    { name: "Sarah Wilson", role: "Design Team", image: "/images/team/avatar7.svg", category: "volunteers", color: "#6EE7B7" },
    { name: "Jessica Brown", role: "Logistics Team", image: "/images/team/avatar8.svg", category: "volunteers", color: "#93C5FD" },

    { name: "David Miller", role: "CEO, TechCorp", image: "/images/team/avatar9.svg", category: "sponsors", color: "#C4B5FD" },
    { name: "Robert Thomas", role: "CTO, InnovateX", image: "/images/team/avatar10.svg", category: "sponsors", color: "#FCA5A5" },
  ];

  const categoryOrder = ['organizers', 'volunteers', 'sponsors'] as const;
  const categoryLabels = {
    organizers: 'Organizers',
    volunteers: 'Volunteers',
    sponsors: 'Sponsors'
  };

  const handleCategoryChange = (newCategory: 'organizers' | 'volunteers' | 'sponsors') => {
    const oldIndex = categoryOrder.indexOf(activeCategory);
    const newIndex = categoryOrder.indexOf(newCategory);
    setDirection(newIndex > oldIndex ? 1 : -1);
    setActiveCategory(newCategory);
  };

  const filteredMembers = teamMembers.filter(member => member.category === activeCategory);

  return (
    <>
      {/* Header bar */}
      <div className="fixed-header">
        <div className="header-content">
          <div className="header-title">Sui Overflow '25</div>
          <div className="header-date">
            <span className="date-tag">&lt;date&gt;</span> February-May, 2025 <span className="date-tag">&lt;/date&gt;</span>
          </div>
        </div>
      </div>

      <section id="team" className="team-section">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="team-heading">
            Team
          </h1>

          <div className="divider"></div>

          <div className="category-tabs">
            {categoryOrder.map((category) => (
              <button
                type="button"
                key={category}
                className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category)}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeCategory}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="team-grid-container"
            >
              <div className="team-grid">
                {filteredMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }
                    }}
                    whileHover={{
                      y: -10,
                      transition: { duration: 0.2 }
                    }}
                    onHoverStart={() => setHoveredMember(index)}
                    onHoverEnd={() => setHoveredMember(null)}
                    className="team-card"
                  >
                    <div className="team-card-inner">
                      <div
                        className="team-avatar-container"
                        style={{ backgroundColor: `${member.color}20` }}
                      >
                        <motion.div
                          className="team-avatar-wrapper"
                          animate={{
                            y: hoveredMember === index ? [-5, 5, -5] : 0,
                            rotate: hoveredMember === index ? [-2, 2, -2] : 0
                          }}
                          transition={{
                            repeat: hoveredMember === index ? Infinity : 0,
                            duration: 2
                          }}
                        >
                          <img src={member.image} alt={member.name} className="team-avatar" />
                          <div
                            className="team-avatar-shadow"
                            style={{ backgroundColor: member.color }}
                          ></div>
                        </motion.div>
                      </div>
                      <div className="team-info">
                        <h3 className="team-name">{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="navigation-arrows">
            <button
              type="button"
              aria-label="Previous category"
              title="Previous category"
              onClick={() => {
                const currentIndex = categoryOrder.indexOf(activeCategory);
                const prevIndex = (currentIndex - 1 + categoryOrder.length) % categoryOrder.length;
                setDirection(-1);
                setActiveCategory(categoryOrder[prevIndex]);
              }}
              className="nav-arrow prev"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next category"
              title="Next category"
              onClick={() => {
                const currentIndex = categoryOrder.indexOf(activeCategory);
                const nextIndex = (currentIndex + 1) % categoryOrder.length;
                setDirection(1);
                setActiveCategory(categoryOrder[nextIndex]);
              }}
              className="nav-arrow next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Add padding at the bottom to prevent content from being hidden behind the fixed navbar */}
          <div className="pb-16"></div>
        </div>
      </section>


    </>
  );
};

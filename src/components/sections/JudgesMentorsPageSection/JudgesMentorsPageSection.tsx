import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './JudgesMentorsPageSection.css';

type Person = {
  name: string;
  role: string;
  company: string;
  image: string;
  type: 'judges' | 'mentors';
  color: string;
};

export const JudgesMentorsPageSection = () => {
  const [activeTab, setActiveTab] = useState<'judges' | 'mentors'>('judges');
  const [hoveredPerson, setHoveredPerson] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState<number>(1); // 1 for right, -1 for left

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('judges');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  const people: Person[] = [
    { name: "Sarah Johnson", role: "CTO", company: "BlockchainX", image: "/images/judges/judge1.svg", type: "judges", color: "#F472B6" },
    { name: "David Chen", role: "Head of Innovation", company: "TechWave", image: "/images/judges/judge2.svg", type: "judges", color: "#60A5FA" },
    { name: "Michael Rodriguez", role: "Senior Developer", company: "CryptoLabs", image: "/images/judges/judge3.svg", type: "judges", color: "#34D399" },
    { name: "Emma Wilson", role: "Blockchain Expert", company: "FinTech Solutions", image: "/images/judges/judge4.svg", type: "judges", color: "#A78BFA" },

    { name: "Robert Kim", role: "Lead Engineer", company: "Web3 Innovations", image: "/images/judges/mentor1.svg", type: "mentors", color: "#FBBF24" },
    { name: "Julia Martinez", role: "Product Manager", company: "DApp Studios", image: "/images/judges/mentor2.svg", type: "mentors", color: "#F87171" },
    { name: "Thomas Lee", role: "Security Specialist", company: "SecureChain", image: "/images/judges/mentor3.svg", type: "mentors", color: "#6EE7B7" },
    { name: "Linda Davis", role: "UX Designer", company: "User First", image: "/images/judges/mentor4.svg", type: "mentors", color: "#93C5FD" },
  ];

  const handleTabChange = (newTab: 'judges' | 'mentors') => {
    if (newTab !== activeTab) {
      setDirection(newTab === 'judges' ? -1 : 1);
      setActiveTab(newTab);
    }
  };

  const filteredPeople = people.filter(person => person.type === activeTab);

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

      <section id="judges" className="judges-section">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="judges-heading">
            {activeTab === 'judges' ? 'Judges' : 'Mentors'}
          </h1>

          <div className="divider"></div>

          <div className="tab-container">
            <button
              type="button"
              className={`tab-button ${activeTab === 'judges' ? 'active' : ''}`}
              onClick={() => handleTabChange('judges')}
            >
              Judges
            </button>
            <button
              type="button"
              className={`tab-button ${activeTab === 'mentors' ? 'active' : ''}`}
              onClick={() => handleTabChange('mentors')}
            >
              Mentors
            </button>
          </div>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeTab}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="judges-grid-container"
            >
              <div className="judges-grid">
                {filteredPeople.map((person, index) => (
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
                    onHoverStart={() => setHoveredPerson(index)}
                    onHoverEnd={() => setHoveredPerson(null)}
                    className="judge-card"
                  >
                    <div className="judge-card-inner">
                      <div
                        className="judge-avatar-container"
                        style={{ backgroundColor: `${person.color}20` }}
                      >
                        <motion.div
                          className="judge-avatar-wrapper"
                          animate={{
                            y: hoveredPerson === index ? [-5, 5, -5] : 0,
                            rotate: hoveredPerson === index ? [-2, 2, -2] : 0
                          }}
                          transition={{
                            repeat: hoveredPerson === index ? Infinity : 0,
                            duration: 2
                          }}
                        >
                          <img src={person.image} alt={person.name} className="judge-avatar" />
                          <div
                            className="judge-avatar-shadow"
                            style={{ backgroundColor: person.color }}
                          ></div>
                        </motion.div>
                      </div>
                      <div className="judge-info">
                        <h3 className="judge-name">{person.name}</h3>
                        <p className="judge-role">{person.role}</p>
                        <p className="judge-company">{person.company}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Add padding at the bottom to prevent content from being hidden behind the fixed navbar */}
          <div className="pb-16"></div>
        </div>
      </section>


    </>
  );
};

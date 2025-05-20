import React, { useEffect, useRef } from 'react';
import './Themes.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Arrow icon component
const ArrowIcon = () => (
  <div className="arrow-icon">
    <svg width="60" height="60" viewBox="13 13 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 24 H33 M23 14 L33 24 L23 34"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

// Function to create grid lines for a card
const createGridLines = () => {
  const gridLines = [];

  // Create vertical lines
  for (let i = 1; i <= 20; i++) {
    gridLines.push(
      <div
        key={`v-${i}`}
        className="theme-card-grid-line theme-card-grid-line-vertical"
      />
    );
  }

  // Create horizontal lines
  for (let i = 1; i <= 20; i++) {
    gridLines.push(
      <div
        key={`h-${i}`}
        className="theme-card-grid-line theme-card-grid-line-horizontal"
      />
    );
  }

  return gridLines;
};

const Themes: React.FC = () => {
  const themesRef = useRef<HTMLDivElement>(null);
  const themesHeaderRef = useRef<HTMLDivElement>(null);
  const themeCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const themeTitlesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const themeDescriptionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Section header animations
    gsap.from(themesHeaderRef.current?.querySelector('.section-title'), {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: themesHeaderRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    gsap.from(themesHeaderRef.current?.querySelector('.section-subtitle'), {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: themesHeaderRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    // Theme cards animations
    themeCardsRef.current.forEach((card, index) => {
      if (!card) return;

      // Card entrance animation
      gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      // Title typing effect
      const titleElement = themeTitlesRef.current[index];
      if (titleElement) {
        const originalText = titleElement.textContent || '';
        titleElement.textContent = '';

        gsap.to(titleElement, {
          duration: 1.2,
          text: {
            value: originalText,
            delimiter: ""
          },
          delay: index * 0.15 + 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Description reveal animation
      const descriptionElement = themeDescriptionsRef.current[index];
      if (descriptionElement) {
        gsap.from(descriptionElement, {
          height: 0,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.15 + 0.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });

        // Text reading animation for description paragraphs
        const paragraph = descriptionElement.querySelector('p');
        if (paragraph) {
          const words = paragraph.textContent?.split(' ') || [];
          paragraph.innerHTML = '';

          words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word + ' ';
            wordSpan.style.opacity = '0';
            wordSpan.style.display = 'inline-block';
            paragraph.appendChild(wordSpan);

            gsap.to(wordSpan, {
              opacity: 1,
              duration: 0.2,
              delay: index * 0.15 + 0.6 + (wordIndex * 0.03),
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            });
          });
        }
      }

      // Arrow animation
      const arrow = card.querySelector('.theme-icon');
      if (arrow) {
        gsap.from(arrow, {
          x: -20,
          opacity: 0,
          duration: 0.6,
          delay: index * 0.15 + 0.3,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }

      // Image animation
      const image = card.querySelector('.theme-illustration');
      if (image) {
        gsap.from(image, {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15 + 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    });

    // Add mouse move effect for theme cards with GSAP
    const handleMouseMove = (e: MouseEvent) => {
      if (!themesRef.current) return;

      themeCardsRef.current.forEach((card) => {
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (
          x > 0 &&
          x < rect.width &&
          y > 0 &&
          y < rect.height
        ) {
          const xPercent = x / rect.width;
          const yPercent = y / rect.height;

          // Use GSAP for smoother animation
          gsap.to(card, {
            duration: 0.5,
            transformPerspective: 1000,
            rotationY: (xPercent - 0.5) * 5,
            rotationX: (0.5 - yPercent) * 5,
            ease: "power2.out"
          });

          // Animate the arrow on hover
          const arrow = card.querySelector('.theme-icon');
          if (arrow) {
            gsap.to(arrow, {
              duration: 0.3,
              x: 5,
              ease: "power2.out"
            });
          }
        } else {
          // Return to original position when mouse leaves
          gsap.to(card, {
            duration: 0.7,
            transformPerspective: 1000,
            rotationY: 0,
            rotationX: 0,
            ease: "elastic.out(1, 0.5)"
          });

          // Reset arrow position
          const arrow = card.querySelector('.theme-icon');
          if (arrow) {
            gsap.to(arrow, {
              duration: 0.3,
              x: 0,
              ease: "power2.out"
            });
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      // Kill all ScrollTriggers to prevent memory leaks
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="themes" className="themes-section">
      <div className="themes-container">
        <div className="themes-header" ref={themesHeaderRef}>
          <h2 className="section-title">Hackathon Themes</h2>
          <p className="section-subtitle">
            Explore innovative solutions across these cutting-edge technology domains
          </p>
        </div>

        <div className="themes-grid" ref={themesRef}>
          {/* Sustainability Theme */}
          <div
            className="theme-card theme-sustainability"
            ref={el => themeCardsRef.current[0] = el}
          >
            <div className="theme-card-grid">
              {createGridLines()}
            </div>
            <div className="theme-header">
              <div className="theme-icon-container">
                <div className="theme-icon">
                  <ArrowIcon />
                </div>
              </div>
              <h3 className="theme-title" ref={el => themeTitlesRef.current[0] = el}>Sustainability</h3>
            </div>
            <div className="theme-content">
              <img src="/images/sustain2.png" alt="Sustainability" className="theme-illustration" />
            </div>
           
          </div>

          {/* Healthcare Theme */}
          <div
            className="theme-card theme-healthcare"
            ref={el => themeCardsRef.current[1] = el}
          >
            <div className="theme-card-grid">
              {createGridLines()}
            </div>
            <div className="theme-header">
              <div className="theme-icon-container">
                <div className="theme-icon">
                  <ArrowIcon />
                </div>
              </div>
              <h3 className="theme-title" ref={el => themeTitlesRef.current[1] = el}>Healthcare</h3>
            </div>
            <div className="theme-content">
              <img src="/images/healthcare.png" alt="Healthcare" className="theme-illustration" />
            </div>
         
          </div>

          {/* AI/ML Theme */}
          <div
            className="theme-card theme-aiml"
            ref={el => themeCardsRef.current[2] = el}
          >
            <div className="theme-card-grid">
              {createGridLines()}
            </div>
            <div className="theme-header">
              <div className="theme-icon-container">
                <div className="theme-icon">
                  <ArrowIcon />
                </div>
              </div>
              <h3 className="theme-title" ref={el => themeTitlesRef.current[2] = el}>AI & ML</h3>
            </div>
            <div className="theme-content">
              <img src="/images/chat-bot.png" alt="AI & ML" className="theme-illustration" />
            </div>
           
          </div>

          {/* Web3/Blockchain Theme */}
          <div
            className="theme-card theme-web3"
            ref={el => themeCardsRef.current[3] = el}
          >
            <div className="theme-card-grid">
              {createGridLines()}
            </div>
            <div className="theme-header">
              <div className="theme-icon-container">
                <div className="theme-icon">
                  <ArrowIcon />
                </div>
              </div>
              <h3 className="theme-title" ref={el => themeTitlesRef.current[3] = el}>Web3 & Blockchain</h3>
            </div>
            <div className="theme-content">
              <img src="/images/web.png" alt="Web3 & Blockchain" className="theme-illustration" />
            </div>
           
          </div>

          {/* IoT Theme */}
          <div
            className="theme-card theme-iot"
            ref={el => themeCardsRef.current[4] = el}
          >
            <div className="theme-card-grid">
              {createGridLines()}
            </div>
            <div className="theme-header">
              <div className="theme-icon-container">
                <div className="theme-icon">
                  <ArrowIcon />
                </div>
              </div>
              <h3 className="theme-title" ref={el => themeTitlesRef.current[4] = el}>IoT</h3>
            </div>
            <div className="theme-content">
              <img src="/images/iot.png" alt="IoT" className="theme-illustration" />
            </div>
           
          </div>

          {/* Open Innovation Theme */}
          <div
            className="theme-card theme-open"
            ref={el => themeCardsRef.current[5] = el}
          >
            <div className="theme-card-grid">
              {createGridLines()}
            </div>
            <div className="theme-header">
              <div className="theme-icon-container">
                <div className="theme-icon">
                  <ArrowIcon />
                </div>
              </div>
              <h3 className="theme-title" ref={el => themeTitlesRef.current[5] = el}>Open Innovation</h3>
            </div>
            <div className="theme-content">
              <img src="/images/project-open.png" alt="Open Innovation" className="theme-illustration" />
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Themes;

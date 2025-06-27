import React, { useEffect, useRef } from 'react';
import './NewTimeline.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const NewTimeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!timelineRef.current) return;

    // Get all timeline columns
    const columns = timelineRef.current.querySelectorAll('.timeline-column');

    // Add pulse animation to arrows
    const arrows = timelineRef.current.querySelectorAll('.timeline-arrow');
    arrows.forEach((arrow) => {
      // Create a repeating pulse animation
      gsap.to(arrow, {
        scale: 1.1,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    });

    // Simple scroll animation for columns
    columns.forEach((column, i) => {
      // Simple fade-in and slide-up animation on scroll
      gsap.fromTo(
        column,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: column,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
          delay: i * 0.1 // Slight stagger effect
        }
      );
    })

    // Add hover effects to all columns regardless of resolution
    columns.forEach((column) => {
      const title = column.querySelector('.timeline-title h3');
      const arrow = column.querySelector('.timeline-arrow');
      const icon = column.querySelector('.timeline-icon');
      const label = column.querySelector('.timeline-label');
      const date = column.querySelector('.timeline-date');

      // Create hover animations
      column.addEventListener('mouseenter', () => {
        // Animate title
        if (title) {
          gsap.to(title, {
            x: 5,
            color: '#3b82f6',
            duration: 0.3,
            ease: 'power1.out'
          });
        }

        // Animate arrow - pause the pulse and set a specific scale
        if (arrow) {
          // Pause any existing animations
          gsap.killTweensOf(arrow);

          // Set a specific hover state
          gsap.to(arrow, {
            scale: 1.2,
            backgroundColor: '#4f46e5',
            duration: 0.3,
            ease: 'power1.out'
          });
        }

        // Animate icon
        if (icon) {
          gsap.to(icon, {
            x: 3,
            duration: 0.3,
            ease: 'power1.out'
          });
        }

        // Animate label
        if (label) {
          gsap.to(label, {
            color: '#1e40af',
            duration: 0.3,
            ease: 'power1.out'
          });
        }

        // Animate date
        if (date) {
          gsap.to(date, {
            color: '#60a5fa',
            duration: 0.3,
            ease: 'power1.out'
          });
        }
      });

      // Reset on mouse leave
      column.addEventListener('mouseleave', () => {
        // Reset title
        if (title) {
          gsap.to(title, {
            x: 0,
            color: '#0a192f',
            duration: 0.3,
            ease: 'power1.out'
          });
        }

        // Reset arrow and restart pulse animation
        if (arrow) {
          // First reset to normal state
          gsap.to(arrow, {
            scale: 1,
            backgroundColor: '#333',
            duration: 0.3,
            ease: 'power1.out',
            onComplete: () => {
              // Then restart the pulse animation
              gsap.to(arrow, {
                scale: 1.1,
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
              });
            }
          });
        }

        // Reset icon
        if (icon) {
          gsap.to(icon, {
            x: 0,
            duration: 0.3,
            ease: 'power1.out'
          });
        }

        // Reset label
        if (label) {
          gsap.to(label, {
            color: '#0a192f',
            duration: 0.3,
            ease: 'power1.out'
          });
        }

        // Reset date
        if (date) {
          gsap.to(date, {
            color: 'white',
            duration: 0.3,
            ease: 'power1.out'
          });
        }
      });
    });

    return () => {
      // Clean up
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // Remove event listeners
      columns.forEach((column) => {
        column.removeEventListener('mouseenter', () => {});
        column.removeEventListener('mouseleave', () => {});
      });

      // Kill any running GSAP animations
      columns.forEach((column) => {
        gsap.killTweensOf(column);

        // Safely kill tweens for child elements that might not exist
        const titleElement = column.querySelector('.timeline-title h3');
        if (titleElement) gsap.killTweensOf(titleElement);

        const arrowElement = column.querySelector('.timeline-arrow');
        if (arrowElement) gsap.killTweensOf(arrowElement);

        const iconElement = column.querySelector('.timeline-icon');
        if (iconElement) gsap.killTweensOf(iconElement);

        const labelElement = column.querySelector('.timeline-label');
        if (labelElement) gsap.killTweensOf(labelElement);

        const dateElement = column.querySelector('.timeline-date');
        if (dateElement) gsap.killTweensOf(dateElement);
      });

      // Kill arrow pulse animations
      arrows.forEach((arrow) => {
        gsap.killTweensOf(arrow);
      });
    };
  }, []);

  return (
    <div className="new-timeline-container" ref={timelineRef}>
      <h2 className="new-timeline-heading">Timeline</h2>

      {/* First row */}
      <div className="new-timeline-grid">
        {/* Column 1 */}
        <div className="timeline-column">
          <div className="timeline-id">
            01
          </div>
          <div className="timeline-arrow">
            <svg className="timeline-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="timeline-title">
            <h3>Registration starts</h3>
          </div>

          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-label">The Race Begins — Register. Team Up. Get Set to Hack!</div>
              <div className="timeline-date">1st July 2025</div>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="timeline-column">
          <div className="timeline-id">
            02
          </div>
          <div className="timeline-arrow">
            <svg className="timeline-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="timeline-title">
            <h3>Idea submissions start</h3>
          </div>

          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-label">Time to Spark Ideas — Let the Innovation Flow!</div>
              <div className="timeline-date">25th July  2025</div>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="timeline-column">
          <div className="timeline-id">
            03
          </div>
          <div className="timeline-arrow">
            <svg className="timeline-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="timeline-title">
            <h3>Registration Deadline</h3>
          </div>

          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-label">Last Call to Enter the Arena!</div>
              <div className="timeline-date">18th August 2025</div>
            </div>
          </div>
        </div>

        {/* Column 4 */}
        <div className="timeline-column">
          <div className="timeline-id">
            04
          </div>
          <div className="timeline-arrow">
            <svg className="timeline-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="timeline-title">
            <h3>Idea Submission Deadline</h3>
          </div>

          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-label">Ideas Lock In — Let the Best Concepts Win!</div>
              <div className="timeline-date">20th August 2025</div>
            </div>
          </div>
        </div>
      </div>

      {/* Second row */}
      <div className="new-timeline-grid">
        {/* Column 5 */}
        <div className="timeline-column">
          <div className="timeline-id">
            05
          </div>
          <div className="timeline-arrow">
            <svg className="timeline-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="timeline-title">
            <h3>shortlisted Teams announcement</h3>
          </div>

          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-label">And the Chosen Ones Are... Meet the Finalists!</div>
              <div className="timeline-date">1st September 2025</div>
            </div>
          </div>
        </div>
        {/* Column 6 */}
        <div className="timeline-column">
          <div className="timeline-id">
            06
          </div>
          <div className="timeline-arrow">
            <svg className="timeline-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="timeline-title">
            <h3>Hacking Period Starts</h3>
          </div>

          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-label">The Code War Begins — Hack Like There’s No Tomorrow!</div>
              <div className="timeline-date">12th September</div>
            </div>
          </div>
        </div>

        {/* Column 6 */}
        <div className="timeline-column">
          <div className="timeline-id">
            07
          </div>
          <div className="timeline-arrow">
            <svg className="timeline-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="timeline-title">
            <h3>Final Submission</h3>
          </div>

          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-label">One Last Push — Deliver Your Innovation!</div>
              <div className="timeline-date">13th September 2025</div>
            </div>
          </div>
        </div>

        {/* Column 7 */}
        <div className="timeline-column">
          <div className="timeline-id">
            08
          </div>
          <div className="timeline-arrow">
            <svg className="timeline-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="timeline-title">
            <h3>Final Evaluation Result</h3>
          </div>

          <div className="timeline-items">
            <div className="timeline-item">
              <div className="timeline-label">The Verdict is In — Witness the Best Rise!</div>
              <div className="timeline-date">13th September 2025</div>
            </div>
          </div>
        </div>

        
      </div>


    </div>
  );
};

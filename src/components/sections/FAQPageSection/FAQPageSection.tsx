import React from 'react';
import { useState, useRef } from 'react';

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
}

export const FAQPageSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqItems: FAQItem[] = [
    {
      question: "What is DSU DevHack 2.0?",
      answer: `DSU DevHack 2.0 is the second edition of Dayananda Sagar University's national-level innovation hackathon, aimed at bringing together the brightest minds from across the country to solve real-world problems through technology. With tracks spanning AI/ML, Web3, IoT, Sustainability, Healthcare, and Open Innovation, the hackathon serves as a launchpad for impactful student-led solutions.`
    },
    {
      question: "Is the hackathon offline and how long does it last?",
      answer: `Yes, DevHack 2025 is a fully offline, on-campus hackathon hosted at Dayananda Sagar University, Bangalore. The event spans 36 hours, starting on September 12 and concluding on September 13, 2025.`
    },
    {
      question: "At which level is this hackathon conducted?",
      answer: `This is a national-level hackathon open to students across India, especially from engineering and technical backgrounds.`
    },
    {
      question: "How many members can participate in a team?",
      answer: `Each team must have exactly 3 members. All members should be registered students at the time of the event.`
    },
    {
      question: "What is the qualification to participate?",
      answer: `The hackathon is open to students currently enrolled in undergraduate programs. Students from all academic backgrounds are encouraged to apply, especially those passionate about technology, innovation, and problem-solving.`
    },
    {
      question: "What is the participation fee?",
      answer: `There is no participation fee. DevHack 2025 is completely free of cost for all participants.`
    },
    {
      question: "What are the restrictions on team formation for the event?",
      answer: `Teams should be formed with members from the same college. Each student can be part of only one team, and multiple registrations by the same individual are not allowed.`
    },
    {
      question: "What are the perks and benefits of participating in the hackathon?",
      answer: `Participants will receive mentorship from industry experts and have valuable networking opportunities with leading companies and fellow developers. They will also enjoy exclusive swag kits, certificates, and participation goodies. The hackathon features a <strong>prize pool of ₹2 Lakhs</strong>, along with exciting sponsor-backed bounties worth <strong>₹10 Lakhs</strong>. Most importantly, it offers a platform to showcase innovations directly to top tech companies and industry leaders.`
    },
    {
      question: "I have a question related to the hackathon which is not listed above. What should I do?",
      answer: `For any additional queries, feel free to reach out to us at <a href="mailto:dsudevhack@dsu.edu.in" class="text-blue-600 underline">dsudevhack@dsu.edu.in</a> or contact our team at <strong>+91-9939635206, +91 82996 86568</strong>. We'll be happy to assist you!`
    },
  ];

  const handleToggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
    setTimeout(() => {
      if (activeIndex !== idx && answerRefs.current[idx]) {
        answerRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 350);
  };

  return (
    <section id="faq" className="w-full h-[194vh] sm:h-[124vh] bg-gray-50 py-16 mb-60 md:mb-0 px-2 md:px-0">
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 mt-16">FAQ</h1>
        <ul className="flex flex-col gap-4 mb-4 w-full" role="list">
          {faqItems.map((item, idx) => (
            <li
              key={idx}
              className="border-2 border-black rounded-lg overflow-hidden bg-white shadow-sm w-full"
              role="listitem"
            >
              <button
                className={`w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-lg md:text-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${activeIndex === idx ? 'bg-gray-100' : 'bg-white'}`}
                aria-expanded={activeIndex === idx}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-question-${idx}`}
                onClick={() => handleToggle(idx)}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') handleToggle(idx);
                }}
              >
                <span className="flex-1 pr-4">{item.question}</span>
                {/* Animated dots toggle */}
                <span className="relative flex items-center justify-center w-10 h-10">
                  {activeIndex === idx ? (
                    // 3 horizontal dots, centered
                    <span className="flex flex-row items-center justify-center gap-2 w-8 h-2 transition-all duration-500">
                      <span className="w-2 h-2 rounded-full bg-black transition-all duration-500" />
                      <span className="w-2 h-2 rounded-full bg-black transition-all duration-500" />
                      <span className="w-2 h-2 rounded-full bg-black transition-all duration-500" />
                    </span>
                  ) : (
                    // 5-dot cross
                    <span className="grid grid-cols-3 grid-rows-3 gap-1 w-8 h-8 transition-transform duration-500">
                      <span className="w-2 h-2 rounded-full bg-black row-start-1 col-start-2" />
                      <span className="w-2 h-2 rounded-full bg-black row-start-2 col-start-1" />
                      <span className="w-2 h-2 rounded-full bg-black row-start-2 col-start-2" />
                      <span className="w-2 h-2 rounded-full bg-black row-start-2 col-start-3" />
                      <span className="w-2 h-2 rounded-full bg-black row-start-3 col-start-2" />
                    </span>
                  )}
                </span>
              </button>
              <div
                id={`faq-answer-${idx}`}
                className={`transition-all duration-500 ease-in-out px-5 ${activeIndex === idx ? ' min-h-[140px] xs:min-h-[400px] h-full py-4 opacity-100' : 'max-h-0 py-0 opacity-0'} overflow-hidden text-gray-700 text-base h-full md:text-md bg-gray-50 w-full`}
                aria-labelledby={`faq-question-${idx}`}
                ref={el => (answerRefs.current[idx] = el)}
                style={activeIndex === idx ? { maxHeight: answerRefs.current[idx]?.scrollHeight } : {}}
              >
                {typeof item.answer === 'string' ? (
                  <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                ) : (
                  <p>{item.answer}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}; 

export default FAQPageSection
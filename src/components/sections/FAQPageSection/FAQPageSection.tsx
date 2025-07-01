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
      question: "What is DSU DEVHACK 2025?",
      answer: "DSU DEVHACK is a national-level hackathon initiative of a private university in India to help various departments and private organizations find solutions to their pressing problems through students. Participants will have the chance to build innovative projects while competing for prizes, mentorship, and exclusive developer opportunities."
    },
    {
      question: "Is the hackathon offline and how long does it last?",
      answer: "Yes, the DSU DEVHACK Hackathon is a 36-hour offline event held at Dayanada Sagar University Kanakpura Road Bangalore, giving participants an immersive and collaborative experience."
    },
    {
      question: "At which level is this hackathon conducted?",
      answer: "The DSU DEVHACK Hackathon is conducted at the national level."
    },
    {
      question: "How many members can participate in a team?",
      answer: "A team can have only 3 members."
    },
    {
      question: "What is the qualification to participate?",
      answer: "Participants must be currently enrolled in an undergraduate Engineering program."
    },
    {
      question: "What is the participation fee?",
      answer: "The participation in DSU DEVHACK 2025 is completely free!"
    },
    {
      question: "What are the restrictions on team formation for the event?",
      answer: "All team members must belong to the same university or college, and a team can have exactly 3 members."
    },
    {
      question: "What are the perks and benefits of participating in the hackathon?",
      answer: "Participants gain exposure to real-world problems, networking opportunities, and potential internships or job offers. Winners also receive cash prizes and certificates."
    },
    {
      question: "I have a question related to the hackathon which is not listed above. What should I do?",
      answer: "Feel free to reach out to us. Just drop a mail to <a href='mailto:dsudevhack@dsu.edu.in' class='text-blue-600 underline'>dsudevhack@dsu.edu.in</a>. You can also contact the student coordinator at <strong>+91-9939635206 or +91-8299686568</strong>."
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
    <section id="faq" className="w-full bg-gray-50 py-16 mb-60 md:mb-0 px-2 md:px-0">
      <div className="max-w-5xl w-full mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-gray-900 mt-16">FAQ</h1>
        <ul className="flex flex-col gap-4 w-full" role="list">
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
                className={`transition-all duration-500 ease-in-out px-5 ${activeIndex === idx ? ' min-h-[110px] xs:min-h-[240px] h-full py-4 opacity-100' : 'max-h-0 py-0 opacity-0'} overflow-hidden text-gray-700 text-base h-full md:text-md bg-gray-50 w-full`}
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
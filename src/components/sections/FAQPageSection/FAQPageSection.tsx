import { useState } from 'react';
import './FAQPageSection.css';

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
}

export const FAQPageSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: "What is DSU DEVHACK 2024?",
      answer: "DSU DEVHACK is a national-level hackathon initiative of a private university in India to help various departments and private organizations find solutions to their pressing problems through students. Participants will have the chance to build innovative projects while competing for prizes, mentorship, and exclusive developer opportunities."
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
      question: "Can participants attend online?",
      answer: "Yes, participants can attend online as the hackathon is conducted in both online and offline modes."
    },
    {
      question: "What is the participation fee?",
      answer: "The participation in DSU DEVHACK 2024 is completely free!"
    },
    {
      question: "Is this online hackathon or offline hackathon?",
      answer: "It is a hybrid hackathon and preferred offline."
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
      answer: "Feel free to reach out to us. Just drop a mail to <a href='mailto:dsudevhack@dsu.edu.in'>dsudevhack@dsu.edu.in</a>. You can also contact the student coordinator at <strong>+91-8154852286</strong>."
    },
  ];

  const toggleItem = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
    console.log("Toggling item:", index, "New active index:", activeIndex === index ? null : index);
  };

  return (
    <>
      {/* Header bar */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-gray-900 dark:text-white font-medium">DSU DEVHACK 2024</div>
          <div className="text-blue-500 dark:text-blue-400">
            <span className="text-blue-500 dark:text-blue-400">&lt;date&gt;</span> March-April, 2024 <span className="text-blue-500 dark:text-blue-400">&lt;/date&gt;</span>
          </div>
        </div>
      </div>

      <section id="faq" className="faq-section">
        <div className="container mx-auto px-6 md:px-12">
          <h1 className="faq-heading">
            FAQ
          </h1>

          <div className="py-8 max-w-5xl mx-auto">
            <div className="faq-container">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item-wrapper">
                <div className="faq-item">
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleItem(index)}
                  >
                    <span>{item.question}</span>
                    <div className={`faq-toggle ${activeIndex === index ? 'active' : ''}`}>
                      <div className="dots-container">
                        <div className="dot top"></div>
                        <div className="dot left"></div>
                        <div className="dot center"></div>
                        <div className="dot right"></div>
                        <div className="dot bottom"></div>
                      </div>
                    </div>
                  </button>

                  <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                    {typeof item.answer === 'string' ? (
                      <p dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>





        </div>
      </div>
    </section>
    </>

  );
};

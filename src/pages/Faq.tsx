
import { useState } from 'react';
import '../components/sections/FAQPageSection/FAQPageSection.css';

interface FAQItem {
  question: string;
  answer: string;
}

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "What is Sui Overflow 2025?",
      answer: "Sui Overflow 2025 is a global virtual hackathon, uniting builders and developers worldwide to redefine innovation, performance, and ownership on the Sui blockchain platform."
    },
    {
      question: "Why should I participate in Sui Overflow 2025?",
      answer: "You'll get to work on cutting-edge blockchain technology, compete for over $500,000 in prizes, and network with industry leaders and like-minded developers."
    },
    {
      question: "Who can participate in Sui Overflow 2025?",
      answer: "Anyone with an interest in blockchain technology and innovation can participate. Whether you're a student, professional developer, designer, or entrepreneur, there's a place for you."
    },
    {
      question: "Where can I ask technical questions during the hackathon?",
      answer: "You can ask technical questions on our Discord server, where mentors and sponsors will be available to provide guidance and support."
    },
    {
      question: "When can I register for Sui Overflow 2025?",
      answer: "Registration opens on February 15, 2025, and will remain open until the start of the hackathon in April."
    },
    {
      question: "Do I need to attend any in-person events or demo days to be eligible?",
      answer: "No, Sui Overflow 2025 is entirely virtual. All activities, including demo days, will be conducted online."
    },
    {
      question: "How can I find a team to join?",
      answer: "You can use our team formation platform on Discord or attend our virtual team-building sessions before the hackathon begins."
    },
    {
      question: "How can I learn about Sui and Move to prepare for Sui Overflow?",
      answer: "We'll provide comprehensive resources, tutorials, and workshops leading up to the event to help you prepare for building on the Sui blockchain."
    },
    {
      question: "When can I start working on my project for it to be considered as a valid submission?",
      answer: "You can start working on your project as soon as the hackathon officially begins. Projects started before the official start date will not be eligible for prizes."
    },
    {
      question: "What if my project fits into multiple tracks?",
      answer: "You can submit your project to multiple tracks if it fits the criteria. However, you'll need to specify a primary track for judging purposes."
    },
  ];

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* Header bar */}
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-3 z-50">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="text-gray-900 dark:text-white font-medium">Sui Overflow '25</div>
          <div className="text-blue-500 dark:text-blue-400">
            <span className="text-blue-500 dark:text-blue-400">&lt;date&gt;</span> February-May, 2025 <span className="text-blue-500 dark:text-blue-400">&lt;/date&gt;</span>
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
                          <div className="dot"></div>
                          <div className="dot"></div>
                          <div className="dot"></div>
                        </div>
                      </div>
                    </button>

                    <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-gray-600">
              <p>If you have additional questions, please contact devrel@sui.io.</p>
            </div>


          </div>
        </div>
      </section>
    </>
  );
};

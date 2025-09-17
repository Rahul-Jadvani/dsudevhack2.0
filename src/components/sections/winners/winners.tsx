import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export const Winners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isInView && !isMounted) {
      setIsMounted(true);
    }
  }, [isInView, isMounted]);

  // ✅ Final Winners Order with real images
  const winnersList = [
    { title: "🏆 Winners", team: "Sudo Wudo", main: true, image: "/images/1.jpg" },
    { title: "🥈 Runner Ups", team: "Aqua Sense", main: true, image: "/images/2.jpg" },
    { title: "🥉 2nd Runner Ups", team: "Last Commit", main: true, image: "/images/3.jpg" },
    { title: "Appreciation Award 10k", team: "The Iterators", image: "/images/4.jpg" },
    { title: "Appreciation Award 10k", team: "Digital Dharmas", image: "/images/5.jpg" },
    { title: "Appreciation Award 5k", team: "Prometheus", image: "/images/6.jpg" },
    { title: "Gemini API Winner", team: "SUDO WUDO", image: "/images/7.jpg" },
    { title: "Auth0 Winner", team: "JAX", image: "/images/8.jpg" },
    { title: "MongoDB Atlas Winner", team: "Kaju Katli", image: "/images/9.jpg" },
    { title: "Vultr Track Winner", team: "The APIcalypse", image: "/sponsors/vultr.png" },
    { title: "Vultr Track Runner Up", team: "God of War", image: "/sponsors/vultr.png" },
    { title: "Vultr Track 2nd Runner Up", team: "Code Fellas 2.0", image: "/sponsors/vultr.png" }
  ];

  return (
    <section id="winners" className="winners-section">
      <div className="container mx-auto px-4 md:px-8 lg:px-4 xl:px-2 max-w-full">
        <div className="md:py-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
            🏆 Hackathon Winners
          </h1>
          <div className="divider md:mt-2 md:mb-4"></div>
        </div>

        {/* ✅ Responsive Grid (3 desktop / 2 tablet / 1 mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {winnersList.map((winner, index) => {
            const cardRef = useRef(null);
            const isCardInView = useInView(cardRef, { once: false, amount: 0.2 });
            const isMain = winner.main;

            return (
              <motion.div
                ref={cardRef}
                key={index}
                className={`flex flex-col justify-between items-center rounded-lg p-4 hover:shadow-2xl transition 
                ${isMain ? "bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 shadow-lg" : "bg-white shadow-md"}`}
                style={{
                  minHeight: isMain ? "20rem" : "18rem"
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                  ease: "easeOut"
                }}
              >
                {/* Title */}
                <h2 className={`font-bold ${isMain ? "text-xl md:text-2xl" : "text-lg"} text-center mb-2`}>
                  {winner.title}
                </h2>

                {/* Winner Image */}
                {winner.image && (
                  <div className="relative w-full h-48 sm:h-56 md:h-60 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={winner.image}
                      alt={winner.team}
                      className={`w-full h-full object-cover ${
                        index === 6 || index === 7 || index === 8 ? "object-[center_top]" : ""
                      }`}
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Team Name */}
                <p className="mt-3 text-gray-900 text-center text-lg font-semibold">
                  {winner.team}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

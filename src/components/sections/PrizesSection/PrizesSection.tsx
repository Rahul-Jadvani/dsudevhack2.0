import "./PrizesSection.css";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import tinycolor from "tinycolor2";

type PrizeCard = {
  place: string;
  amount: string;
  color: string;
  image: string;
};

const getCellColor = (x: number, y: number) => {
  const colors = [
    "#22c55e", // green (from place-1)
    "#0ea5e9", // blue (from place-2)
    "#06b6d4", // cyan (from place-3)
    "#eab308", // yellow (from place-4)
    "#bcb6ff", // purple (from defi-bg)
    "#ffd6f6", // pink (from infra-bg)
    "#b6e2c6", // green (from ai-bg)
    "#b6d6ff", // blue (from crypto-bg)
    "#fff7b6", // yellow (from degen-bg)
    "#ffe2b6", // orange (from payments-bg)
  ];

  const index = (x + y) % colors.length;
  return colors[index];
};

export const PrizesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [gridCells, setGridCells] = useState<
    { x: number; y: number; isActive: boolean }[]
  >([]);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const cellSize = 48;
    const cols = Math.ceil(rect.width / cellSize);
    const rows = Math.ceil(rect.height / cellSize);

    const cells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells.push({ x, y, isActive: false });
      }
    }
    setGridCells(cells);

    const handleResize = () => {
      const newRect = container.getBoundingClientRect();
      const newCols = Math.ceil(newRect.width / cellSize);
      const newRows = Math.ceil(newRect.height / cellSize);

      const newCells = [];
      for (let y = 0; y < newRows; y++) {
        for (let x = 0; x < newCols; x++) {
          newCells.push({ x, y, isActive: false });
        }
      }
      setGridCells(newCells);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = () => {
    if (!isHovering) {
      setIsHovering(true);
      setGridCells((prevCells) => {
        const totalCells = prevCells.length;
        const cellsToActivate = Math.floor(totalCells * 0.1);
        const shuffledCells = [...prevCells].sort(() => Math.random() - 0.5);

        return prevCells.map((cell) => {
          const isActive = shuffledCells
            .slice(0, cellsToActivate)
            .some(
              (activeCell) => activeCell.x === cell.x && activeCell.y === cell.y
            );
          return { ...cell, isActive };
        });
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setGridCells((prevCells) =>
      prevCells.map((cell) => ({ ...cell, isActive: false }))
    );
  };

  const prizes: PrizeCard[] = [
    {
      place: "1st place",
      amount: "₹1,00,000",
      color: "yellow",
      image: "/images/prizes/1.svg",
    },
    {
      place: "2nd place",
      amount: "₹50,000",
      color: "blue",
      image: "/images/prizes/2.svg",
    },
    {
      place: "3rd place",
      amount: "₹25,000",
      color: "cyan",
      image: "/images/prizes/3.svg",
    },
    {
      place: "Consolation prizes",
      amount: "₹25,000",
      color: "yellow",
      image: "/images/gift.png",
    },
  ];

  const extraPrizes = [
    {
      place: ".xyz",
      amount: "1-year domain for all onsite hackers.",
      image: "$4200",
    },
    {
      place: "Codecrafters",
      amount: <>VIP Codecrafters membership for winners</>,
      image: "$3,780",
    },
    {
      place: "Trae AI",
      amount: "1 Month of Trae AI Pro to All Onsite Hackers",
      image: "$750",
    },
    {
      place: "Goodies",
      amount: "Goodies for all onsite hackers",
      image: "$500",
    },

    {
      place: "InterviewBuddy",
      amount:
        "15% Discount Coupons for 1:1 Expert-Driven Sessions for all Participants .Al Interview vouchers to Winners",
      image: "$279",
    },

    {
      place: "ETHIndia",
      amount:
        "winner of this track receives $100 in prize from ETHIndia.Click to know more",
      image: "$100",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [isMounted, setIsMounted] = useState(false);
  const [modalPrize, setModalPrize] = useState<any | null>(null);

  useEffect(() => {
    if (isInView && !isMounted) {
      setIsMounted(true);
    }
  }, [isInView, isMounted]);

  const trackPrizes = [
    {
      amount: "Credit rewards",
      image: "/sponsors/vultr.png",
      description:
        "● $1,500 in Credits for the winners of the Vultr Track.\n● $1,000 in Credits for the runner-up team of the Vultr Track.",
      details: "● $500 in Credits for the second runner-up team of the Vultr Track",
    },{
      amount: "Direct hiring opportunities",
      image: "/sponsors/kroolo.png",
      pdfLink: "/Kroolo.pdf",
      details: `𝗢𝗳𝗳𝗲𝗿𝘀: Top 5 teams will be offered full-time roles in Kroolo.
  Based on certain factors:
  - Flawless product thinking (devil is in the detail)
  - Code like silicon valley engineers (full stack)
  - Great communication
  - Available for full-time immediately`,
    },
    {
      amount: "$100",
      image: "/sponsors/ethindia-light.svg",
      description:
        "Select this track if you're building on Ethereum to be eligible for the prizes!",
      details: "$100: Best hack built on Ethereum",
    },
  ];

  return (
    <>
      <section id="prizes" className="prizes-section">
        <div className="container mx-auto px-4 md:px-8 lg:px-4 xl:px-2 max-w-full">
          <div className="md:py-4">
            <h1 className="prizes-heading text-3xl md:text-4xl lg:text-5xl font-bold">
              Prizes
            </h1>
            <div className="divider md:mt-2 md:mb-4"></div>
          </div>

          {/* your existing prize cards code ... unchanged */}

          <h2
            id="sponsor-prizes"
            className="track-prizes-heading text-center text-4xl font-extrabold mb-6"
          >
            Sponsor Specific Prizes
          </h2>

          <div className="track-prizes-screenshot-grid grid grid-cols-1 lg:grid-cols-2 gap-4">
            {trackPrizes.map((trackPrize, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: false, amount: 0.2 });

              return (
                <motion.div
                  ref={ref}
                  className="track-prize-screenshot-card cursor-pointer flex flex-col bg-white shadow-lg rounded-lg p-4 h-auto"
                  initial={{ opacity: 0, y: 60 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
                  }
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  key={index}
                  onClick={() => setModalPrize(trackPrize)}
                >
               <div 
  className={`flex items-center justify-center w-full h-40 rounded-md overflow-hidden mb-3 
    ${index === 0 || index === 1 ? "bg-white" : "bg-black"}`}
>
  <img
    src={trackPrize.image}
    alt={trackPrize.amount}
    loading="lazy"
    className="max-h-full max-w-full object-contain"
  />
</div>


                  <div className="text-5xl font-extrabold text-gray-900 text-center pt-4">
                    {trackPrize.amount}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {modalPrize && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="relative bg-white p-4 sm:p-6 rounded-lg w-full max-w-sm sm:max-w-md max-h-[80vh] overflow-y-auto">
                <button
                  onClick={() => setModalPrize(null)}
                  className="absolute top-2 left-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                  ×
                </button>

                <div className="space-y-4">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
                    {modalPrize.amount}
                  </p>

                  {modalPrize.pdfLink && (
                    <a
                      href={modalPrize.pdfLink}
                      download
                      type="application/pdf"
                      className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
                    >
                      📄 More Information (PDF)
                    </a>
                  )}

{(modalPrize.description || modalPrize.details) && (
  <div className="text-sm sm:text-lg font-medium text-gray-700 text-left whitespace-pre-line space-y-2">
    {modalPrize.description && <p>{modalPrize.description}</p>}
    {modalPrize.details && <p>{modalPrize.details}</p>}
  </div>
)}


                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

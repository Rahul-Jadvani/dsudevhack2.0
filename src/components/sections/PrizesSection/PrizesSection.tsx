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
      place:"n8n",
      amount: "1 Month of n8n Pro to All Onsite Hackers and 1 year n8n Cloud Pro for all Winners",
      image: "$17,801",
    },
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
      amount: "3000$ worth Rewards!",
      image: "/sponsors/vultr.png",
      pdfLink: "/Vultr.pdf",
      description: "The Vultr Cloud Deployment Track challenges teams to build and host their entire project on the Vultr Cloud Platform using its high-performance compute, networking, and storage services.",
      details: "🏆 Vultr Track Prizes:\n● $1,500 in Vultr cloud credits – 1st Place\n● $1,000 in Vultr cloud credits – Runner Up\n● $500 in Vultr cloud credits – 2nd Runner Up"
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
      amount: "Best Use of Gemini API",
      image: "/sponsors/gemini.png",
   description: "Push the limits of AI with Google Gemini! \n Build chatbots, summarize research, or generate creative content using the Gemini API.",
   details: "💡 Best team using Gemini API wins exciting Google Swags \n🚀 <a href='https://mlh.link/gemini-quickstart' target='_blank' style='color:blue; text-decoration:underline;'>Build with Gemini ➡</a>"
    },
    {
      amount: "Best Use of MongoDB Atlas",
      image: "/sponsors/mongo.png",
      description: "Build with MongoDB Atlas — the modern cloud database made accessible in the cloud!\n Get started with a <a href='https://mlh.link/mongodb' target='_blank' style='color:blue; text-decoration:underline;'>$50 credit for students</a>, try the <a href='https://mlh.link/mongodb-free' target='_blank' style='color:blue; text-decoration:underline;'>Atlas free forever tier</a> (no card required), and learn from <a href='https://mlh.link/mongodb-university' target='_blank' style='color:blue; text-decoration:underline;'>MongoDB University</a>.",
      details: "🏆 Best use of MongoDB Atlas wins an M5GO IoT Starter Kit for each team member \n🚀 <a href='https://mlh.link/mongodb' target='_blank' style='color:blue; text-decoration:underline;'>Build with MongoDB ➡</a>"
      }, {
      amount: "Best Use of Auth0",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Oauth_logo.svg/598px-Oauth_logo.svg.png",
      description: "Secure your app with Auth0 — enable social sign-in, MFA, and passwordless login out of the box. \nFree to try with no card required, supporting up to 7,000 active users and unlimited logins. \n<a href='https://mlh.link/auth0-signup' target='_blank' style='color:blue; text-decoration:underline;'>Create your account</a> and explore the <a href='https://mlh.link/auth0-docs' target='_blank' style='color:blue; text-decoration:underline;'>Auth0 APIs</a> to get started.",
      details: "🏆 Best use of Auth0 wins Wireless Headphones for each team member 🎧\n🚀 <a href='https://mlh.link/auth0-MLH-guides' target='_blank' style='color:blue; text-decoration:underline;'>Build with Auth0 ➡</a>"
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

          <div className="prizes-grid">
            {prizes.map((prize, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: false, amount: 0.2 });
              let placeClass = "";
              if (prize.place.startsWith("1st")) placeClass = "place-1";
              else if (prize.place.startsWith("2nd")) placeClass = "place-2";
              else if (prize.place.startsWith("3rd")) placeClass = "place-3";
              else if (prize.place.startsWith("Consolation")) placeClass = "consolation-prize";
              return (
                <motion.div
                  ref={ref}
                  className={`prize-card`}
                  initial={{ opacity: 0, y: 60 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }
                  }
                  transition={{
                    type: "tween",
                    duration: 0.1,
                  delay: index * 0.01,
                  ease: "easeOut"
                  }}
                  key={index}
                >
                <div className={`prize-header ${placeClass} h-[70px] flex items-center`}>
  <span className="prize-header-group">
    <span className="prize-hash">#</span>
    <span className={`prize-place ${placeClass} ${prize.place.startsWith("Consolation") ? "text-base" : "text-lg"}`}>
      {prize.place}
    </span>
    <span className="prize-bracket">{" }"}</span>
  </span>
</div>
             <div className="prize-content  bg-[#fdf2e9]">
  {prize.place === "1st place" ? (
    <div className="relative mx-auto h-[clamp(200px,50vw,300px)] w-full rounded-lg transition-transform duration-300 origin-center hover:scale-105 ">
      {/* main image + two stars */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pr-[25px] lg:pr-[55px]">
        <img src={prize.image} loading="lazy" alt="" className="h-full w-full object-contain" />

        <div className="star size-3 prize-1-1">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy"/>
        </div>
        <div className="star size-1 prize-1-2">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy"/>
        </div>
      </div>

      {/* extra overlay slots kept (empty) */}
      <div className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="star size-2 prize-1-3">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy"/>
        </div>
        <div className="star size-1 prize-1-4">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy"/>
        </div>
      </div>
      <div className="absolute inset-0" />
    </div>
  ) : prize.place === "2nd place" ? (
    <div className="relative mx-auto h-[clamp(200px,50vw,300px)] w-full rounded-lg transition-transform duration-300 origin-center hover:scale-105">
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <img src={prize.image} loading="lazy" alt="" className="h-full w-full object-contain scale-[0.9]" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="star size-2 prize-3-3">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="star size-3 prize-3-1">
          <img src="/images/starry.png" alt="star glow" className="star-image"   loading="lazy" />
        </div>
        <div className="star size-1">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy" />
        </div>
      </div>
    </div>
  ) : prize.place === "3rd place" ? (
    <div className="relative mx-auto h-[clamp(200px,50vw,300px)] w-full rounded-lg transition-transform duration-300 origin-center hover:scale-105">
      <div className="absolute inset-0 items-center justify-center pl-[25px] lg:pl-[55px] ">
        <img src={prize.image} loading="lazy" alt="" className="h-full w-full object-contain scale-[0.99]" />
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="star size-3 prize-4-1">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy" />
        </div>
        <div className="star size-1 prize-4-2">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy" />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="star size-1 prize-4-3">
          <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy"  />
        </div>
      </div>
    </div>
      ) : prize.place === "Consolation prizes" ? (
        <div className="relative mx-auto h-[clamp(200px,50vw,300px)] w-full rounded-lg transition-transform duration-300 origin-center hover:scale-105">
          <div className="absolute inset-0 items-center justify-center pl-[25px]  bg-[#fdf2e9] ">
            <img src={prize.image} loading="lazy" alt="" className="h-full w-full object-contain scale-[0.37]" />
          </div>
    
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="star size-3 prize-4-1">
              <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy" />
            </div>
            <div className="star size-1 prize-4-2">
              <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy" />
            </div>
          </div>
    
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="star size-1 prize-4-3">
              <img src="/images/starry.png" alt="star glow" className="star-image" loading="lazy"  />
            </div>
          </div>
        </div>
  ) : (
    <img src={prize.image} alt={prize.place} className="max-h-[200px] w-full object-contain" />
  )}
</div>

                  <div className="prize-footer">
                    <div className="prize-amount">{prize.amount}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

      

        
         

          <div className="prizes-grid mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 p-4 items-start"> 
  {extraPrizes.map((prize, index) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.2 });

    const placeClass = "place-extra";

    const pastelColors = [
      "#FFD1DC", "#C1F0F6", "#FFFACD", "#D4F4DD", "#E2D4F1", "#FADCD9", "#FFE4C4",
    ];

    const darkenColor = (color, percent) => {
      const num = parseInt(color.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = Math.max(0, (num >> 16) - amt);
      const G = Math.max(0, ((num >> 8) & 0x00FF) - amt);
      const B = Math.max(0, (num & 0x0000FF) - amt);
      return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
    };

    const bgColor = pastelColors[index % pastelColors.length];
    const textColor = darkenColor(bgColor, 20);

    return (
      <motion.div
        ref={ref}
        key={index}
        className="prize-card relative flex flex-col justify-between min-h-[220px] p-4 rounded-md border border-black shadow-sm border-solid max-h-[max-content] box-border"
        style={{ backgroundColor: bgColor }}
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{
          type: "tween",
          duration: 0.1,
          delay: index * 0.05,
          ease: "easeOut",
        }}
        // Scroll to sponsor prizes when last card is clicked
        onClick={() => {
          if (index === extraPrizes.length - 1) {
            const sponsorPrizesSection = document.getElementById('sponsor-prizes');
            if (sponsorPrizesSection) {
              sponsorPrizesSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
      >
        {/* Prize Header */}
        <div className={`prize-header ${placeClass}`}>
          <span className="prize-header-group">
            <span className="prize-hash">#</span>
            <span className={`prize-place ${placeClass} text-sm`} style={{ backgroundColor: textColor }}>
              {prize.place}
            </span>
            <span className="prize-bracket">{" }"}</span>
          </span>
        </div>

        <div className="prize-content flex items-center justify-center text-4xl font-extrabold text-black">
  {prize.image}
</div>

        {/* Prize Footer */}
        <div className="prize-footer text-center text-sm mt-2 md:h-[75px] flex items-center justify-center">
          {prize.amount}
        </div>

        {/* Row divider after every 4th card */}
        {((index + 1) % 4 === 0) && (
          <span className="absolute bottom-[-12px] left-[-12px] w-[calc(100%+24px)] h-[1px] bg-black"></span>
        )}
      </motion.div>
    );
  })}
</div>


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

    // pastel gradient backgrounds
    const overlayGradients = [
      "linear-gradient(135deg, #d1fae5, #86efac)",   // soft pastel green
      "linear-gradient(135deg, #fff0d9, #ffd7a8)",   // soft pastel peach/cream
      "linear-gradient(135deg, #ccfbf1, #67e8f9)",   // soft pastel cyan
      "linear-gradient(135deg, #fefce8, #fde68a)"    // soft pastel yellow
    ];
    const overlayGradient = overlayGradients[index % overlayGradients.length];

    return (
      <motion.div
        ref={ref}
        className="track-prize-screenshot-card cursor-pointer flex flex-col bg-white shadow-lg rounded-lg p-4 h-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{
          duration: 0.8,
          delay: index * 0.08,
          ease: "easeOut",
        }}
        key={index}
        onClick={() => setModalPrize(trackPrize)}
      >
        {/* Image container */}
        <div
          className={`relative flex items-center justify-center w-full h-40 rounded-md overflow-hidden mb-3 
            ${index === 0 || index === 1 || index ===4 || index === 3 ? "bg-white" : "bg-black"} group`}
        >
          {/* Image (always visible on mobile, fades on hover in desktop) */}
          <img
            src={trackPrize.image}
            alt={trackPrize.amount}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition-opacity duration-300 lg:group-hover:opacity-0"
          />

          {/* Gradient overlay (only on large screens) */}
          <div
            className="absolute inset-0 hidden lg:flex items-center justify-center text-black text-2xl sm:text-2xl lg:text-3xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: overlayGradient }}
          >
            Click here to know more
          </div>
        </div>

        {/* Amount text */}
        <div className="text-2xl sm:text-4xl font-extrabold text-gray-900 text-center pt-4">
          {trackPrize.amount}
          {/* Bracket text only on mobile/tablet */}
          <span className="block text-base sm:text-lg font-normal text-gray-700 lg:hidden">
            (Click here to know more)
          </span>
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
    {modalPrize.description && <p dangerouslySetInnerHTML={{ __html: modalPrize.description }} />}
    {modalPrize.details && (
  <p
    dangerouslySetInnerHTML={{ __html: modalPrize.details }}
  />
)}
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
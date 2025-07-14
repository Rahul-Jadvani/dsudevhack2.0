import "./PrizesSection.css";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

  // Use position to determine color for consistency
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

    // Calculate number of cells based on container size
    const rect = container.getBoundingClientRect();
    const cellSize = 48; // matches CSS grid size
    const cols = Math.ceil(rect.width / cellSize);
    const rows = Math.ceil(rect.height / cellSize);

    // Create grid cells
    const cells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells.push({ x, y, isActive: false });
      }
    }
    setGridCells(cells);

    // Update grid on resize
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
      // Randomly activate 10% of cells
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
      image:"/images/prizes/1.svg",
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
  ];
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.1 });
   const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    if (isInView && !isMounted) {
      setIsMounted(true);
    }
  }, [isInView, isMounted]);

  return (
    <>
      {/* Header bar */}
      <div className="fixed-header">
        <div className="header-content">
          <div className="header-title">DSU Hackathon '25</div>
          <div className="header-date">
            <span className="date-tag">&lt;date&gt;</span> September, 2025{" "}
            <span className="date-tag">&lt;/date&gt;</span>
          </div>
        </div>
      </div>

      <section id="prizes" className="prizes-section">
        <div className="container mx-auto px-4 md:px-8 lg:px-4 xl:px-2 max-w-full">
          <h1 className="prizes-heading">Prizes</h1>

          <div className="divider"></div>

          <div className="prizes-grid">
            {prizes.map((prize, index) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: false, amount: 0.2 });
              let placeClass = "";
              if (prize.place.startsWith("1st")) placeClass = "place-1";
              else if (prize.place.startsWith("2nd")) placeClass = "place-2";
              else if (prize.place.startsWith("3rd")) placeClass = "place-3";
              else if (prize.place.startsWith("4th")) placeClass = "place-4";
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
                  <div className={`prize-header ${placeClass}`}>
                    <span className="prize-header-group">
                      <span className="prize-hash">#</span>
                      <span className={`prize-place ${placeClass}`}>
                        {prize.place}
                      </span>
                      <span className="prize-bracket">{" }"}</span>
                    </span>
                  </div>
             <div className="prize-content">
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
      <div className="absolute inset-0 items-center justify-center pl-[25px] lg:pl-[55px]">
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

          <div className="divider"></div>

          {/* <div className="coming-soon-container"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
            {gridCells.map((cell, index) => (
              <div
                key={index}
                className={`grid-cell ${cell.isActive ? 'active' : ''}`}
                style={{
                  left: `${cell.x * 48}px`,
                  top: `${cell.y * 48}px`,
                  '--cell-color': getCellColor(cell.x, cell.y)
                } as React.CSSProperties}
              />
            ))}
            <div className="coming-soon-content">
              <div className="coming-soon-section">
                <h2 className="coming-soon-title">Track Prizes</h2>
                <div className="coming-soon-message">
                  Coming Soon
                </div>
              </div>
              <div className="coming-soon-divider"></div>
              <div className="coming-soon-section">
                <h2 className="coming-soon-title">Participant Benefits</h2>
                <div className="coming-soon-message">
                  Coming Soon
                </div>
              </div>
            </div>
          </div> */}

          {/* Add padding at the bottom to prevent content from being hidden behind the fixed navbar */}
          <div className="pb-16"></div>
        </div>
      </section>
    </>
  );
};

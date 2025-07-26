import React from 'react';

function FlowingMenu() {
  const marqueeText =
    'Submission round is live now. You can download the template from the timeline section.';

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <span
      key={idx}
      className="text-[#060010] uppercase font-semibold text-[2.2vh] leading-[1.2] px-[2vw] whitespace-nowrap"
    >
      {marqueeText}
    </span>
  ));

  return (
    <div className="w-full h-[6vh] overflow-hidden">
      <div className="relative h-full w-full overflow-hidden text-center shadow-[0_-1px_0_0_#fff] bg-[#84b7f2]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="h-full w-[200%] flex">
            <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
              {repeatedMarqueeContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;

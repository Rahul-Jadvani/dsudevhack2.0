function FlowingMenu() {
  const message = 'Registration Closed';

  // repeat enough times to cover large screens (say 20 instead of 4)
  const repeatedMarqueeContent = Array.from({ length: 20 }).map((_, idx) => (
    <span
      key={idx}
      className="uppercase font-semibold text-[2.2vh] leading-[1.2] px-[3vw] whitespace-nowrap flex-shrink-0 text-white"
    >
      {message}
    </span>
  ));

  return (
    <div className="w-full h-[6vh] overflow-hidden">
      <div className="relative h-full w-full overflow-hidden text-center shadow-[0_-1px_0_0_#fff] bg-[#0f172a]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* use large width so animation has room */}
          <div className="h-full w-[400%] flex">
            <div className="flex items-center relative h-full w-full will-change-transform animate-marquee">
              {repeatedMarqueeContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowingMenu;

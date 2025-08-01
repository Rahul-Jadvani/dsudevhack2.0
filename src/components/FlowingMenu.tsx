import { Link } from 'react-router-dom';

function FlowingMenu({ handleNavClick }) {
  const firstSentence = 'Submission round is live now.';
  const secondSentence =
    ' You can download the template from the timeline section.';

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <span
      key={idx}
      className="uppercase font-semibold text-[2.2vh] leading-[1.2] px-[2vw] whitespace-nowrap flex-shrink-0"
    >
      <span className="text-white">{firstSentence}</span>
      <span className="text-[rgb(162_203_252)]">{secondSentence}</span>
    </span>
  ));

  return (
    <div className="w-full h-[6vh] overflow-hidden">
      <Link
        to="/"
        onClick={(e) => {
          e.preventDefault();
          handleNavClick({ path: '/', sectionId: 'timeline' });
        }}
        className="block w-full h-full cursor-pointer"
      >
        <div className="relative h-full w-full overflow-hidden text-center shadow-[0_-1px_0_0_#fff] bg-[#0f172a]">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="h-full w-[200%] flex">
              <div className="flex items-center relative h-full w-[200%] will-change-transform animate-marquee">
                {repeatedMarqueeContent}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default FlowingMenu;

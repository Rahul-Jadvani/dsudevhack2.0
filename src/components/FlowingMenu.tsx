function FlowingMenu() {
  const firstSentence = 'Shortlisted teams are announced.';
  const secondSentence =
    'Click here for more info!';

  const TARGET_TEXT = 'Ideas Lock In — Let the Best Concepts Win!';

  const normalize = (s) =>
    (s || '')
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();

  const scrollToText = (text) => {
    const selectors = 'h1,h2,h3,h4,h5,h6,p,span,li,div,a,button,strong,em';
    const nodes = Array.from(document.querySelectorAll(selectors));

    const normText = normalize(text);


    const match = nodes.find((el) => normalize(el.textContent).includes(normText));

    const fallback =
      match ||
      nodes.find((el) => {
        const t = normalize(el.textContent);
        return t.includes('shortlisted teams') && (t.includes('september') || t.includes('sep'));
      });

    const targetEl = fallback;
    if (!targetEl) return;
    const blockEl =
      targetEl.closest('[data-timeline-item], section, article, .card, li, div') || targetEl;

    blockEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    blockEl.classList.add('ring-4', 'ring-yellow-300', 'rounded-md', 'transition');
    setTimeout(() => {
      blockEl.classList.remove('ring-4', 'ring-yellow-300');
    }, 1600);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <span
      key={idx}
      className="uppercase font-semibold text-[2.2vh] leading-[1.2] px-[2vw] whitespace-nowrap flex-shrink-0"
    >
      <span className="text-white">{firstSentence}</span>
      <span className="text-[rgb(162_203_252)] ml-2">{secondSentence}</span>
    </span>
  ));

  return (
    <button
      type="button"
      onClick={() => scrollToText(TARGET_TEXT)}
      aria-label="Jump to: Shortlisted teams announcements on 1st of September"
      className="block w-full h-[6vh] overflow-hidden cursor-pointer"
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
    </button>
  );
}

export default FlowingMenu;

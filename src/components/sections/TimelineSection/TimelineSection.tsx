import { Timeline } from '../../Timeline';
import { Boxes } from "../../ui/background-boxes.tsx";
import { FiDownload } from "react-icons/fi";


const timelineData = [
  {
    title: 'Registration starts',
    content: (
      <div>
        <div className="font-semibold text-base md:text-2xl text-white mb-1">The Race Begins — Register. Team Up. Get Set to Hack!</div>
        <div className="text-sm md:text-lg text-blue-500">1st July 2025</div>
      </div>
    ),
  },
  {
    title: 'Idea submissions start',
    content: (
      <div>
        <div className="font-semibold text-base md:text-2xl text-white mb-1">
          Time to Spark Ideas — Let the Innovation Flow!
          <a
          href="/images/idea_template.ppt"
          download
          className="inline-flex items-center gap-2 bg-[#d6336c] hover:bg-[#c2255c] text-white font-medium py-1 px-3 md:py-1.5 md:px-4 rounded transition duration-200 text-xs md:text-base"
        >
          <FiDownload className="text-lg" />
          Download Template
        </a>
        </div>
        <div id="idea-submissions-start"></div>
        <div className="text-sm md:text-lg text-blue-500 mb-3">25th July 2025</div>
      </div>
    ),
  },
  {
    title: 'Registration Deadline',
    content: (
      <div>
        <div className="font-semibold text-base md:text-2xl text-white mb-1">Last Call to Enter the Arena!</div>
        <div className="text-sm md:text-lg text-blue-500">18th August 2025</div>
      </div>
    ),
  },
  {
    title: 'Idea Submission Deadline',
    content: (
      <div>
        <div className="font-semibold text-base md:text-2xl text-white mb-1">Ideas Lock In — Let the Best Concepts Win!</div>
        <div className="text-sm md:text-lg text-blue-500">20th August 2025</div>
      </div>
    ),
  },
  {
    title: 'Shortlisted Teams Announcement',
    content: (
      <div>
        <div className="font-semibold text-base md:text-2xl text-white mb-1">And the Chosen Ones Are... Meet the Finalists!</div>
        <div className="text-sm md:text-lg text-blue-500">1st September 2025</div>
      </div>
    ),
  },
  {
    title: 'Hacking Period Starts',
    content: (
      <div>
        <div className="font-semibold text-base md:text-2xl text-white mb-1">The Code War Begins — Hack Like There’s No Tomorrow!</div>
        <div className="text-sm md:text-lg text-blue-500">12th September 2025</div>
      </div>
    ),
  },
  {
    title: 'Final Submission',
    content: (
      <div>
        <div className="font-semibold text-base md:text-2xl text-white mb-1">One Last Push — Deliver Your Innovation!</div>
        <div className="text-sm md:text-lg text-blue-500">13th September 2025</div>
      </div>
    ),
  },
  {
    title: 'Final Evaluation Result',
    content: (
      <div>
        <div className="font-semibold text-base md:text-2xl text-white mb-1">The Verdict is In — Witness the Best Rise!</div>
        <div className="text-sm md:text-lg text-blue-500">13th September 2025</div>
      </div>
    ),
  },
];

export const TimelineSection = () => {
  return (
    <div id="timeline" className="relative w-full overflow-hidden py-2 pb-32">
      <div className="absolute inset-0 z-0">
        <Boxes />
      </div>
      <div className="relative z-0">
        <Timeline data={timelineData} />
      </div>
    </div>
  );
};

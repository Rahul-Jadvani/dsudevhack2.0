import { Link } from 'react-router-dom';

export const AlternateHeader = () => {
  return (
    <header className="w-full z-50">
      {/* White header with title on left and date on right */}
      <div className="bg-white flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <div className="text-black font-bold text-xl">
          DEVHACK '25
        </div>

        <div className="bg-[#001529] text-white px-4 py-2">
          <div className="text-[#4FB3FF]">
            <span>&lt;date&gt;</span> July-September, 2025 <span>&lt;/date&gt;</span>
          </div>
        </div>
      </div>
    </header>
  );
};

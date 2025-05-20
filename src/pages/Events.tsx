
import { MainLayout } from '../components/layout/MainLayout';

export const Events = () => {
  const events = [
    {
      title: "Kickoff Webinar: Introduction to Sui Overflow 2025",
      date: "February 15, 2025",
      time: "10:00 AM - 11:30 AM PST",
      description: "Join us for an overview of the hackathon, track introductions, and Q&A session with the organizing team.",
      location: "Virtual (Zoom)",
      registration: "Required"
    },
    {
      title: "Workshop: Building DeFi Applications on Sui",
      date: "February 28, 2025",
      time: "1:00 PM - 3:00 PM PST",
      description: "Learn how to develop DeFi applications on the Sui blockchain with PYTH integration.",
      location: "Virtual (Zoom)",
      registration: "Required"
    },
    {
      title: "Office Hours: Technical Support Session",
      date: "Weekly - Every Wednesday",
      time: "11:00 AM - 1:00 PM PST",
      description: "Drop in to ask questions and get technical support from Sui engineers.",
      location: "Discord",
      registration: "Not required"
    },
    {
      title: "Workshop: AI Integration with Blockchain",
      date: "March 10, 2025",
      time: "9:00 AM - 11:00 AM PST",
      description: "Explore the intersection of AI and blockchain with practical examples on Sui.",
      location: "Virtual (Zoom)",
      registration: "Required"
    },
    {
      title: "Mentorship Day",
      date: "April 15, 2025",
      time: "8:00 AM - 5:00 PM PST",
      description: "Book 1-on-1 sessions with mentors specializing in various aspects of blockchain development.",
      location: "Virtual (Calendly)",
      registration: "Required"
    },
    {
      title: "Demo Days",
      date: "May 23-24, 2025",
      time: "9:00 AM - 6:00 PM PST",
      description: "Present your project to judges and the community over these two days.",
      location: "Virtual (Zoom)",
      registration: "Required for presenters"
    },
    {
      title: "Award Ceremony",
      date: "May 31, 2025",
      time: "12:00 PM - 2:00 PM PST",
      description: "Join us as we announce the winners across all tracks and special awards.",
      location: "Virtual (Zoom)",
      registration: "Not required"
    }
  ];

  return (
    <MainLayout>
      <div className="container px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">Events</h1>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Timeline</h2>
          <div className="bg-hackathon-darkBlue border border-gray-800 p-6 rounded">
            <ul className="relative border-l border-gray-700">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full -left-3">
                  <div className="w-3 h-3 bg-blue-300 rounded-full"></div>
                </span>
                <h3 className="font-semibold text-lg">Registration Opens</h3>
                <p className="text-gray-400">February 12, 2025</p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-purple-600 rounded-full -left-3">
                  <div className="w-3 h-3 bg-purple-300 rounded-full"></div>
                </span>
                <h3 className="font-semibold text-lg">Hackathon Begins</h3>
                <p className="text-gray-400">April 1, 2025</p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-yellow-600 rounded-full -left-3">
                  <div className="w-3 h-3 bg-yellow-300 rounded-full"></div>
                </span>
                <h3 className="font-semibold text-lg">Project Submission Deadline</h3>
                <p className="text-gray-400">May 15, 2025</p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-green-600 rounded-full -left-3">
                  <div className="w-3 h-3 bg-green-300 rounded-full"></div>
                </span>
                <h3 className="font-semibold text-lg">Demo Days</h3>
                <p className="text-gray-400">May 23-24, 2025</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-red-600 rounded-full -left-3">
                  <div className="w-3 h-3 bg-red-300 rounded-full"></div>
                </span>
                <h3 className="font-semibold text-lg">Winners Announced</h3>
                <p className="text-gray-400">May 31, 2025</p>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Scheduled Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div key={index} className="bg-hackathon-darkBlue border border-gray-800 p-6 rounded track-card">
                <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                <div className="text-blue-400 mb-2">📅 {event.date}</div>
                <div className="text-gray-300 mb-4">⏰ {event.time}</div>
                <p className="text-gray-400 mb-4">{event.description}</p>
                <div className="flex justify-between text-sm">
                  <div className="text-gray-400">📍 {event.location}</div>
                  <div className={`${
                    event.registration === "Required" ? "text-yellow-400" : "text-green-400"
                  }`}>
                    🎟️ {event.registration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

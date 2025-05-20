
import { MainLayout } from '../components/layout/MainLayout';

export const Discord = () => {
  return (
    <MainLayout>
      <div className="container px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">Join Our Discord Community</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-hackathon-darkBlue border border-gray-800 p-8 rounded-lg mb-10">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-600 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M9 8l3 8l3-8"></path>
                  <path d="M7 17l.48 .48a4 4 0 0 0 5.04 0l.48 -.48"></path>
                  <path d="M7 8c0 -1.863 1.142 -3 3 -3c1.857 0 3 1.137 3 3a5 5 0 0 1 5 5v4c0 1 0 3 -2 3"></path>
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold">Discord Community</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              Join our active Discord community to connect with other participants, mentors, and the organizing team.
              Get real-time support, form teams, and stay updated on all hackathon announcements.
            </p>
            
            <div className="bg-indigo-900/30 p-6 rounded-lg mb-6">
              <h3 className="text-lg font-medium mb-4">Why Join Our Discord?</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-300">
                <li>Get technical support from mentors and engineers</li>
                <li>Find teammates or join existing teams</li>
                <li>Participate in exclusive AMAs and discussions</li>
                <li>Access resources and announcements</li>
                <li>Network with industry professionals</li>
              </ul>
            </div>
            
            <a 
              href="https://discord.gg/DEVHACK2025" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-md font-medium transition-colors"
            >
              Join Discord Server
            </a>
          </div>
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Discord Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: "# announcements",
                  description: "Official hackathon updates and important information"
                },
                {
                  name: "# general",
                  description: "General discussion about DEVHACK and blockchain technology"
                },
                {
                  name: "# team-formation",
                  description: "Find teammates or join existing teams"
                },
                {
                  name: "# technical-support",
                  description: "Get help with technical issues and questions"
                },
                {
                  name: "# track-defi",
                  description: "DeFi track specific discussion and support"
                },
                {
                  name: "# track-ai",
                  description: "AI track specific discussion and support"
                },
                {
                  name: "# track-infra",
                  description: "Infrastructure track specific discussion and support"
                },
                {
                  name: "# track-crypto",
                  description: "Cryptography track specific discussion and support"
                }
              ].map((channel, index) => (
                <div key={index} className="bg-hackathon-darkBlue border border-gray-800 p-4 rounded">
                  <h3 className="font-mono text-indigo-400 mb-2">{channel.name}</h3>
                  <p className="text-gray-300 text-sm">{channel.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Discord Etiquette</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Be respectful and professional in all communications</li>
              <li>Use the appropriate channels for different topics</li>
              <li>Don't spam or post excessive messages</li>
              <li>Search for answers before asking previously answered questions</li>
              <li>Help others when you can - community support makes the hackathon better for everyone</li>
              <li>Follow the code of conduct at all times</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

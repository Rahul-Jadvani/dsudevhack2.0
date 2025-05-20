
import { MainLayout } from '../components/layout/MainLayout';

export const Handbook = () => {
  return (
    <MainLayout>
      <div className="container px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">Participant Handbook</h1>
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Welcome to DEVHACK 2025</h2>
            <p className="text-gray-300 mb-4">
              This handbook contains everything you need to know as a participant in the DEVHACK hackathon.
              Please read through this guide carefully as it contains important information about rules,
              expectations, and resources available to you throughout the event.
            </p>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Register for the hackathon through the official website</li>
              <li>Join our Discord community for updates and networking</li>
              <li>Attend the kickoff webinar for important announcements</li>
              <li>Form or join a team (1-4 members per team)</li>
              <li>Start exploring the documentation and resources</li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Rules & Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Projects must be built during the hackathon period (April 1 - May 15)</li>
              <li>You can use existing libraries and frameworks, but your core solution must be original</li>
              <li>Open source projects are encouraged but not required</li>
              <li>Projects must run on the Sui blockchain</li>
              <li>Teams are limited to 4 members maximum</li>
              <li>One person can participate in only one team</li>
              <li>All code must be your own or properly licensed</li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Submission Requirements</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li>Working demo (video or live demo link)</li>
              <li>Project description (problem, solution, impact)</li>
              <li>GitHub repository link</li>
              <li>Technical documentation</li>
              <li>Team information</li>
              <li>Track selection (can select multiple if applicable)</li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Judging Criteria</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Innovation (25%)</strong> - Originality and creativity of the solution</li>
              <li><strong>Technical Implementation (25%)</strong> - Quality of code, architecture, and technical choices</li>
              <li><strong>Impact & Utility (20%)</strong> - Potential impact and practical usefulness</li>
              <li><strong>Design & User Experience (15%)</strong> - Interface design and user journey</li>
              <li><strong>Presentation (15%)</strong> - Quality of demo and project presentation</li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Resources</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Documentation</strong> - Comprehensive guides on Sui and Move programming</li>
              <li><strong>Starter Templates</strong> - Pre-configured project templates to help you start quickly</li>
              <li><strong>Workshops & Tutorials</strong> - Recorded and live sessions on key topics</li>
              <li><strong>Office Hours</strong> - Weekly technical support sessions with engineers</li>
              <li><strong>Mentorship</strong> - One-on-one sessions with industry experts</li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Support Channels</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-300">
              <li><strong>Discord</strong> - Primary communication channel for questions and networking</li>
              <li><strong>Email</strong> - For private inquiries: support@DEVHACK2025.io</li>
              <li><strong>Office Hours</strong> - Weekly sessions for direct technical help</li>
              <li><strong>Track-Specific Channels</strong> - Dedicated support for each hackathon track</li>
            </ul>
          </div>
          
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Important Dates</h2>
            <ul className="list-none space-y-2 text-gray-300">
              <li><strong>February 12, 2025</strong> - Registration Opens</li>
              <li><strong>April 1, 2025</strong> - Hackathon Officially Begins</li>
              <li><strong>May 15, 2025</strong> - Project Submission Deadline</li>
              <li><strong>May 23-24, 2025</strong> - Demo Days</li>
              <li><strong>May 31, 2025</strong> - Winners Announced</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

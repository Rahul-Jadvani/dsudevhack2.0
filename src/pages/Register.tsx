
import { MainLayout } from '../components/layout/MainLayout';
import { useState } from 'react';
import { Check } from 'lucide-react';

export const Register = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would send the form data to a server
    // For now, just show the success message
    setFormSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="container px-6 py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">Register for DEVHACK 2025</h1>
        
        <div className="max-w-3xl mx-auto">
          {formSubmitted ? (
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-8 text-center animate-fade-in">
              <div className="mx-auto w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Check size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
              <p className="text-gray-300 mb-6">
                Thank you for registering for DEVHACK 2025! You should receive a confirmation email shortly with more details about the hackathon.
              </p>
              <p className="text-gray-300">
                Don't forget to join our Discord community to start connecting with other participants and get access to resources.
              </p>
            </div>
          ) : (
            <div className="bg-hackathon-darkBlue border border-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 mb-2">First Name*</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Last Name*</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Email Address*</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Discord Username</label>
                  <input
                    type="text"
                    className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white"
                    placeholder="username#0000"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Preferred Track(s)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['DeFi', 'Infra & Tooling', 'AI', 'Cryptography', 'Degen'].map((track) => (
                      <label key={track} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded-sm bg-gray-900 border-gray-700" />
                        <span className="text-gray-300">{track}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Experience Level</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white">
                    <option value="">Select</option>
                    <option value="beginner">Beginner (0-1 years)</option>
                    <option value="intermediate">Intermediate (1-3 years)</option>
                    <option value="experienced">Experienced (3-5 years)</option>
                    <option value="expert">Expert (5+ years)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">How did you hear about DEVHACK 2025?</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded-md px-4 py-2 text-white">
                    <option value="">Select</option>
                    <option value="social">Social Media</option>
                    <option value="friend">Friend/Colleague</option>
                    <option value="email">Email Newsletter</option>
                    <option value="website">Website</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    id="terms"
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="terms" className="text-gray-300 text-sm">
                    I agree to the <a href="#" className="text-blue-400 hover:underline">Terms and Conditions</a> and <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>. I understand my data will be processed as described in the Privacy Policy.
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
                >
                  Complete Registration
                </button>
                
                <p className="text-gray-400 text-sm text-center">
                  * Required fields
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

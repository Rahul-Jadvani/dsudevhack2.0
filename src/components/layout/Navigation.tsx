import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navigation.css';

const navItems = [
  { name: 'Overview', path: '/', sectionId: 'overview' },
  { name: 'Tracks & Prizes', path: '/', sectionId: 'tracks' },
  { name: 'Sponsors', path: '/', sectionId: 'sponsors' },
  { name: 'Events', path: '/', sectionId: 'events' },
  { name: 'Insights', path: '/insights', sectionId: null },
  { name: 'FAQ', path: '/', sectionId: 'faq' },
  { name: 'Participant Handbook', path: '/handbook', sectionId: 'handbook' },
  { name: 'Discord', path: '/discord', sectionId: 'discord' }
];

export const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleNavClick = (item: { path: string, sectionId: string | null }) => {
    setMobileMenuOpen(false);
    if (location.pathname !== item.path) return;
    if (item.sectionId) {
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setActiveSection(item.sectionId);
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        const sections = navItems
          .filter(item => item.sectionId && item.path === '/')
          .map(item => item.sectionId as string);

        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (current) setActiveSection(current);
        setScrolled(window.scrollY > 20);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrolled(true);
    }
  }, [location.pathname]);

  const isActivePath = (item: { path: string, sectionId: string | null }) => {
    if (item.path === '/' && location.pathname === '/' && item.sectionId) {
      return activeSection === item.sectionId;
    }
    return location.pathname === item.path;
  };

  return (
    <>
      <header className="w-full fixed top-0 z-50">
        <div className="md:hidden bg-[#001529] text-white flex justify-center items-center px-4 py-2">
          <div className="text-[#4FB3FF]">
            <span>&lt;date&gt;</span> July-September, 2025 <span>&lt;/date&gt;</span>
          </div>
        </div>

        <div className="bg-[#001529] text-white flex justify-between items-center px-4 py-3 border-b border-gray-800">
          <Link to="/" className="text-white font-bold text-xl">
            DEVHACK '25
          </Link>

          <div className="flex items-center">
            <div className="hidden md:block text-[#4FB3FF] mr-4">
              <span>&lt;date&gt;</span> July-September, 2025 <span>&lt;/date&gt;</span>
            </div>

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-300 hover:text-white mr-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="bg-[#4FB3FF] w-10 h-10 flex items-center justify-center cursor-pointer">
              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 bg-[#001529] rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-hackathon-darkBlue/95 backdrop-blur-md animate-fade-in fixed w-full z-50">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => handleNavClick(item)}
                  className={`nav-item px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white text-left transition-all ${isActivePath(item) ? 'bg-gray-800 text-white border-l-4 border-blue-500' : ''}`}
                >
                  {item.name}
                </button>
              ))}
              <Link
                to="/register"
                className="nav-item px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </nav>
          </div>
        )}
      </header>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-hackathon-navy/95 backdrop-blur-md shadow-lg">
        <div className="flex overflow-x-auto">
          {navItems.map((item) =>
            item.path === '/' && item.sectionId ? (
              <button
                type="button"
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`nav-item px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors whitespace-nowrap ${isActivePath(item) ? 'bg-blue-600 text-white' : ''}`}
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors whitespace-nowrap ${item.path === location.pathname ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
          <Link
            to="/register"
            className="nav-item ml-auto px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Register
          </Link>
          <div className="px-4 py-3 text-blue-400">⌘</div>
        </div>
      </div>
    </>
  );
};

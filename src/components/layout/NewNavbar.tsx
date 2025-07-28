import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './NewNavbar.css';
import FlowingMenu from '@/components/FlowingMenu';

export const NewNavbar = () => {
  const MLHBadge = () => (
    <a
    id="mlh-trust-badge"
    href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=red"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img
      src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-red.svg"
      alt="Major League Hacking 2026 Hackathon Season"
      style={{ width: '100%' }}
    />
  </a>  
  );

    
  
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = [
    { name: 'Prizes', path: '/', sectionId: 'prizes' },
    { name: 'Tracks', path: '/', sectionId: 'tracks' },
    { name: 'Timeline', path: '/', sectionId: 'timeline' },
    { name: 'Sponsors', path: '/', sectionId: 'sponsors' },
    { name: 'Team', path: '/', sectionId: 'organising-team' },
    { name: 'Archives', path: 'https://dsudevhack.tech/', sectionId: 'archives' },
    { name: 'FAQ', path: '/', sectionId: 'faq' },
    { name: 'Discord', path: 'https://discord.gg/rs3dPP5PcM', sectionId: 'discord' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (item: { path: string, sectionId: string | null }) => {
    setMobileMenuOpen(false);

    if (location.pathname !== item.path) {
      return;
    }

    if (item.sectionId) {
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <MLHBadge />
      <header data-nav-bar-height="" className="header">
        {/* Mobile header - only visible on small screens */}
        <div className="mobile-date-bar">
          <span className="code">&lt;date&gt;</span>
          <span className="date-text">12,13th September, 2025</span>
          <span className="code">&lt;/date&gt;</span>
        </div>
        <div className="mobile-header-main">
          <div className="card-image">
            <img src="/images/logos/logoo 1.png" alt="DSU Logo" />
          </div>
          <div className="mobile-header-title">
            <span>DSU DEVHACK </span>
          </div>
          <div
            className={`mobile-menu-dots ${mobileMenuOpen ? 'mobile-menu-dots-active' : ''}`}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <div className="mobile-menu-x">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : (
              <>
                <div className="mobile-menu-dot"></div>
                <div className="mobile-menu-dot"></div>
                <div className="mobile-menu-dot"></div>
                <div className="mobile-menu-dot"></div>
                <div className="mobile-menu-dot"></div>
                <div className="mobile-menu-dot"></div>
                <div className="mobile-menu-dot"></div>
                <div className="mobile-menu-dot"></div>
                <div className="mobile-menu-dot"></div>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu grid */}
        {mobileMenuOpen && (
          <>
            <div className="mobile-menu-backdrop" onClick={toggleMobileMenu}></div>
            <div className="mobile-menu-grid">
              <div className="mobile-menu-row">
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'prizes' })}>
                  Prizes
                </Link>
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'tracks' })}>
                  Tracks
                </Link>
              </div>
              <div className="mobile-menu-row">
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'timeline' })}>
                  Timeline
                </Link>
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'sponsors' })}>
                  Sponsors
                </Link>
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'organising-team' })}>
                  Team
                </Link>
              </div>
              <div className="mobile-menu-row">
                <a
                  href="https://dsudevhack.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-menu-item"
                >
                  Archives
                </a>

                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'faq' })}>
                  FAQ
                </Link>

                <a
                  href="https://www.instagram.com/p/DLiSQKwzqnr/?igsh=dTdpNmIwdzl6ZmEz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-menu-item"
                >
                  Instagram
                </a>
              </div>
              <div className="mobile-menu-row">
                <Link to="https://discord.gg/rs3dPP5PcM" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/discord', sectionId: 'discord' })}>
                  Discord
                </Link>
                <Link to="https://dsudevhack2.devfolio.co/application" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'hero' })}>
                  Register
                </Link>
              </div>
              <div className="mobile-menu-row">
              <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'timeline' })}>
                  Download Template
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Desktop header - only visible on larger screens */}
        <div className="desktop-navbar">
          <div className="desktop-navbar-content">
            <div className="card-image">
              <img src="/images/logos/logoo 1.png" alt="DSU Logo" />
            </div>
            <div className="desktop-navbar-left">
              <span className="desktop-title">DSU DEVHACK </span>
            </div>
            <div className="desktop-navbar-right">
              <span className="desktop-date-tag">&lt;date&gt;</span>
              <span className="desktop-date">12,13th September, 2025</span>
              <span className="desktop-date-tag">&lt;/date&gt;</span>
            </div>
          </div>
          <div className="desktop-flowing-menu w-full">
            <div className="h-px bg-black w-full" />
            <FlowingMenu handleNavClick={handleNavClick} />
          </div>
        </div>
        <div className="mobile-flowing-menu w-full">
          <FlowingMenu handleNavClick={handleNavClick} />
        </div>
      </header>

      <nav className="nav">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-link size--${Math.floor(Math.random() * 4) + 1}`}
            onClick={() => handleNavClick(item)}
          >
            <div className="nav-link__inner">
              <div className="nav-link__text-wrap">
                <span className="p-medium u--fw-med">{item.name}</span>
              </div>
            </div>
          </Link>
        ))}
        <Link to="http://dsudevhack2.devfolio.co"
          className="nav-register">
          <div className="button-text__wrap">
            <div className="text-wrap__innner">
              <span className="p-medium u--fw-med">Register</span>
            </div>
          </div>
          <div className="nav-register-arrow">
            <svg
              className="arrow-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-5-5l5 5-5 5" />
            </svg>
          </div>
        </Link>

      </nav>
    </>
  );
};

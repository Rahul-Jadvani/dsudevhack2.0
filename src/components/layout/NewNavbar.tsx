import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './NewNavbar.css';

export const NewNavbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Prizes', path: '/', sectionId: 'prizes' },
    { name: 'Themes', path: '/', sectionId: 'themes' },
    { name: 'Timeline', path: '/', sectionId: 'timeline' },
    { name: 'Sponsors', path: '/', sectionId: 'sponsors' },
    { name: 'Archives', path: 'https://dsudevhack.tech/', sectionId: 'archives' },
    { name: 'FAQ', path: '/', sectionId: 'faq' },
    { name: 'Discord', path: '/discord', sectionId: 'discord' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (item: { path: string, sectionId: string | null }) => {
    setMobileMenuOpen(false);

    if (location.pathname !== item.path) {
      // Will navigate to a different page
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
      <header data-nav-bar-height="" className="header">
        {/* Mobile header - only visible on small screens */}
        <div className="mobile-date-bar">
          <span className="code">&lt;date&gt;</span>
          <span className="date-text">September, 2025</span>
          <span className="code">&lt;/date&gt;</span>
        </div>
        <div className="mobile-header-main">
          <div className="card-image">
            <img src="/images/hb-logo.png" alt="DSU Logo" />
          </div>
          <div className="mobile-header-title">
            <span>DSU DEVHACK 2.0</span>
          </div>
          <div
            className={`mobile-menu-dots ${mobileMenuOpen ? 'mobile-menu-dots-active' : ''}`}
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <div className="mobile-menu-x">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'themes' })}>
                  Themes
                </Link>
              </div>
              <div className="mobile-menu-row">
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'timeline' })}>
                  Timeline
                </Link>
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'sponsors' })}>
                  Sponsors
                </Link>
              </div>
              <div className="mobile-menu-row">
                <Link to="https://dsudevhack.tech/" className="mobile-menu-item" onClick={() => handleNavClick({ path: 'https://dsudevhack.tech/', sectionId: 'archives' })}>
                  Archives
                </Link>
                <Link to="/" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/', sectionId: 'faq' })}>
                  FAQ
                </Link>
              </div>
              <div className="mobile-menu-row">
                <Link to="/discord" className="mobile-menu-item" onClick={() => handleNavClick({ path: '/discord', sectionId: 'discord' })}>
                  Discord
                </Link>
                <Link to="https://dsudevhack.tech" className="mobile-menu-item register">
                  Register
                </Link>
              </div>
            </div>
          </>
        )}

        {/* Desktop header - only visible on larger screens */}
        <div className="desktop-navbar">
          <div className="desktop-navbar-content">
            <div className="card-image">
              <img src="/images/hb-logo.png" alt="DSU Logo" />
            </div>
            <div className="desktop-navbar-left">
              <span className="desktop-title">DSU DEVHACK 2.0</span>
            </div>
            <div className="desktop-navbar-right">
              <span className="desktop-date-tag">&lt;date&gt;</span>
              <span className="desktop-date">September, 2025</span>
              <span className="desktop-date-tag">&lt;/date&gt;</span>
            </div>
          </div>
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
        <Link to="https://dsudevhack.tech"
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

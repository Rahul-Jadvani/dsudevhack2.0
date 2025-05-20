import { Link } from 'react-router-dom';
import { FaDiscord, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Contact Us */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <p className="footer-text">📧 Email: dsudevhack@dsu.edu.in</p>
            <p className="footer-text">📞 Phone: +1 (123) 456-7890</p>
            <p className="footer-text">📍 DSU main campus, Harohalli, Ramanagara, Karnataka, India</p>
          </div>

          {/* Follow Us */}
          <div className="footer-section">
            <h3 className="footer-heading">Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="X (formerly Twitter)" title="X (formerly Twitter)">
                <FaXTwitter size={24} />
              </a>
              <a href="#" className="social-link" aria-label="Discord" title="Discord">
                <FaDiscord size={24} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram" title="Instagram">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="social-link" aria-label="GitHub" title="GitHub">
                <FaGithub size={24} />
              </a>
              <a href="#" className="social-link" aria-label="YouTube" title="YouTube">
                <FaYoutube size={24} />
              </a>
              <a href="#" className="social-link" aria-label="Google Maps" title="Google Maps">
                <FaMapMarkerAlt size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-heading">Hackathon Venue</h3>
            <ul className="venue-links">
              <li>
                <Link to="/code-of-conduct" className="venue-link">
                  Dayananda Sagar University Harohalli
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="venue-link">
                  Bangalore, Karnataka 562112
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} DEVHACK. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

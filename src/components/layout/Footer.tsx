import { Link } from 'react-router-dom';
import { FaDiscord, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

export const Footer = () => {
  return (
    <div className="footer-wrapper">
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Contact Us */}
            <div className="footer-section">
              <h3 className="footer-heading">Contact Us</h3>
              <p className="footer-text">📧 Email: dsudevhack@dsu.edu.in</p>
              {/* Student Coordinators */}
              </div>
              <div className="footer-section">
                <h3 className="footer-heading">Student Coordinators</h3>
                <p className="footer-text">Utkarsh Priye - +91 9939635206</p>
                <p className="footer-text">Ritvik Vasundh - +91 8299686568</p>
                <p className="footer-text">Jiya Patel - +91 7383232239</p>
            </div>

            {/* Follow Us */}
            <div className="footer-section">
              <h3 className="footer-heading">Follow Us</h3>
              <div className="social-links">
                <a href="https://discord.gg/uBcyhfmhx4" className="social-link" aria-label="Discord" title="Discord">
                  <FaDiscord size={24} />
                </a>
                <a href="https://www.instagram.com/p/DLiSQKwzqnr/?igsh=dTdpNmIwdzl6ZmEz" className="social-link" aria-label="Instagram" title="Instagram" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} />
                </a>
                <a href="https://maps.app.goo.gl/sK8xbJDBUnqXm8nd9" className="social-link" aria-label="Google Maps" title="Google Maps">
                  <FaMapMarkerAlt size={24} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-heading">Hackathon Venue</h3>
              <ul className="venue-links">
                <li>
                  <Link to="https://maps.app.goo.gl/sK8xbJDBUnqXm8nd9" className="venue-link">
                    Dayananda Sagar University Devarakaggalahalli, Harohalli, Kanakapura Road, Bengaluru South District-562112, Karnataka, India
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
    </div>
  );
};

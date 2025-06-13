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
              <div className="student-coordinators">
                <h4 className="footer-subheading">Student Coordinators</h4>
                <p className="footer-text">Utkarsh Priye (Jha)</p>
                <p className="footer-text">+91 9939635206</p>
                <p className="footer-text">Ritvik Vasundh</p>
                <p className="footer-text">+91 8299686568</p>
              </div>
            </div>

            {/* Follow Us */}
            <div className="footer-section">
              <h3 className="footer-heading">Follow Us</h3>
              <div className="social-links">
                <a href="https://discord.gg/uBcyhfmhx4" className="social-link" aria-label="Discord" title="Discord">
                  <FaDiscord size={24} />
                </a>
                <a href="https://www.instagram.com/dsudevhack?igsh=MWEzeWNib2gxc2VudQ==" className="social-link" aria-label="Instagram" title="Instagram">
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
                    Dayananda Sagar University Harohalli
                  </Link>
                </li>
                <li>
                  <Link to="https://maps.app.goo.gl/sK8xbJDBUnqXm8nd9" className="venue-link">
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
    </div>
  );
};

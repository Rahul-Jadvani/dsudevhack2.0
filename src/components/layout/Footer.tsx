import { Link } from "react-router-dom";
import { FaDiscord, FaInstagram, FaGithub, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

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

            {/* Faculty Coordinator & Follow Us */}
            <div className="footer-section">
              <h3 className="footer-heading">Faculty Coordinator</h3>
              <p className="footer-text">Dr. Bipin Kumar Rai</p>
              <p className="footer-text">Professor, CSE</p>
              <h3 className="footer-heading" style={{ marginTop: "1.5em" }}>
                Follow Us
              </h3>
              <div className="social-links">
                <a
                  href="https://discord.gg/uBcyhfmhx4"
                  className="social-link"
                  aria-label="Discord"
                  title="Discord"
                >
                  <FaDiscord size={24} />
                </a>
                <a
                  href="https://www.instagram.com/p/DLiSQKwzqnr/?igsh=dTdpNmIwdzl6ZmEz"
                  className="social-link"
                  aria-label="Instagram"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://maps.app.goo.gl/sK8xbJDBUnqXm8nd9"
                  className="social-link"
                  aria-label="Google Maps"
                  title="Google Maps"
                >
                  <FaMapMarkerAlt size={24} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-heading">Hackathon Venue</h3>
              <ul className="venue-links">
                <li>
                  <Link
                    to="https://maps.app.goo.gl/sK8xbJDBUnqXm8nd9"
                    className="venue-link"
                  >
                    Dayananda Sagar University Devarakaggalahalli, Harohalli,
                    Kanakapura Road, Bengaluru South District-562112, Karnataka,
                    India
                  </Link>
                </li>
              </ul>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d167610.57847627855!2d77.5050455484939!3d12.80702514792575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5b32ad06ec57%3A0x95e7a57b8a6b94d2!2sDayananda%20Sagar%20University%20(DSU)%20-%20Main%20Campus!5e0!3m2!1sen!2sin!4v1751571647757!5m2!1sen!2sin"
                width="300"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dayananda Sagar University Location"
              ></iframe>
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

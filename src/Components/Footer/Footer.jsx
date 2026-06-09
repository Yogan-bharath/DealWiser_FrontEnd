 import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2>DealWiser</h2>
          <p>
            Compare prices across retailers and find the smartest deals instantly.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Add Deal</li>
            <li>Best Deals</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>support@dealwiser.com</p>
          <p>Made with ❤️ for smart shoppers</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} DealWiser. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
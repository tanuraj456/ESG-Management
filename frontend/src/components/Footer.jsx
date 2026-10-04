import React from 'react';
import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="eco-footer">
      <div className="eco-footer-grid">
        <div>
          <Link to="/" className="eco-footer-brand" style={{textDecoration:'none', color:'var(--eco-text-primary)'}}>
            <Leaf size={24} color="var(--eco-mint)" />
            <span>EcoSphere</span>
          </Link>
          <p className="eco-footer-desc">
            An ESG Management Platform that helps organizations bring their sustainability operations into one place.
          </p>
        </div>
        
        <div>
          <h4 className="eco-footer-title">Platform</h4>
          <ul className="eco-footer-links">
            <li><a href="#environmental">Environmental</a></li>
            <li><a href="#social">Social Impact</a></li>
            <li><a href="#governance">Governance</a></li>
            <li><a href="#platform">Platform Overview</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="eco-footer-title">Account</h4>
          <ul className="eco-footer-links">
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/signup">Get Started</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="eco-footer-bottom">
        <span>&copy; {currentYear} EcoSphere. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;

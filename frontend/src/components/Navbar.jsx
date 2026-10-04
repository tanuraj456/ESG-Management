import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="eco-navbar">
      <Link to="/" className="eco-navbar-brand">
        <Leaf size={24} color="var(--eco-mint)" />
        <span>EcoSphere</span>
      </Link>

      <div className={`eco-navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <button onClick={() => scrollToSection('platform')} className="eco-nav-link" style={{background:'none', border:'none'}}>Platform</button>
        <button onClick={() => scrollToSection('environmental')} className="eco-nav-link" style={{background:'none', border:'none'}}>Environmental</button>
        <button onClick={() => scrollToSection('social')} className="eco-nav-link" style={{background:'none', border:'none'}}>Social Impact</button>
        <button onClick={() => scrollToSection('governance')} className="eco-nav-link" style={{background:'none', border:'none'}}>Governance</button>
        <button onClick={() => scrollToSection('about')} className="eco-nav-link" style={{background:'none', border:'none'}}>About</button>
      </div>

      <div className={`eco-navbar-actions ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/login" className="eco-btn-secondary">Log in</Link>
        <Link to="/signup" className="eco-btn-primary">Get Started</Link>
      </div>

      <button 
        className="eco-mobile-menu-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Simple inline style for mobile menu if open */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, 
          background: 'var(--eco-glass)', backdropFilter: 'blur(12px)',
          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem',
          borderRadius: '12px', border: '1px solid var(--eco-border)', marginTop: '0.5rem'
        }}>
           <button onClick={() => scrollToSection('platform')} className="eco-nav-link" style={{background:'none', border:'none', textAlign:'left'}}>Platform</button>
           <button onClick={() => scrollToSection('environmental')} className="eco-nav-link" style={{background:'none', border:'none', textAlign:'left'}}>Environmental</button>
           <button onClick={() => scrollToSection('social')} className="eco-nav-link" style={{background:'none', border:'none', textAlign:'left'}}>Social Impact</button>
           <button onClick={() => scrollToSection('governance')} className="eco-nav-link" style={{background:'none', border:'none', textAlign:'left'}}>Governance</button>
           <button onClick={() => scrollToSection('about')} className="eco-nav-link" style={{background:'none', border:'none', textAlign:'left'}}>About</button>
           <hr style={{borderColor: 'var(--eco-border)', width: '100%'}} />
           <Link to="/login" className="eco-btn-secondary" style={{textAlign:'left'}}>Log in</Link>
           <Link to="/signup" className="eco-btn-primary" style={{justifyContent:'center'}}>Get Started</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

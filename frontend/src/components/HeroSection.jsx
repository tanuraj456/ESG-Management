import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="eco-hero">
      <div className="eco-hero-content animate-fade-up">
        <span className="eco-eyebrow">A clearer view of sustainability</span>
        <h1 className="eco-h1">
          Make sustainability <span className="eco-highlight">measurable.</span>
        </h1>
        <p className="eco-text-large eco-hero-desc">
          Connect environmental impact, employee participation, and corporate governance in one platform built to turn ESG data into meaningful action.
        </p>
        
        <div className="eco-hero-actions">
          <button 
            className="eco-btn-outline" 
            onClick={() => document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore the Platform
          </button>
          <Link to="/signup" className="eco-btn-primary">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

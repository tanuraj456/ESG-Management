import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="eco-cta-section">
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <h2 className="eco-h2">Build a more accountable approach to sustainability.</h2>
        <p className="eco-text-large" style={{marginBottom: '2.5rem'}}>
          Bring your ESG activities into one place and make progress easier to understand.
        </p>
        <Link to="/signup" className="eco-btn-primary" style={{padding: '0.75rem 2rem', fontSize: '1rem'}}>
          Get Started <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;

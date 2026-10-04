import React from 'react';
import { Eye, CheckSquare, HeartHandshake } from 'lucide-react';

const ValueSection = () => {
  return (
    <section className="eco-section">
      <div className="eco-section-header">
        <h2 className="eco-h2">Make every part of ESG more actionable.</h2>
      </div>

      <div className="eco-values">
        <div className="eco-value-item">
          <div className="eco-value-icon">
            <Eye size={32} />
          </div>
          <h3 className="eco-h3">Clarity</h3>
          <p className="eco-text-large">
            Understand environmental, social, and governance activity in a connected view.
          </p>
        </div>
        
        <div className="eco-value-item">
          <div className="eco-value-icon">
            <CheckSquare size={32} />
          </div>
          <h3 className="eco-h3">Accountability</h3>
          <p className="eco-text-large">
            Track responsibilities, approvals, policy acknowledgements, and deadlines.
          </p>
        </div>
        
        <div className="eco-value-item">
          <div className="eco-value-icon">
            <HeartHandshake size={32} />
          </div>
          <h3 className="eco-h3">Engagement</h3>
          <p className="eco-text-large">
            Give employees structured ways to participate in sustainability initiatives.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;

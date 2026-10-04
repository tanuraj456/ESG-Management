import React from 'react';

const WorkflowSection = () => {
  const steps = [
    {
      number: '1',
      title: 'Configure',
      desc: 'Establish emission factors, goals, policies, departments, and ESG settings.'
    },
    {
      number: '2',
      title: 'Record',
      desc: 'Capture carbon transactions, employee activities, participation, and compliance records.'
    },
    {
      number: '3',
      title: 'Review',
      desc: 'Approve submissions, verify evidence, track audits, and resolve compliance issues.'
    },
    {
      number: '4',
      title: 'Measure',
      desc: 'Bring environmental, social, and governance performance into one reporting view.'
    }
  ];

  return (
    <section className="eco-section">
      <div className="eco-section-header">
        <h2 className="eco-h2">From scattered records to a clearer picture.</h2>
      </div>

      <div className="eco-workflow">
        {steps.map((step, index) => (
          <div key={index} className="eco-workflow-step">
            <div className="eco-workflow-number">{step.number}</div>
            <h3 className="eco-workflow-title">{step.title}</h3>
            <p className="eco-workflow-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkflowSection;

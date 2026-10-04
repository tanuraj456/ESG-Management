import React from 'react';
import { Globe, Users, ShieldCheck } from 'lucide-react';

const PillarCards = () => {
  const pillars = [
    {
      id: 'environmental',
      icon: <Globe size={28} />,
      title: '01 — Environmental',
      description: 'Track carbon emissions, manage emission factors, set sustainability goals, and monitor environmental performance.',
      visual: (
        <div style={{display:'flex', alignItems:'flex-end', gap:'8px', height:'60px'}}>
          <div style={{width:'12px', height:'30%', background:'var(--eco-sage)', borderRadius:'2px'}}></div>
          <div style={{width:'12px', height:'50%', background:'var(--eco-sage)', borderRadius:'2px'}}></div>
          <div style={{width:'12px', height:'80%', background:'var(--eco-mint)', borderRadius:'2px'}}></div>
        </div>
      )
    },
    {
      id: 'social',
      icon: <Users size={28} />,
      title: '02 — Social Impact',
      description: 'Coordinate CSR activities, review employee participation, and encourage sustainable habits through challenges and recognition.',
      visual: (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'}}>
          <div style={{width:'30px', height:'30px', borderRadius:'50%', border:'2px solid var(--eco-mint)', background:'var(--eco-forest)'}}></div>
          <div style={{width:'30px', height:'30px', borderRadius:'50%', border:'2px solid var(--eco-mint)', background:'var(--eco-forest)', marginLeft:'-15px'}}></div>
          <div style={{width:'30px', height:'30px', borderRadius:'50%', border:'2px solid var(--eco-mint)', background:'var(--eco-forest)', marginLeft:'-15px'}}></div>
        </div>
      )
    },
    {
      id: 'governance',
      icon: <ShieldCheck size={28} />,
      title: '03 — Governance',
      description: 'Manage ESG policies, track audits, and monitor compliance issues with clear ownership and deadlines.',
      visual: (
        <div style={{display:'flex', flexDirection:'column', gap:'8px', width:'60%'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
             <div style={{width:'12px', height:'12px', borderRadius:'2px', background:'var(--eco-sage)'}}></div>
             <div style={{height:'4px', width:'100%', background:'var(--eco-border)', borderRadius:'2px'}}></div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
             <div style={{width:'12px', height:'12px', borderRadius:'2px', background:'var(--eco-mint)'}}></div>
             <div style={{height:'4px', width:'80%', background:'var(--eco-border)', borderRadius:'2px'}}></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="platform" className="eco-section">
      <div className="eco-section-header">
        <h2 className="eco-h2">One platform. Three pillars of impact.</h2>
        <p className="eco-text-large">
          Bring environmental performance, social initiatives, and governance accountability together in a connected ESG workflow.
        </p>
      </div>

      <div className="eco-cards-grid">
        {pillars.map(pillar => (
          <div id={pillar.id} key={pillar.id} className="eco-card">
            <div className="eco-card-icon">
              {pillar.icon}
            </div>
            <h3 className="eco-card-title">{pillar.title}</h3>
            <p className="eco-card-desc">{pillar.description}</p>
            <div className="eco-card-visual">
              {pillar.visual}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PillarCards;

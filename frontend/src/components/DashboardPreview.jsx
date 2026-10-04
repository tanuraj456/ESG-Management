import React from 'react';

const DashboardPreview = () => {
  return (
    <section className="eco-section">
      <div className="eco-section-header">
        <h2 className="eco-h2">See the bigger picture.</h2>
        <p className="eco-text-large">
          Understand sustainability progress across environmental, social, and governance activities.
        </p>
      </div>

      <div className="eco-preview-wrapper">
        <div className="eco-preview-header">
          <div className="eco-preview-dot" style={{background: '#ff5f56'}}></div>
          <div className="eco-preview-dot" style={{background: '#ffbd2e'}}></div>
          <div className="eco-preview-dot" style={{background: '#27c93f'}}></div>
        </div>
        <div className="eco-preview-inner">
          <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
            <div className="eco-dashboard-card">
              <div className="eco-dashboard-label">Total Carbon Emissions</div>
              <div className="eco-dashboard-metric">1,245.5 tCO2e</div>
              <div className="eco-dashboard-progress">
                <div className="eco-dashboard-progress-bar" style={{width: '65%'}}></div>
              </div>
            </div>
            
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
               <div className="eco-dashboard-card">
                 <div className="eco-dashboard-label">CSR Participation</div>
                 <div className="eco-dashboard-metric">78%</div>
                 <div style={{marginTop:'0.5rem', color:'var(--eco-sage)', fontSize:'0.875rem'}}>+12% this quarter</div>
               </div>
               <div className="eco-dashboard-card">
                 <div className="eco-dashboard-label">Open Compliance Issues</div>
                 <div className="eco-dashboard-metric">3</div>
                 <div style={{marginTop:'0.5rem', color:'var(--eco-text-secondary)', fontSize:'0.875rem'}}>2 resolved this week</div>
               </div>
            </div>
          </div>
          
          <div className="eco-dashboard-card" style={{display:'flex', flexDirection:'column'}}>
            <div className="eco-dashboard-label" style={{marginBottom:'1rem'}}>Emissions Trend</div>
            <div style={{flexGrow:1, display:'flex', alignItems:'flex-end', gap:'0.5rem', height:'150px'}}>
               <div style={{background:'var(--eco-sage)', width:'20%', height:'40%', borderRadius:'4px 4px 0 0'}}></div>
               <div style={{background:'var(--eco-sage)', width:'20%', height:'55%', borderRadius:'4px 4px 0 0'}}></div>
               <div style={{background:'var(--eco-mint)', width:'20%', height:'75%', borderRadius:'4px 4px 0 0'}}></div>
               <div style={{background:'var(--eco-sage)', width:'20%', height:'60%', borderRadius:'4px 4px 0 0'}}></div>
               <div style={{background:'var(--eco-sage)', width:'20%', height:'50%', borderRadius:'4px 4px 0 0'}}></div>
            </div>
          </div>
        </div>
        <div style={{textAlign:'center', marginTop:'1rem', color:'var(--eco-text-secondary)', fontSize:'0.75rem'}}>
          * Illustrative product preview
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;

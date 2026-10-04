import React from 'react';
import heroBgImage from '../assets/hero-bg.jpg';

import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PillarCards from '../components/PillarCards';
import WorkflowSection from '../components/WorkflowSection';
import DashboardPreview from '../components/DashboardPreview';
import ValueSection from '../components/ValueSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="global-bg" style={{ backgroundImage: `url(${heroBgImage})` }}></div>
      <div className="global-overlay"></div>
      
      <Navbar />
      <main className="content-layer">
        <HeroSection />
        <PillarCards />
        <WorkflowSection />
        <DashboardPreview />
        <ValueSection />
        <FinalCTA />
      </main>
      <div className="content-layer">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;

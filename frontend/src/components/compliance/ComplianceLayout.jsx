import React, { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import ComplianceSidebar from './ComplianceSidebar';
import ComplianceHeader from './ComplianceHeader';

export const ThemeContext = createContext();

const ComplianceLayout = () => {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className="min-h-screen font-sans" data-sa-theme={isDark ? "dark" : "light"}>
        <div className="bg-[var(--sa-bg)] text-[var(--sa-text)] min-h-screen transition-colors duration-300">
          <ComplianceSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
          <ComplianceHeader isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
          <main className={`${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-16 p-8 transition-all duration-300`}>
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default ComplianceLayout;

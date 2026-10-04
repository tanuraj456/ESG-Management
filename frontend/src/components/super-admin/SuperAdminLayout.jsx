import React, { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminHeader from './SuperAdminHeader';

export const ThemeContext = createContext();

const SuperAdminLayout = () => {
  const [isDark, setIsDark] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className="min-h-screen font-sans" data-sa-theme={isDark ? "dark" : "light"}>
        <div className="bg-[var(--sa-bg)] text-[var(--sa-text)] min-h-screen transition-colors duration-300">
          <SuperAdminSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
          <SuperAdminHeader isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
          <main className={`${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-16 p-8 transition-all duration-300`}>
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default SuperAdminLayout;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileSearch, AlertCircle, CheckSquare, FileBarChart, Settings, Leaf, Menu } from 'lucide-react';

const ComplianceSidebar = ({ isCollapsed, toggleSidebar }) => {
  const navItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/compliance', end: true },
    { name: 'Audits', icon: FileSearch, path: '/compliance/audits' },
    { name: 'Compliance Issues', icon: AlertCircle, path: '/compliance/issues' },
    { name: 'Policy Acknowledgements', icon: CheckSquare, path: '/compliance/policies' },
    { name: 'Governance Reports', icon: FileBarChart, path: '/compliance/reports' },
    { name: 'My Settings', icon: Settings, path: '/compliance/settings' },
  ];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[var(--sa-surface)] border-r border-[var(--sa-border)] fixed top-16 left-0 h-[calc(100vh-4rem)] flex flex-col z-20 transition-all duration-300`}>
      {!isCollapsed ? (
        <div className="px-6 py-4 transition-opacity duration-300">
          <span className="text-xs font-semibold text-[var(--sa-text-muted)] uppercase tracking-wider whitespace-nowrap">Compliance Officer</span>
        </div>
      ) : (
        <div className="py-4"></div>
      )}

      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            title={isCollapsed ? item.name : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--sa-accent)] ${
                isActive
                  ? 'bg-[var(--sa-surface-2)] text-[var(--sa-success)]'
                  : 'text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface-2)] hover:text-[var(--sa-text)]'
              }`
            }
          >
            <item.icon size={18} className="shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default ComplianceSidebar;

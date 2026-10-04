import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, LayoutDashboard, Building2, Users, BarChart3, ShieldCheck, Settings, LifeBuoy, LogOut } from 'lucide-react';

const navItems = [
  { name: 'Overview', path: '/super-admin', icon: LayoutDashboard },
  { name: 'Companies', path: '/super-admin/companies', icon: Building2 },
  { name: 'User Directory', path: '/super-admin/users', icon: Users },
  { name: 'Platform Analytics', path: '/super-admin/analytics', icon: BarChart3 },
  { name: 'Security & Audit Logs', path: '/super-admin/audit-logs', icon: ShieldCheck },
  { name: 'Platform Settings', path: '/super-admin/settings', icon: Settings },
];

const SuperAdminSidebar = ({ isCollapsed }) => {
  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[var(--sa-surface)] border-r border-[var(--sa-border)] h-[calc(100vh-4rem)] fixed left-0 top-16 flex flex-col z-20 transition-all duration-300`}>
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-3">
        {!isCollapsed ? (
          <div className="px-3 mb-2 transition-opacity duration-300">
            <p className="text-[10px] font-semibold tracking-wider text-[var(--sa-text-muted)] uppercase whitespace-nowrap">Admin Workspace</p>
          </div>
        ) : (
          <div className="mb-2 h-4"></div>
        )}
        
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/super-admin'}
            title={isCollapsed ? item.name : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--sa-nav-bg)] text-[var(--sa-nav-text)]'
                  : 'text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface-2)] hover:text-[var(--sa-text)]'
              }`
            }
          >
            <item.icon size={18} className="shrink-0" />
            {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
          </NavLink>
        ))}

        {!isCollapsed ? (
          <div className="mt-6 px-3 mb-2 transition-opacity duration-300">
            <p className="text-[10px] font-semibold tracking-wider text-[var(--sa-text-muted)] uppercase whitespace-nowrap">Support</p>
          </div>
        ) : (
          <div className="mt-6 mb-2 h-4"></div>
        )}
        <NavLink
          to="/super-admin/support"
          title={isCollapsed ? 'Support' : undefined}
          className={({ isActive }) =>
            `flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[var(--sa-nav-bg)] text-[var(--sa-nav-text)]'
                : 'text-[var(--sa-text-sec)] hover:bg-[var(--sa-surface-2)] hover:text-[var(--sa-text)]'
            }`
          }
        >
          <LifeBuoy size={18} className="shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Support</span>}
        </NavLink>
      </div>
    </div>
  );
};

export default SuperAdminSidebar;

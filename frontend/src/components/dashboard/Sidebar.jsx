
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  Leaf,
  Heart,
  ShieldCheck,
  FileText,
  Settings,
  ClipboardList,
  Target,
  Trophy,
  LogOut,
  X,
  CircleHelp,
  ChartNoAxesCombined,
} from "lucide-react";

const menuConfig = {
  admin: {
    title: "Admin Workspace",
    items: [
      {
        label: "Overview",
        path: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "ESG Performance",
        path: "/admin/esg",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Environmental",
        path: "/admin/environmental",
        icon: Leaf,
      },
      {
        label: "Social Impact",
        path: "/admin/social",
        icon: Heart,
      },
      {
        label: "Governance",
        path: "/admin/governance",
        icon: ShieldCheck,
      },
      {
        label: "Departments",
        path: "/admin/departments",
        icon: Building2,
      },
      {
        label: "Gamification",
        path: "/admin/gamification",
        icon: Trophy,
      },
      {
        label: "Employees",
        path: "/admin/employees",
        icon: Users,
      },
      {
        label: "Reports",
        path: "/admin/reports",
        icon: FileText,
      },
      {
        label: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
    ],
  },

  manager: {
    title: "Manager Workspace",
    items: [
      {
        label: "Overview",
        path: "/manager",
        icon: LayoutDashboard,
      },
      {
        label: "My Department",
        path: "/manager/department",
        icon: Building2,
      },
      {
        label: "ESG Initiatives",
        path: "/manager/initiatives",
        icon: Leaf,
      },
      {
        label: "Team Members",
        path: "/manager/team",
        icon: Users,
      },
      {
        label: "Tasks",
        path: "/manager/tasks",
        icon: ClipboardList,
      },
      {
        label: "Targets",
        path: "/manager/targets",
        icon: Target,
      },
      {
        label: "Reports",
        path: "/manager/reports",
        icon: FileText,
      },
      {
        label: "Settings",
        path: "/manager/settings",
        icon: Settings,
      },
    ],
  },

  employee: {
    title: "Employee Workspace",
    items: [
      {
        label: "My Dashboard",
        path: "/employee",
        icon: LayoutDashboard,
      },
      {
        label: "My Activities",
        path: "/employee/activities",
        icon: Leaf,
      },
      {
        label: "My Tasks",
        path: "/employee/tasks",
        icon: ClipboardList,
      },
      {
        label: "My Impact",
        path: "/employee/impact",
        icon: ChartNoAxesCombined,
      },
      {
        label: "Achievements",
        path: "/employee/achievements",
        icon: Trophy,
      },
      {
        label: "Resources",
        path: "/employee/resources",
        icon: CircleHelp,
      },
      {
        label: "Settings",
        path: "/employee/settings",
        icon: Settings,
      },
    ],
  },
};

const Sidebar = ({ role = "admin", isOpen, onClose }) => {
  const config = menuConfig[role] || menuConfig.admin;

  const roleLabels = {
    admin: "Company Admin",
    manager: "Department Manager",
    employee: "Employee",
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="brand-icon">
              <Leaf size={22} />
            </div>

            <div className="brand-text">
              <h2>EcoSphere</h2>
              <span>ESG Management</span>
            </div>
          </div>

          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">
          <span>{config.title}</span>
        </div>

        <nav className="sidebar-nav">
          {config.items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === `/${role}`}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
                onClick={onClose}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-impact-card">
            <div className="impact-icon">
              <Leaf size={18} />
            </div>

            <h4>Make an Impact</h4>
            <p>
              Every small action contributes to a more sustainable future.
            </p>
          </div>

          <div className="sidebar-user">
            <div className="user-avatar">N</div>

            <div className="user-info">
              <strong>Nandani Sankhla</strong>
              <span>{roleLabels[role] || "Company Admin"}</span>
            </div>

            <button
              className="logout-button"
              title="Logout"
              aria-label="Logout"
              onClick={() => alert("Logout functionality coming soon")}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

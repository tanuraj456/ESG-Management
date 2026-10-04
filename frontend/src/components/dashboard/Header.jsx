
import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const Header = ({ role = "admin", onMenuClick }) => {
  // Light mode is the default theme
  const [theme, setTheme] = useState(
    () => localStorage.getItem("ecospher-theme") || "light"
  );

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const roleLabels = {
    admin: "Company Admin",
    manager: "Department Manager",
    employee: "Employee",
  };

  // Apply theme to the entire application
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ecospher-theme", theme);
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return (
    <header className="dashboard-header">
      {/* Left Section */}
      <div className="header-left">
        <button
          className="icon-button mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={21} />
        </button>

        <div className="header-breadcrumb">
          <span className="breadcrumb-home">Workspace</span>
          <span className="breadcrumb-separator">/</span>
          <strong>{roleLabels[role] || "Company Admin"}</strong>
        </div>
      </div>

      {/* Right Section */}
      <div className="header-right">
        {/* Search */}
        <div className="header-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search anything..."
            aria-label="Search"
          />

          <span className="search-shortcut">⌘ K</span>
        </div>

        {/* Theme Toggle */}
        <button
          className="icon-button theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* Notifications */}
        <div className="header-dropdown-wrapper">
          <button
            className="icon-button notification-button"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={20} />
            <span className="notification-dot" />
          </button>

          {showNotifications && (
            <div className="header-dropdown notification-dropdown">
              <div className="dropdown-heading">
                <h3>Notifications</h3>
                <span className="unread-label">2 new</span>
              </div>

              <div className="notification-item">
                <div className="notification-icon">
                  <Bell size={16} />
                </div>

                <div>
                  <strong>ESG Report Updated</strong>
                  <p>
                    Your monthly ESG report is ready to review.
                  </p>
                  <span>10 minutes ago</span>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon">
                  <User size={16} />
                </div>

                <div>
                  <strong>New Team Activity</strong>
                  <p>
                    Your team completed a sustainability task.
                  </p>
                  <span>1 hour ago</span>
                </div>
              </div>

              <button
                className="dropdown-footer"
                onClick={() => setShowNotifications(false)}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="header-dropdown-wrapper">
          <button
            className="header-profile"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            aria-expanded={showProfile}
          >
            <div className="profile-avatar">N</div>

            <div className="profile-details">
              <strong>Nandani Sankhla</strong>
              <span>{roleLabels[role] || "Company Admin"}</span>
            </div>

            <ChevronDown size={16} />
          </button>

          {showProfile && (
            <div className="header-dropdown profile-dropdown">
              <button
                className="profile-menu-item"
                onClick={() => setShowProfile(false)}
              >
                <User size={17} />
                My Profile
              </button>

              <button
                className="profile-menu-item"
                onClick={() => setShowProfile(false)}
              >
                <Settings size={17} />
                Account Settings
              </button>

              <div className="dropdown-divider" />

              <button
                className="profile-menu-item logout-item"
                onClick={() => alert("Logout functionality coming soon")}
              >
                <LogOut size={17} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;


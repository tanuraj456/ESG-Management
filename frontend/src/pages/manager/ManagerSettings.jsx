
import { useState } from "react";
import {
  User,
  Building2,
  Bell,
  ShieldCheck,
  Palette,
  Save,
  Camera,
  Lock,
  Mail,
  Phone,
  Briefcase,
  CheckCircle2,
  Moon,
  Sun,
  RotateCcw,
} from "lucide-react";

const initialSettings = {
  name: "Nandani Sankhla",
  email: "nandani@ecosphere.com",
  phone: "+91 98765 43210",
  department: "Human Resources",
  designation: "Department Manager",
  employeeId: "EMP-2026-014",
  emailNotifications: true,
  taskReminders: true,
  weeklyReports: false,
  csrUpdates: true,
  approvalAlerts: true,
  profileVisibility: true,
  twoFactor: false,
  theme: "dark",
};

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "department", label: "Department", icon: Building2 },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: ShieldCheck },
];

export default function ManagerSettings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      [key]: value,
    }));
    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    // Demo-only persistence for this browser session.
    sessionStorage.setItem(
      "ecospher-manager-settings",
      JSON.stringify(settings)
    );

    setSaved(true);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setSaved(false);
  };

  const renderToggle = (key, title, description) => (
    <div className="ms-toggle-row" key={key}>
      <div className="ms-toggle-copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={settings[key]}
        className={`ms-switch ${settings[key] ? "active" : ""}`}
        onClick={() => updateSetting(key, !settings[key])}
      >
        <span />
      </button>
    </div>
  );

  return (
    <div className="dashboard-page ms-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MANAGER WORKSPACE / SETTINGS</p>
          <h1>Settings</h1>
          <p className="page-description">
            Manage your profile, preferences, notifications, and account
            security.
          </p>
        </div>
      </div>

      <div className="ms-layout">
        <aside className="ms-navigation">
          <div className="ms-nav-heading">PREFERENCES</div>

          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <button
                key={section.id}
                className={`ms-nav-item ${
                  activeSection === section.id ? "active" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon size={18} />
                <span>{section.label}</span>
              </button>
            );
          })}
        </aside>

        <form className="ms-content" onSubmit={handleSave}>
          {activeSection === "profile" && (
            <section className="ms-panel">
              <div className="ms-panel-heading">
                <div>
                  <h2>Personal Information</h2>
                  <p>Update your account details and contact information.</p>
                </div>
                <User size={21} />
              </div>

              <div className="ms-profile-banner">
                <div className="ms-profile-avatar">N</div>
                <div>
                  <h3>{settings.name}</h3>
                  <p>{settings.designation}</p>
                  <span>Manager Account</span>
                </div>
                <button
                  type="button"
                  className="ms-outline-btn"
                  onClick={() =>
                    alert("Profile photo upload coming soon!")
                  }
                >
                  <Camera size={15} />
                  Change Photo
                </button>
              </div>

              <div className="ms-form-grid">
                <label>
                  Full Name
                  <div className="ms-input-wrap">
                    <User size={16} />
                    <input
                      value={settings.name}
                      onChange={(event) =>
                        updateSetting("name", event.target.value)
                      }
                      required
                    />
                  </div>
                </label>

                <label>
                  Email Address
                  <div className="ms-input-wrap">
                    <Mail size={16} />
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(event) =>
                        updateSetting("email", event.target.value)
                      }
                      required
                    />
                  </div>
                </label>

                <label>
                  Phone Number
                  <div className="ms-input-wrap">
                    <Phone size={16} />
                    <input
                      value={settings.phone}
                      onChange={(event) =>
                        updateSetting("phone", event.target.value)
                      }
                    />
                  </div>
                </label>

                <label>
                  Designation
                  <div className="ms-input-wrap">
                    <Briefcase size={16} />
                    <input
                      value={settings.designation}
                      onChange={(event) =>
                        updateSetting("designation", event.target.value)
                      }
                    />
                  </div>
                </label>
              </div>
            </section>
          )}

          {activeSection === "department" && (
            <section className="ms-panel">
              <div className="ms-panel-heading">
                <div>
                  <h2>Department Information</h2>
                  <p>View your department assignment and role details.</p>
                </div>
                <Building2 size={21} />
              </div>

              <div className="ms-form-grid">
                <label>
                  Department Name
                  <div className="ms-input-wrap">
                    <Building2 size={16} />
                    <input
                      value={settings.department}
                      onChange={(event) =>
                        updateSetting("department", event.target.value)
                      }
                    />
                  </div>
                </label>

                <label>
                  Employee ID
                  <div className="ms-input-wrap">
                    <User size={16} />
                    <input value={settings.employeeId} disabled />
                  </div>
                </label>

                <label>
                  Assigned Role
                  <div className="ms-input-wrap">
                    <Briefcase size={16} />
                    <input value="Department Manager" disabled />
                  </div>
                </label>

                <label>
                  Workspace
                  <div className="ms-input-wrap">
                    <Building2 size={16} />
                    <input value="EcoSphere Manager Workspace" disabled />
                  </div>
                </label>
              </div>

              <div className="ms-info-note">
                <CheckCircle2 size={18} />
                <p>
                  Your department assignment is managed by the company
                  administrator. Changes made here are for demonstration
                  purposes only.
                </p>
              </div>
            </section>
          )}

          {activeSection === "notifications" && (
            <section className="ms-panel">
              <div className="ms-panel-heading">
                <div>
                  <h2>Notification Preferences</h2>
                  <p>Choose which updates you want to receive.</p>
                </div>
                <Bell size={21} />
              </div>

              <div className="ms-toggle-list">
                {renderToggle(
                  "emailNotifications",
                  "Email Notifications",
                  "Receive important updates and announcements through email."
                )}

                {renderToggle(
                  "taskReminders",
                  "Task Reminders",
                  "Get reminders for pending and overdue department tasks."
                )}

                {renderToggle(
                  "weeklyReports",
                  "Weekly ESG Reports",
                  "Receive a weekly summary of your department's ESG performance."
                )}

                {renderToggle(
                  "csrUpdates",
                  "CSR Activity Updates",
                  "Stay informed about upcoming community initiatives."
                )}

                {renderToggle(
                  "approvalAlerts",
                  "Approval Alerts",
                  "Get notified when requests require your review."
                )}
              </div>
            </section>
          )}

          {activeSection === "appearance" && (
            <section className="ms-panel">
              <div className="ms-panel-heading">
                <div>
                  <h2>Appearance</h2>
                  <p>Choose how EcoSphere looks on your device.</p>
                </div>
                <Palette size={21} />
              </div>

              <div className="ms-theme-options">
                <button
                  type="button"
                  className={`ms-theme-card ${
                    settings.theme === "dark" ? "selected" : ""
                  }`}
                  onClick={() => updateSetting("theme", "dark")}
                >
                  <div className="ms-theme-preview dark-preview">
                    <div />
                    <div />
                    <div />
                  </div>
                  <div className="ms-theme-label">
                    <Moon size={17} />
                    <strong>Dark Mode</strong>
                  </div>
                  <p>Deep green surfaces with soft contrast.</p>
                  {settings.theme === "dark" && (
                    <CheckCircle2 className="ms-theme-check" size={18} />
                  )}
                </button>

                <button
                  type="button"
                  className={`ms-theme-card ${
                    settings.theme === "light" ? "selected" : ""
                  }`}
                  onClick={() => updateSetting("theme", "light")}
                >
                  <div className="ms-theme-preview light-preview">
                    <div />
                    <div />
                    <div />
                  </div>
                  <div className="ms-theme-label">
                    <Sun size={17} />
                    <strong>Light Mode</strong>
                  </div>
                  <p>Bright surfaces with clean, readable layouts.</p>
                  {settings.theme === "light" && (
                    <CheckCircle2 className="ms-theme-check" size={18} />
                  )}
                </button>
              </div>

              <div className="ms-info-note">
                <Palette size={18} />
                <p>
                  This selection is saved as a preference. Applying it
                  across the entire application will require connecting
                  it to the global theme provider.
                </p>
              </div>
            </section>
          )}

          {activeSection === "security" && (
            <section className="ms-panel">
              <div className="ms-panel-heading">
                <div>
                  <h2>Account Security</h2>
                  <p>Manage your account protection preferences.</p>
                </div>
                <ShieldCheck size={21} />
              </div>

              <div className="ms-security-card">
                <div className="ms-security-icon">
                  <Lock size={20} />
                </div>
                <div className="ms-security-copy">
                  <strong>Password</strong>
                  <p>
                    Keep your account secure by updating your password
                    regularly.
                  </p>
                </div>
                <button
                  type="button"
                  className="ms-outline-btn"
                  onClick={() =>
                    alert("Password change functionality coming soon!")
                  }
                >
                  Change Password
                </button>
              </div>

              <div className="ms-toggle-list">
                {renderToggle(
                  "twoFactor",
                  "Two-Factor Authentication",
                  "Add an extra layer of security to your account."
                )}

                {renderToggle(
                  "profileVisibility",
                  "Profile Visibility",
                  "Allow other members of your organisation to view your profile."
                )}
              </div>

              <div className="ms-info-note">
                <ShieldCheck size={18} />
                <p>
                  Security controls are currently demo settings. Real
                  authentication and password updates require backend
                  integration.
                </p>
              </div>
            </section>
          )}

          <div className="ms-save-bar">
            <button
              type="button"
              className="ms-reset-btn"
              onClick={handleReset}
            >
              <RotateCcw size={15} />
              Reset
            </button>

            <div className="ms-save-actions">
              {saved && (
                <span className="ms-saved-message">
                  <CheckCircle2 size={16} />
                  Saved successfully
                </span>
              )}

              <button type="submit" className="ms-save-btn">
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .ms-page {
          display: flex;
          flex-direction: column;
          gap: 22px;
          color: var(--text-primary);
        }

        .ms-page .page-description {
          margin-top: 7px;
          color: var(--text-secondary);
        }

        .ms-layout {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          align-items: start;
          gap: 18px;
        }

        .ms-navigation,
        .ms-content {
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface);
        }

        .ms-navigation {
          position: sticky;
          top: 20px;
          padding: 12px;
        }

        .ms-nav-heading {
          padding: 10px 11px;
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .ms-nav-item {
          display: flex;
          align-items: center;
          gap: 11px;
          width: 100%;
          padding: 12px;
          margin-bottom: 4px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          color: var(--text-secondary);
          text-align: left;
          font-size: 12px;
          cursor: pointer;
          transition: 0.2s;
        }

        .ms-nav-item:hover {
          background: var(--surface-secondary);
          color: var(--text-primary);
        }

        .ms-nav-item.active {
          background: rgba(142,182,155,0.15);
          color: var(--primary);
          font-weight: 700;
        }

        .ms-content {
          min-width: 0;
          padding: 23px;
        }

        .ms-panel-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          color: var(--primary);
        }

        .ms-panel-heading h2 {
          margin: 0;
          color: var(--text-primary);
          font-size: 18px;
        }

        .ms-panel-heading p {
          margin: 7px 0 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .ms-profile-banner {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 17px;
          margin-bottom: 24px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--surface-secondary);
        }

        .ms-profile-avatar {
          display: grid;
          place-items: center;
          width: 62px;
          height: 62px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          font-size: 24px;
          font-weight: 700;
        }

        .ms-profile-banner h3 {
          margin: 0;
          font-size: 15px;
        }

        .ms-profile-banner p {
          margin: 5px 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .ms-profile-banner span {
          color: var(--primary);
          font-size: 10px;
          font-weight: 600;
        }

        .ms-outline-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 12px;
          margin-left: auto;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-primary);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .ms-outline-btn:hover {
          border-color: var(--primary);
        }

        .ms-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 19px;
        }

        .ms-form-grid label {
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
        }

        .ms-input-wrap {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 11px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-muted);
        }

        .ms-input-wrap:focus-within {
          border-color: var(--primary);
        }

        .ms-input-wrap input {
          width: 100%;
          min-width: 0;
          padding: 11px 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font: inherit;
          font-size: 12px;
        }

        .ms-input-wrap input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .ms-toggle-list {
          display: flex;
          flex-direction: column;
        }

        .ms-toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 17px 0;
          border-bottom: 1px solid var(--border);
        }

        .ms-toggle-row:last-child {
          border-bottom: 0;
        }

        .ms-toggle-copy strong {
          color: var(--text-primary);
          font-size: 13px;
        }

        .ms-toggle-copy p {
          margin: 5px 0 0;
          color: var(--text-secondary);
          font-size: 11px;
          line-height: 1.5;
        }

        .ms-switch {
          position: relative;
          width: 42px;
          height: 23px;
          flex-shrink: 0;
          padding: 0;
          border: 0;
          border-radius: 20px;
          background: var(--border);
          cursor: pointer;
          transition: background 0.2s;
        }

        .ms-switch.active {
          background: var(--primary);
        }

        .ms-switch span {
          position: absolute;
          top: 3px;
          left: 3px;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: white;
          transition: transform 0.2s;
        }

        .ms-switch.active span {
          transform: translateX(19px);
        }

        .ms-theme-options {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .ms-theme-card {
          position: relative;
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: 12px;
          background: var(--surface);
          color: var(--text-primary);
          text-align: left;
          cursor: pointer;
        }

        .ms-theme-card.selected {
          border: 2px solid var(--primary);
          padding: 11px;
        }

        .ms-theme-preview {
          display: flex;
          flex-direction: column;
          gap: 6px;
          height: 110px;
          padding: 12px;
          border-radius: 8px;
        }

        .dark-preview {
          background: #051F20;
        }

        .dark-preview div {
          height: 15px;
          border-radius: 4px;
          background: #235347;
        }

        .dark-preview div:nth-child(2) {
          width: 70%;
          background: #163832;
        }

        .light-preview {
          background: #F1F5F2;
        }

        .light-preview div {
          height: 15px;
          border-radius: 4px;
          background: #B9D8C2;
        }

        .light-preview div:nth-child(2) {
          width: 70%;
          background: #DAF1DE;
        }

        .ms-theme-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 13px;
          font-size: 12px;
        }

        .ms-theme-label svg {
          color: var(--primary);
        }

        .ms-theme-card > p {
          margin: 7px 0 3px;
          color: var(--text-secondary);
          font-size: 11px;
        }

        .ms-theme-check {
          position: absolute;
          top: 13px;
          right: 13px;
          color: var(--primary);
        }

        .ms-info-note {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 13px;
          margin-top: 20px;
          border: 1px solid rgba(142,182,155,0.25);
          border-radius: 9px;
          background: rgba(142,182,155,0.08);
          color: var(--primary);
        }

        .ms-info-note svg {
          flex-shrink: 0;
        }

        .ms-info-note p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 11px;
          line-height: 1.6;
        }

        .ms-security-card {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
        }

        .ms-security-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 10px;
          background: rgba(142,182,155,0.13);
          color: var(--primary);
        }

        .ms-security-copy strong {
          font-size: 13px;
        }

        .ms-security-copy p {
          margin: 5px 0 0;
          color: var(--text-secondary);
          font-size: 11px;
          line-height: 1.5;
        }

        .ms-save-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 20px;
          margin-top: 22px;
          border-top: 1px solid var(--border);
        }

        .ms-reset-btn,
        .ms-save-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 15px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .ms-reset-btn {
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-secondary);
        }

        .ms-save-btn {
          border: 1px solid var(--primary);
          background: var(--primary);
          color: white;
        }

        .ms-save-actions {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .ms-saved-message {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
          font-size: 11px;
        }

        @media (max-width: 850px) {
          .ms-layout {
            grid-template-columns: 1fr;
          }

          .ms-navigation {
            position: static;
            display: flex;
            gap: 5px;
            overflow-x: auto;
          }

          .ms-nav-heading {
            display: none;
          }

          .ms-nav-item {
            width: auto;
            flex-shrink: 0;
          }
        }

        @media (max-width: 560px) {
          .ms-content {
            padding: 16px;
          }

          .ms-form-grid,
          .ms-theme-options {
            grid-template-columns: 1fr;
          }

          .ms-profile-banner {
            flex-wrap: wrap;
          }

          .ms-profile-banner .ms-outline-btn {
            margin-left: 0;
          }

          .ms-security-card {
            flex-wrap: wrap;
          }

          .ms-security-card .ms-outline-btn {
            margin-left: 0;
          }

          .ms-save-bar {
            align-items: stretch;
            flex-direction: column;
          }

          .ms-save-actions {
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}

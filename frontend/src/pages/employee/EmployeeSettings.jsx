
import React, { useState } from "react";

const EmployeeSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Nandani Sankhla",
    email: "nandani@example.com",
    phone: "",
    department: "Engineering",
    role: "Employee",
    location: "India",
    bio: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    taskUpdates: true,
    activityUpdates: true,
    announcements: false,
    weeklyDigest: true,
  });

  const [preferences, setPreferences] = useState({
    theme: "Dark",
    language: "English",
    compactMode: false,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [message, setMessage] = useState("");

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setMessage("Your settings have been saved successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirm) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    if (passwords.newPassword.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    setMessage("Password updated successfully (demo only).");

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <div className="dashboard-page employee-settings-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">ACCOUNT MANAGEMENT</span>
          <h1>Settings</h1>
          <p>Manage your profile, preferences, and account security.</p>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <div className="settings-user-card">
            <div className="settings-avatar">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
          </div>

          <nav className="settings-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={
                  activeTab === tab.id ? "active" : ""
                }
                onClick={() => {
                  setActiveTab(tab.id);
                  setMessage("");
                }}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="settings-content">
          {message && (
            <div
              className={`settings-message ${
                message.includes("successfully")
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </div>
          )}

          {activeTab === "profile" && (
            <section className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Personal Information</h2>
                  <p>Update your personal and work details.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="settings-field">
                  <label>Full Name</label>
                  <input
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-field">
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="settings-field">
                  <label>Department</label>
                  <input
                    value={profile.department}
                    disabled
                  />
                </div>

                <div className="settings-field">
                  <label>Role</label>
                  <input value={profile.role} disabled />
                </div>

                <div className="settings-field">
                  <label>Location</label>
                  <input
                    name="location"
                    value={profile.location}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="settings-field full-width">
                  <label>About Me</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    placeholder="Tell us a little about yourself..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="settings-footer">
                <button
                  className="primary-button"
                  onClick={handleSave}
                >
                  {saved ? "Changes Saved ✓" : "Save Changes"}
                </button>
              </div>
            </section>
          )}

          {activeTab === "notifications" && (
            <section className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Notification Settings</h2>
                  <p>Choose what updates you want to receive.</p>
                </div>
              </div>

              <div className="settings-option-list">
                {[
                  {
                    key: "email",
                    title: "Email Notifications",
                    description:
                      "Receive important updates through email.",
                  },
                  {
                    key: "taskUpdates",
                    title: "Task Updates",
                    description:
                      "Get notified about assigned and updated tasks.",
                  },
                  {
                    key: "activityUpdates",
                    title: "Activity Updates",
                    description:
                      "Stay informed about ESG activities and events.",
                  },
                  {
                    key: "announcements",
                    title: "Company Announcements",
                    description:
                      "Receive important organizational announcements.",
                  },
                  {
                    key: "weeklyDigest",
                    title: "Weekly ESG Digest",
                    description:
                      "Get a weekly summary of your sustainability impact.",
                  },
                ].map((item) => (
                  <div className="settings-option" key={item.key}>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>

                    <label className="settings-switch">
                      <input
                        type="checkbox"
                        checked={notifications[item.key]}
                        onChange={(e) =>
                          setNotifications({
                            ...notifications,
                            [item.key]: e.target.checked,
                          })
                        }
                      />
                      <span />
                    </label>
                  </div>
                ))}
              </div>

              <div className="settings-footer">
                <button
                  className="primary-button"
                  onClick={handleSave}
                >
                  Save Preferences
                </button>
              </div>
            </section>
          )}

          {activeTab === "preferences" && (
            <section className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Application Preferences</h2>
                  <p>Personalize your EcoSphere experience.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="settings-field">
                  <label>Appearance</label>
                  <select
                    value={preferences.theme}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        theme: e.target.value,
                      })
                    }
                  >
                    <option>Dark</option>
                    <option>Light</option>
                    <option>System Default</option>
                  </select>
                </div>

                <div className="settings-field">
                  <label>Language</label>
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        language: e.target.value,
                      })
                    }
                  >
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </div>

              <div className="settings-option">
                <div>
                  <h4>Compact Mode</h4>
                  <p>
                    Reduce spacing to display more information on
                    the screen.
                  </p>
                </div>

                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={preferences.compactMode}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        compactMode: e.target.checked,
                      })
                    }
                  />
                  <span />
                </label>
              </div>

              <div className="settings-footer">
                <button
                  className="primary-button"
                  onClick={handleSave}
                >
                  Save Preferences
                </button>
              </div>
            </section>
          )}

          {activeTab === "security" && (
            <section className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Security Settings</h2>
                  <p>Keep your account safe and secure.</p>
                </div>
              </div>

              <form
                onSubmit={handlePasswordChange}
                className="settings-password-form"
              >
                <div className="settings-field">
                  <label>Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        current: e.target.value,
                      })
                    }
                    placeholder="Enter current password"
                  />
                </div>

                <div className="settings-field">
                  <label>New Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={passwords.newPassword}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="Enter new password"
                  />
                </div>

                <div className="settings-field">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirm: e.target.value,
                      })
                    }
                    placeholder="Confirm new password"
                  />
                </div>

                <div className="settings-footer">
                  <button
                    type="submit"
                    className="primary-button"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              <div className="settings-security-note">
                <strong>Security tip</strong>
                <p>
                  Use a unique password with at least 8 characters.
                  Never share your password with anyone.
                </p>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeeSettings;

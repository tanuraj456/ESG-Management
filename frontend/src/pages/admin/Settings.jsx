
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Building2,
  Tags,
  SlidersHorizontal,
  Bell,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Check,
  ChevronRight,
  Save,
} from "lucide-react";

const initialDepartments = [
  { id: 1, name: "Human Resources", code: "HR", employees: 24, status: "Active" },
  { id: 2, name: "Engineering", code: "ENG", employees: 48, status: "Active" },
  { id: 3, name: "Finance", code: "FIN", employees: 16, status: "Active" },
  { id: 4, name: "Operations", code: "OPS", employees: 32, status: "Active" },
  { id: 5, name: "Marketing", code: "MKT", employees: 18, status: "Active" },
];

const initialCategories = [
  { id: 1, name: "Environmental", code: "ENV", description: "Environmental impact and resource management", status: "Active" },
  { id: 2, name: "Social", code: "SOC", description: "Employee welfare and social responsibility", status: "Active" },
  { id: 3, name: "Governance", code: "GOV", description: "Ethics, compliance and corporate governance", status: "Active" },
];

const tabs = [
  { id: "departments", label: "Departments", icon: Building2 },
  { id: "categories", label: "Categories", icon: Tags },
  { id: "esg", label: "ESG Configuration", icon: SlidersHorizontal },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("departments");
  const [departments, setDepartments] = useState(initialDepartments);
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [saved, setSaved] = useState(false);

  const [esgConfig, setEsgConfig] = useState({
    environmentalWeight: 40,
    socialWeight: 30,
    governanceWeight: 30,
    targetScore: 80,
    reportingFrequency: "Monthly",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    compliance: true,
    deadline: true,
    weekly: false,
    monthly: true,
  });

  const updateEsg = (key, value) => {
    setEsgConfig((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const updateNotification = (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const openAdd = (type) => {
    setForm({});
    setModal({ type, mode: "add" });
  };

  const openEdit = (type, item) => {
    setForm({ ...item });
    setModal({ type, mode: "edit", id: item.id });
  };

  const closeModal = () => {
    setModal(null);
    setForm({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isDepartment = modal.type === "department";
    const setter = isDepartment ? setDepartments : setCategories;

    const newItem = {
      ...form,
      id: modal.mode === "edit" ? modal.id : Date.now(),
      status: form.status || "Active",
    };

    setter((prev) =>
      modal.mode === "edit"
        ? prev.map((item) => (item.id === modal.id ? newItem : item))
        : [...prev, newItem]
    );

    closeModal();
  };

  const handleDelete = (type, id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmed) return;

    if (type === "department") {
      setDepartments((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCategories((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSave = () => {
    localStorage.setItem(
      "ecospher-admin-settings",
      JSON.stringify({ departments, categories, esgConfig, notifications })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const filteredDepartments = departments.filter((item) =>
    `${item.name} ${item.code}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredCategories = categories.filter((item) =>
    `${item.name} ${item.code}`.toLowerCase().includes(search.toLowerCase())
  );

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      className={`settings-toggle ${checked ? "active" : ""}`}
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
    >
      <span />
    </button>
  );

  const NotificationRow = ({ title, description, setting }) => (
    <div className="settings-admin-option">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <Toggle
        checked={notifications[setting]}
        onChange={(value) => updateNotification(setting, value)}
      />
    </div>
  );

  return (
    <div className="settings-admin-page">
      <div className="settings-admin-header">
        <div>
          <div className="settings-admin-title">
            <SettingsIcon size={24} />
            <h1>Settings &amp; Administration</h1>
          </div>
          <p>
            Manage departments, ESG categories, business configurations and
            notification preferences.
          </p>
        </div>

        <button className="settings-admin-save" onClick={handleSave}>
          {saved ? <Check size={17} /> : <Save size={17} />}
          {saved ? "Saved" : "Save Changes"}
        </button>
      </div>

      <div className="settings-admin-layout">
        <aside className="settings-admin-sidebar">
          <div className="settings-admin-sidebar-label">
            ADMINISTRATION
          </div>

          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                className={`settings-admin-nav ${
                  activeTab === tab.id ? "active" : ""
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearch("");
                }}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <ChevronRight size={15} className="settings-nav-arrow" />
              </button>
            );
          })}
        </aside>

        <main className="settings-admin-content">
          {activeTab === "departments" && (
            <section>
              <div className="settings-admin-section-header">
                <div>
                  <h2>Departments Management</h2>
                  <p>
                    Create and manage organizational departments.
                  </p>
                </div>
                <button
                  className="settings-admin-primary"
                  onClick={() => openAdd("department")}
                >
                  <Plus size={17} /> Add Department
                </button>
              </div>

              <div className="settings-admin-toolbar">
                <div className="settings-admin-search">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search departments..."
                  />
                </div>
                <span className="settings-admin-count">
                  {filteredDepartments.length} departments
                </span>
              </div>

              <div className="settings-admin-table-wrap">
                <table className="settings-admin-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Code</th>
                      <th>Employees</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepartments.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="settings-admin-item-name">
                            <span className="settings-admin-avatar">
                              {item.name.charAt(0)}
                            </span>
                            <strong>{item.name}</strong>
                          </div>
                        </td>
                        <td>{item.code}</td>
                        <td>{item.employees}</td>
                        <td>
                          <span className="settings-admin-status">
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <div className="settings-admin-actions">
                            <button
                              title="Edit"
                              onClick={() => openEdit("department", item)}
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              title="Delete"
                              className="delete"
                              onClick={() =>
                                handleDelete("department", item.id)
                              }
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredDepartments.length === 0 && (
                      <tr>
                        <td colSpan="5" className="settings-admin-empty">
                          No departments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "categories" && (
            <section>
              <div className="settings-admin-section-header">
                <div>
                  <h2>Category Management</h2>
                  <p>
                    Manage the primary ESG categories used across the platform.
                  </p>
                </div>
                <button
                  className="settings-admin-primary"
                  onClick={() => openAdd("category")}
                >
                  <Plus size={17} /> Add Category
                </button>
              </div>

              <div className="settings-admin-toolbar">
                <div className="settings-admin-search">
                  <Search size={17} />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search categories..."
                  />
                </div>
                <span className="settings-admin-count">
                  {filteredCategories.length} categories
                </span>
              </div>

              <div className="settings-admin-category-grid">
                {filteredCategories.map((item) => (
                  <div className="settings-admin-category-card" key={item.id}>
                    <div className="settings-admin-category-top">
                      <div className="settings-admin-category-icon">
                        <Tags size={20} />
                      </div>
                      <span className="settings-admin-status">
                        {item.status}
                      </span>
                    </div>
                    <h3>{item.name}</h3>
                    <span className="settings-admin-category-code">
                      {item.code}
                    </span>
                    <p>{item.description}</p>
                    <div className="settings-admin-category-actions">
                      <button onClick={() => openEdit("category", item)}>
                        <Pencil size={15} /> Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete("category", item.id)}
                      >
                        <Trash2 size={15} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
                {filteredCategories.length === 0 && (
                  <p className="settings-admin-empty">
                    No categories found.
                  </p>
                )}
              </div>
            </section>
          )}

          {activeTab === "esg" && (
            <section>
              <div className="settings-admin-section-header">
                <div>
                  <h2>ESG Configuration</h2>
                  <p>
                    Configure scoring weights and reporting preferences.
                  </p>
                </div>
              </div>

              <div className="settings-admin-config-card">
                <h3>ESG Score Weightage</h3>
                <p>
                  Set the relative contribution of each ESG pillar to the
                  overall score.
                </p>

                {[
                  {
                    key: "environmentalWeight",
                    label: "Environmental",
                    color: "#39966a",
                  },
                  {
                    key: "socialWeight",
                    label: "Social",
                    color: "#5794c9",
                  },
                  {
                    key: "governanceWeight",
                    label: "Governance",
                    color: "#a18bd0",
                  },
                ].map((item) => (
                  <div className="settings-admin-weight" key={item.key}>
                    <div className="settings-admin-weight-label">
                      <span>{item.label}</span>
                      <strong>{esgConfig[item.key]}%</strong>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={esgConfig[item.key]}
                      onChange={(e) =>
                        updateEsg(item.key, Number(e.target.value))
                      }
                      style={{ accentColor: item.color }}
                    />
                  </div>
                ))}

                <div className="settings-admin-weight-total">
                  Total weightage
                  <strong>
                    {esgConfig.environmentalWeight +
                      esgConfig.socialWeight +
                      esgConfig.governanceWeight}
                    %
                  </strong>
                </div>
                {esgConfig.environmentalWeight +
                  esgConfig.socialWeight +
                  esgConfig.governanceWeight !==
                  100 && (
                  <p className="settings-admin-validation">
                    The total weightage should equal 100%.
                  </p>
                )}
              </div>

              <div className="settings-admin-config-card">
                <h3>Performance Targets</h3>
                <div className="settings-admin-config-field">
                  <label>Target ESG Score (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={esgConfig.targetScore}
                    onChange={(e) =>
                      updateEsg("targetScore", Number(e.target.value))
                    }
                  />
                </div>
                <div className="settings-admin-config-field">
                  <label>Reporting Frequency</label>
                  <select
                    value={esgConfig.reportingFrequency}
                    onChange={(e) =>
                      updateEsg("reportingFrequency", e.target.value)
                    }
                  >
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Annually</option>
                  </select>
                </div>
              </div>

              <div className="settings-admin-info">
                These are initial demo configuration fields. Final ESG business
                rules should be aligned with the approved requirements.
              </div>
            </section>
          )}

          {activeTab === "notifications" && (
            <section>
              <div className="settings-admin-section-header">
                <div>
                  <h2>Notification Settings</h2>
                  <p>
                    Control how administrators receive platform updates.
                  </p>
                </div>
              </div>

              <div className="settings-admin-config-card">
                <h3>Delivery Channels</h3>
                <NotificationRow
                  title="Email Notifications"
                  description="Receive important updates through email."
                  setting="email"
                />
                <NotificationRow
                  title="In-app Notifications"
                  description="Display alerts inside the EcoSphere dashboard."
                  setting="inApp"
                />
              </div>

              <div className="settings-admin-config-card">
                <h3>Alert Preferences</h3>
                <NotificationRow
                  title="Compliance Alerts"
                  description="Notifications about compliance issues and risks."
                  setting="compliance"
                />
                <NotificationRow
                  title="Deadline Reminders"
                  description="Reminders for upcoming ESG reporting deadlines."
                  setting="deadline"
                />
                <NotificationRow
                  title="Weekly Summary"
                  description="A weekly digest of platform activity."
                  setting="weekly"
                />
                <NotificationRow
                  title="Monthly ESG Report"
                  description="A monthly summary of ESG performance."
                  setting="monthly"
                />
              </div>
            </section>
          )}
        </main>
      </div>

      {modal && (
        <div className="settings-admin-modal-overlay" onClick={closeModal}>
          <div
            className="settings-admin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-admin-modal-header">
              <div>
                <h2>
                  {modal.mode === "add" ? "Add" : "Edit"}{" "}
                  {modal.type === "department" ? "Department" : "Category"}
                </h2>
                <p>Enter the details below.</p>
              </div>
              <button onClick={closeModal} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="settings-admin-modal-body">
                <label>
                  Name
                  <input
                    required
                    value={form.name || ""}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Enter name"
                  />
                </label>

                <label>
                  Code
                  <input
                    required
                    value={form.code || ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        code: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder="Enter code"
                  />
                </label>

                {modal.type === "category" ? (
                  <label>
                    Description
                    <textarea
                      required
                      value={form.description || ""}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Describe this category"
                      rows="3"
                    />
                  </label>
                ) : (
                  <label>
                    Employee Count
                    <input
                      type="number"
                      min="0"
                      value={form.employees ?? 0}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          employees: Number(e.target.value),
                        }))
                      }
                    />
                  </label>
                )}

                <label>
                  Status
                  <select
                    value={form.status || "Active"}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </label>
              </div>

              <div className="settings-admin-modal-footer">
                <button
                  type="button"
                  className="settings-admin-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="settings-admin-primary">
                  <Check size={16} />
                  {modal.mode === "add" ? "Create" : "Save"}{" "}
                  {modal.type === "department" ? "Department" : "Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

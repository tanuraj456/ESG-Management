
import React, { useMemo, useState } from "react";

const initialInitiatives = [
  {
    id: 1,
    title: "Office Energy Optimization",
    category: "Environmental",
    description:
      "Reduce electricity consumption through smart lighting and energy-efficient equipment.",
    owner: "Facilities Team",
    progress: 75,
    status: "In Progress",
    target: "December 2026",
    impact: "High",
  },
  {
    id: 2,
    title: "Zero Waste Workplace",
    category: "Environmental",
    description:
      "Promote recycling, waste segregation, and responsible disposal across the department.",
    owner: "Operations Team",
    progress: 45,
    status: "In Progress",
    target: "January 2027",
    impact: "High",
  },
  {
    id: 3,
    title: "Employee Wellness Program",
    category: "Social",
    description:
      "Encourage employee well-being through awareness sessions and wellness activities.",
    owner: "HR Team",
    progress: 100,
    status: "Completed",
    target: "September 2026",
    impact: "Medium",
  },
  {
    id: 4,
    title: "Ethical Workplace Training",
    category: "Governance",
    description:
      "Improve awareness of workplace ethics, transparency, and organizational policies.",
    owner: "Compliance Team",
    progress: 25,
    status: "In Progress",
    target: "February 2027",
    impact: "High",
  },
  {
    id: 5,
    title: "Community Tree Plantation",
    category: "Environmental",
    description:
      "Organize community participation in tree plantation and environmental awareness.",
    owner: "CSR Team",
    progress: 0,
    status: "Not Started",
    target: "March 2027",
    impact: "Medium",
  },
];

const categoryColors = {
  Environmental: "#8EB69B",
  Social: "#8BB8D9",
  Governance: "#C3A5E5",
};

function ESGInitiatives() {
  const [initiatives, setInitiatives] = useState(initialInitiatives);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Environmental",
    description: "",
    owner: "",
    target: "",
    impact: "Medium",
  });

  const completed = initiatives.filter(
    (item) => item.status === "Completed"
  ).length;

  const inProgress = initiatives.filter(
    (item) => item.status === "In Progress"
  ).length;

  const averageProgress = initiatives.length
    ? Math.round(
        initiatives.reduce((sum, item) => sum + item.progress, 0) /
          initiatives.length
      )
    : 0;

  const filteredInitiatives = useMemo(() => {
    return initiatives.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.owner.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        item.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [initiatives, search, categoryFilter, statusFilter]);

  const handleAddInitiative = (e) => {
    e.preventDefault();

    const newInitiative = {
      ...formData,
      id: Date.now(),
      progress: 0,
      status: "Not Started",
    };

    setInitiatives((prev) => [newInitiative, ...prev]);

    setFormData({
      title: "",
      category: "Environmental",
      description: "",
      owner: "",
      target: "",
      impact: "Medium",
    });

    setShowModal(false);
  };

  const updateProgress = (id, progress) => {
    setInitiatives((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              progress,
              status:
                progress === 100
                  ? "Completed"
                  : progress === 0
                  ? "Not Started"
                  : "In Progress",
            }
          : item
      )
    );
  };

  return (
    <div className="dashboard-page initiatives-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">MANAGER WORKSPACE</span>
          <h1>ESG Initiatives</h1>
          <p>
            Monitor and manage sustainability initiatives across your
            department.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowModal(true)}
        >
          + Add Initiative
        </button>
      </div>

      <div className="initiative-stats">
        <div className="initiative-stat-card">
          <span>Total Initiatives</span>
          <h2>{initiatives.length}</h2>
          <small>Across all ESG categories</small>
        </div>

        <div className="initiative-stat-card">
          <span>In Progress</span>
          <h2>{inProgress}</h2>
          <small>Currently active</small>
        </div>

        <div className="initiative-stat-card">
          <span>Completed</span>
          <h2>{completed}</h2>
          <small>Successfully achieved</small>
        </div>

        <div className="initiative-stat-card">
          <span>Average Progress</span>
          <h2>{averageProgress}%</h2>
          <small>Overall completion</small>
        </div>
      </div>

      <div className="initiative-toolbar">
        <input
          type="search"
          placeholder="Search initiatives or owners..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Environmental">Environmental</option>
          <option value="Social">Social</option>
          <option value="Governance">Governance</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="initiative-grid">
        {filteredInitiatives.map((item) => (
          <div className="initiative-card" key={item.id}>
            <div className="initiative-card-top">
              <span
                className="initiative-category"
                style={{
                  color: categoryColors[item.category],
                }}
              >
                {item.category}
              </span>

              <span
                className={`status-badge ${
                  item.status === "Completed"
                    ? "success"
                    : item.status === "In Progress"
                    ? "warning"
                    : "neutral"
                }`}
              >
                {item.status}
              </span>
            </div>

            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div className="initiative-meta">
              <span>Owner</span>
              <strong>{item.owner}</strong>
            </div>

            <div className="initiative-meta">
              <span>Target</span>
              <strong>{item.target || "Not specified"}</strong>
            </div>

            <div className="initiative-meta">
              <span>Impact</span>
              <strong>{item.impact}</strong>
            </div>

            <div className="initiative-progress-heading">
              <span>Progress</span>
              <strong>{item.progress}%</strong>
            </div>

            <div className="initiative-progress-track">
              <div
                className="initiative-progress-fill"
                style={{ width: `${item.progress}%` }}
              />
            </div>

            <div className="initiative-actions">
              <button
                className="secondary-button"
                onClick={() => setSelectedInitiative(item)}
              >
                View Details
              </button>

              <select
                aria-label={`Update progress for ${item.title}`}
                value={item.progress}
                onChange={(e) =>
                  updateProgress(item.id, Number(e.target.value))
                }
              >
                <option value={0}>0%</option>
                <option value={25}>25%</option>
                <option value={50}>50%</option>
                <option value={75}>75%</option>
                <option value={100}>100%</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {filteredInitiatives.length === 0 && (
        <div className="initiative-empty">
          <h3>No initiatives found</h3>
          <p>Try changing your search or filters.</p>
        </div>
      )}

      {showModal && (
        <div
          className="initiative-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="initiative-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="initiative-modal-header">
              <h2>Create Initiative</h2>
              <button onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleAddInitiative}>
              <label>Initiative Title</label>
              <input
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                placeholder="Enter initiative title"
              />

              <label>Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
              >
                <option>Environmental</option>
                <option>Social</option>
                <option>Governance</option>
              </select>

              <label>Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the initiative"
              />

              <label>Owner</label>
              <input
                required
                value={formData.owner}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    owner: e.target.value,
                  })
                }
                placeholder="Responsible team"
              />

              <label>Target Date</label>
              <input
                type="text"
                value={formData.target}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    target: e.target.value,
                  })
                }
                placeholder="e.g. March 2027"
              />

              <label>Impact Level</label>
              <select
                value={formData.impact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    impact: e.target.value,
                  })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <div className="initiative-modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  Create Initiative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedInitiative && (
        <div
          className="initiative-modal-overlay"
          onClick={() => setSelectedInitiative(null)}
        >
          <div
            className="initiative-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="initiative-modal-header">
              <h2>Initiative Details</h2>
              <button onClick={() => setSelectedInitiative(null)}>
                ✕
              </button>
            </div>

            <h3>{selectedInitiative.title}</h3>
            <p>{selectedInitiative.description}</p>

            <div className="initiative-detail-list">
              <p>
                <strong>Category:</strong>{" "}
                {selectedInitiative.category}
              </p>
              <p>
                <strong>Owner:</strong> {selectedInitiative.owner}
              </p>
              <p>
                <strong>Status:</strong> {selectedInitiative.status}
              </p>
              <p>
                <strong>Progress:</strong>{" "}
                {selectedInitiative.progress}%
              </p>
              <p>
                <strong>Target:</strong>{" "}
                {selectedInitiative.target || "Not specified"}
              </p>
              <p>
                <strong>Impact:</strong> {selectedInitiative.impact}
              </p>
            </div>

            <button
              className="primary-button"
              onClick={() => setSelectedInitiative(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ESGInitiatives;

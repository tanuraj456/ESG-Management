
import React, { useMemo, useState } from "react";

const initialResources = [
  {
    id: 1,
    title: "Introduction to ESG",
    description:
      "Understand the fundamentals of Environmental, Social, and Governance principles and their importance in responsible business.",
    category: "Governance",
    type: "Guide",
    duration: "15 min",
    level: "Beginner",
    icon: "📘",
    color: "green",
    status: "Completed",
    progress: 100,
    author: "EcoSphere Learning Team",
  },
  {
    id: 2,
    title: "Climate Change and Carbon Footprint",
    description:
      "Learn how carbon emissions affect our planet and discover practical ways to reduce your environmental footprint.",
    category: "Environmental",
    type: "Learning Module",
    duration: "25 min",
    level: "Beginner",
    icon: "🌍",
    color: "blue",
    status: "In Progress",
    progress: 60,
    author: "Sustainability Department",
  },
  {
    id: 3,
    title: "Workplace Diversity and Inclusion",
    description:
      "Explore inclusive workplace practices, equal opportunities, and the importance of creating a supportive work environment.",
    category: "Social",
    type: "Guide",
    duration: "20 min",
    level: "Beginner",
    icon: "🤝",
    color: "purple",
    status: "Not Started",
    progress: 0,
    author: "People and Culture Team",
  },
  {
    id: 4,
    title: "Waste Management Best Practices",
    description:
      "Discover waste segregation, recycling techniques, and ways to reduce waste in everyday workplace activities.",
    category: "Environmental",
    type: "Checklist",
    duration: "10 min",
    level: "Beginner",
    icon: "♻️",
    color: "green",
    status: "Not Started",
    progress: 0,
    author: "Environmental Team",
  },
  {
    id: 5,
    title: "Business Ethics and Compliance",
    description:
      "Learn about ethical decision-making, organizational accountability, transparency, and responsible conduct.",
    category: "Governance",
    type: "Learning Module",
    duration: "30 min",
    level: "Intermediate",
    icon: "⚖️",
    color: "purple",
    status: "Not Started",
    progress: 0,
    author: "Compliance Department",
  },
  {
    id: 6,
    title: "Employee Health and Well-being",
    description:
      "Understand the importance of mental health, workplace safety, and maintaining a healthy work-life balance.",
    category: "Social",
    type: "Guide",
    duration: "18 min",
    level: "Beginner",
    icon: "💚",
    color: "blue",
    status: "Completed",
    progress: 100,
    author: "People and Culture Team",
  },
  {
    id: 7,
    title: "Energy Conservation at Work",
    description:
      "Learn simple energy-saving habits that help reduce electricity consumption and support sustainability goals.",
    category: "Environmental",
    type: "Checklist",
    duration: "12 min",
    level: "Beginner",
    icon: "⚡",
    color: "green",
    status: "In Progress",
    progress: 35,
    author: "Facilities Team",
  },
  {
    id: 8,
    title: "ESG Reporting Fundamentals",
    description:
      "Explore ESG metrics, sustainability disclosures, reporting frameworks, and the role of accurate data.",
    category: "Governance",
    type: "Learning Module",
    duration: "35 min",
    level: "Intermediate",
    icon: "📊",
    color: "purple",
    status: "Not Started",
    progress: 0,
    author: "ESG Reporting Team",
  },
];

const resourceCategories = [
  "All",
  "Environmental",
  "Social",
  "Governance",
];

const resourceStatuses = [
  "All",
  "Not Started",
  "In Progress",
  "Completed",
];

function Resources() {
  const [resources, setResources] = useState(initialResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedResource, setSelectedResource] = useState(null);

  const completedCount = resources.filter(
    (resource) => resource.status === "Completed"
  ).length;

  const inProgressCount = resources.filter(
    (resource) => resource.status === "In Progress"
  ).length;

  const learningProgress = Math.round(
    resources.reduce((total, resource) => total + resource.progress, 0) /
      resources.length
  );

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory =
        selectedCategory === "All" ||
        resource.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "All" ||
        resource.status === selectedStatus;

      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [resources, searchTerm, selectedCategory, selectedStatus]);

  const startLearning = (id) => {
    setResources((current) =>
      current.map((resource) =>
        resource.id === id
          ? {
              ...resource,
              status:
                resource.status === "Completed"
                  ? "Completed"
                  : "In Progress",
              progress:
                resource.progress === 0 ? 10 : resource.progress,
            }
          : resource
      )
    );

    setSelectedResource((current) =>
      current?.id === id
        ? {
            ...current,
            status:
              current.status === "Completed"
                ? "Completed"
                : "In Progress",
            progress:
              current.progress === 0 ? 10 : current.progress,
          }
        : current
    );
  };

  const markCompleted = (id) => {
    setResources((current) =>
      current.map((resource) =>
        resource.id === id
          ? { ...resource, status: "Completed", progress: 100 }
          : resource
      )
    );

    setSelectedResource((current) =>
      current?.id === id
        ? { ...current, status: "Completed", progress: 100 }
        : current
    );
  };

  return (
    <div className="employee-resources-page">
      {/* Header */}
      <div className="resources-header">
        <div>
          <p className="eyebrow">
            EMPLOYEE WORKSPACE / RESOURCES
          </p>
          <h1>Learning Resources</h1>
          <p className="resources-subtitle">
            Build your ESG knowledge and turn learning into meaningful action.
          </p>
        </div>

        <div className="resources-header-icon">📚</div>
      </div>

      {/* Stats */}
      <div className="resources-stats-grid">
        <div className="resource-stat-card">
          <div className="resource-stat-icon green">📖</div>
          <div>
            <p>Total Resources</p>
            <h2>{resources.length}</h2>
            <span>Available learning materials</span>
          </div>
        </div>

        <div className="resource-stat-card">
          <div className="resource-stat-icon blue">✅</div>
          <div>
            <p>Completed</p>
            <h2>{completedCount}</h2>
            <span>Resources completed</span>
          </div>
        </div>

        <div className="resource-stat-card">
          <div className="resource-stat-icon purple">⏳</div>
          <div>
            <p>In Progress</p>
            <h2>{inProgressCount}</h2>
            <span>Learning in progress</span>
          </div>
        </div>

        <div className="resource-stat-card">
          <div className="resource-stat-icon orange">🎯</div>
          <div>
            <p>Learning Progress</p>
            <h2>{learningProgress}%</h2>
            <span>Overall completion</span>
          </div>
        </div>
      </div>

      {/* Learning banner */}
      <div className="resources-learning-banner">
        <div className="resources-learning-content">
          <span className="resources-banner-label">
            YOUR LEARNING JOURNEY
          </span>
          <h2>Knowledge is the first step toward impact.</h2>
          <p>
            Explore the resources, strengthen your ESG skills,
            and contribute to a more sustainable workplace.
          </p>

          <div className="resources-banner-progress">
            <div className="resources-banner-progress-heading">
              <span>Overall learning progress</span>
              <strong>{learningProgress}%</strong>
            </div>

            <div className="resources-banner-track">
              <div
                className="resources-banner-fill"
                style={{ width: `${learningProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="resources-banner-illustration">🌱</div>
      </div>

      {/* Search */}
      <div className="resources-toolbar">
        <div className="resources-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search learning resources..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <select
          className="resources-status-select"
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          {resourceStatuses.map((status) => (
            <option key={status} value={status}>
              {status === "All" ? "All Statuses" : status}
            </option>
          ))}
        </select>
      </div>

      {/* Category filters */}
      <div className="resources-category-tabs">
        {resourceCategories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category ? "active" : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      <div className="resources-section-heading">
        <div>
          <h2>Explore Resources</h2>
          <p>{filteredResources.length} resources available</p>
        </div>
      </div>

      {filteredResources.length > 0 ? (
        <div className="resources-grid">
          {filteredResources.map((resource) => (
            <article className="resource-card" key={resource.id}>
              <div className="resource-card-top">
                <div className={`resource-icon ${resource.color}`}>
                  {resource.icon}
                </div>

                <span
                  className={`resource-status ${
                    resource.status === "Completed"
                      ? "completed"
                      : resource.status === "In Progress"
                      ? "in-progress"
                      : "not-started"
                  }`}
                >
                  {resource.status}
                </span>
              </div>

              <span className="resource-category">
                {resource.category}
              </span>

              <h3>{resource.title}</h3>

              <p className="resource-description">
                {resource.description}
              </p>

              <div className="resource-meta">
                <span>📄 {resource.type}</span>
                <span>⏱ {resource.duration}</span>
                <span>🎓 {resource.level}</span>
              </div>

              {resource.status !== "Not Started" && (
                <div className="resource-progress">
                  <div className="resource-progress-heading">
                    <span>Progress</span>
                    <strong>{resource.progress}%</strong>
                  </div>

                  <div className="resource-progress-track">
                    <div
                      className="resource-progress-fill"
                      style={{ width: `${resource.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                className="resource-view-btn"
                onClick={() => setSelectedResource(resource)}
              >
                {resource.status === "Completed"
                  ? "Review Resource →"
                  : resource.status === "In Progress"
                  ? "Continue Learning →"
                  : "Start Learning →"}
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="resources-empty">
          <div>🔎</div>
          <h3>No resources found</h3>
          <p>Try another search term or change your filters.</p>

          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSelectedStatus("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Resource details modal */}
      {selectedResource && (
        <div
          className="resource-modal-overlay"
          onClick={() => setSelectedResource(null)}
        >
          <div
            className="resource-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="resource-modal-close"
              onClick={() => setSelectedResource(null)}
              aria-label="Close resource details"
            >
              ×
            </button>

            <div
              className={`resource-modal-icon ${selectedResource.color}`}
            >
              {selectedResource.icon}
            </div>

            <span className="resource-category">
              {selectedResource.category}
            </span>

            <h2>{selectedResource.title}</h2>

            <p>{selectedResource.description}</p>

            <div className="resource-modal-info">
              <div>
                <span>Resource Type</span>
                <strong>{selectedResource.type}</strong>
              </div>

              <div>
                <span>Estimated Duration</span>
                <strong>{selectedResource.duration}</strong>
              </div>

              <div>
                <span>Difficulty</span>
                <strong>{selectedResource.level}</strong>
              </div>

              <div>
                <span>Created By</span>
                <strong>{selectedResource.author}</strong>
              </div>
            </div>

            <div className="resource-modal-progress">
              <div className="resource-progress-heading">
                <span>Your progress</span>
                <strong>{selectedResource.progress}%</strong>
              </div>

              <div className="resource-progress-track">
                <div
                  className="resource-progress-fill"
                  style={{
                    width: `${selectedResource.progress}%`,
                  }}
                />
              </div>
            </div>

            {selectedResource.status !== "Completed" ? (
              <div className="resource-modal-actions">
                <button
                  className="resource-start-btn"
                  onClick={() => startLearning(selectedResource.id)}
                >
                  {selectedResource.status === "In Progress"
                    ? "Continue Learning"
                    : "Start Learning"}
                </button>

                <button
                  className="resource-complete-btn"
                  onClick={() => markCompleted(selectedResource.id)}
                >
                  Mark as Completed
                </button>
              </div>
            ) : (
              <div className="resource-completed-message">
                ✓ You have completed this resource!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Resources;

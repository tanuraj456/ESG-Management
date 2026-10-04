
import { useMemo, useState } from "react";

const initialActivities = [
  {
    id: 1,
    title: "Community Tree Plantation",
    category: "Environment",
    description:
      "Participate in a community plantation drive to increase green cover and support biodiversity.",
    date: "2026-10-12",
    time: "09:00 AM",
    location: "Central Community Park",
    duration: "4 hours",
    participants: 32,
    capacity: 50,
    status: "Available",
    impact: "Plant 100 trees",
    icon: "🌱",
    color: "green",
    joined: false,
    progress: 0,
  },
  {
    id: 2,
    title: "Zero Waste Workplace",
    category: "Waste Management",
    description:
      "Help implement waste segregation, recycling practices, and responsible disposal across the office.",
    date: "2026-10-15",
    time: "11:00 AM",
    location: "Office Campus",
    duration: "3 hours",
    participants: 18,
    capacity: 30,
    status: "Ongoing",
    impact: "Reduce workplace waste",
    icon: "♻️",
    color: "blue",
    joined: true,
    progress: 65,
  },
  {
    id: 3,
    title: "Energy Conservation Week",
    category: "Energy",
    description:
      "Promote energy-saving habits and identify opportunities to reduce electricity consumption.",
    date: "2026-10-18",
    time: "10:00 AM",
    location: "Corporate Office",
    duration: "5 days",
    participants: 45,
    capacity: 60,
    status: "Ongoing",
    impact: "Save 500 kWh",
    icon: "⚡",
    color: "yellow",
    joined: true,
    progress: 40,
  },
  {
    id: 4,
    title: "Digital Literacy for All",
    category: "Community",
    description:
      "Volunteer to teach basic digital skills to students and members of underserved communities.",
    date: "2026-10-22",
    time: "02:00 PM",
    location: "Government School, Jaipur",
    duration: "3 hours",
    participants: 21,
    capacity: 35,
    status: "Available",
    impact: "Support 50 learners",
    icon: "📚",
    color: "purple",
    joined: false,
    progress: 0,
  },
  {
    id: 5,
    title: "Clean Water Awareness Drive",
    category: "Community",
    description:
      "Raise awareness about water conservation and responsible water usage in local communities.",
    date: "2026-10-25",
    time: "08:30 AM",
    location: "Community Centre",
    duration: "4 hours",
    participants: 27,
    capacity: 40,
    status: "Available",
    impact: "Reach 200 households",
    icon: "💧",
    color: "cyan",
    joined: false,
    progress: 0,
  },
  {
    id: 6,
    title: "Sustainable Transport Challenge",
    category: "Environment",
    description:
      "Encourage employees to use public transport, carpooling, cycling, and other low-carbon travel options.",
    date: "2026-10-28",
    time: "All day",
    location: "Company-wide",
    duration: "7 days",
    participants: 64,
    capacity: 100,
    status: "Completed",
    impact: "Reduce commuting emissions",
    icon: "🚲",
    color: "green",
    joined: true,
    progress: 100,
  },
];

const categories = [
  "All Categories",
  "Environment",
  "Waste Management",
  "Energy",
  "Community",
];

const statusOptions = [
  "All Activities",
  "Available",
  "Ongoing",
  "Completed",
];

const MyActivities = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Activities");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [notification, setNotification] = useState("");

  const joinedActivities = activities.filter((activity) => activity.joined);

  const completedCount = joinedActivities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const ongoingCount = joinedActivities.filter(
    (activity) => activity.status === "Ongoing"
  ).length;

  const totalHours = joinedActivities.reduce((total, activity) => {
    const hours = parseInt(activity.duration, 10);
    return total + (Number.isNaN(hours) ? 0 : hours);
  }, 0);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(search.toLowerCase()) ||
        activity.description.toLowerCase().includes(search.toLowerCase()) ||
        activity.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All Categories" ||
        activity.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All Activities" ||
        activity.status === statusFilter;

      const matchesTab =
        activeTab === "all" ||
        (activeTab === "joined" && activity.joined) ||
        (activeTab === "available" && !activity.joined);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesTab
      );
    });
  }, [activities, search, categoryFilter, statusFilter, activeTab]);

  const handleJoin = (id) => {
    const activity = activities.find((item) => item.id === id);

    if (!activity || activity.joined) return;

    if (activity.participants >= activity.capacity) {
      setNotification("Sorry, this activity is already full.");
      return;
    }

    setActivities((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              joined: true,
              participants: item.participants + 1,
              status: "Ongoing",
              progress: 0,
            }
          : item
      )
    );

    setSelectedActivity(null);
    setNotification("Successfully joined the activity!");
    window.setTimeout(() => setNotification(""), 3000);
  };

  const handleProgressChange = (id, value) => {
    const progress = Number(value);

    setActivities((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              progress,
              status: progress === 100 ? "Completed" : "Ongoing",
            }
          : item
      )
    );

    setNotification(
      progress === 100
        ? "Congratulations! Activity marked as completed."
        : "Your activity progress has been updated."
    );

    window.setTimeout(() => setNotification(""), 3000);
  };

  const formatDate = (date) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="employee-activities-page">
      {/* Header */}
      <div className="activities-page-header">
        <div>
          <span className="activities-eyebrow">EMPLOYEE WORKSPACE</span>
          <h1>My Activities</h1>
          <p>
            Discover ESG initiatives, participate in meaningful activities,
            and track your sustainability impact.
          </p>
        </div>

        <div className="activities-header-icon">🌿</div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="activities-toast">
          <span>✓</span>
          {notification}
          <button
            type="button"
            onClick={() => setNotification("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="activities-stats-grid">
        <div className="activities-stat-card">
          <div className="activities-stat-top">
            <span className="activities-stat-label">Total Activities</span>
            <span className="activities-stat-icon green">🌿</span>
          </div>
          <h2>{joinedActivities.length}</h2>
          <p>Activities joined</p>
        </div>

        <div className="activities-stat-card">
          <div className="activities-stat-top">
            <span className="activities-stat-label">Ongoing</span>
            <span className="activities-stat-icon blue">◷</span>
          </div>
          <h2>{ongoingCount}</h2>
          <p>Currently participating</p>
        </div>

        <div className="activities-stat-card">
          <div className="activities-stat-top">
            <span className="activities-stat-label">Completed</span>
            <span className="activities-stat-icon purple">✓</span>
          </div>
          <h2>{completedCount}</h2>
          <p>Successfully completed</p>
        </div>

        <div className="activities-stat-card">
          <div className="activities-stat-top">
            <span className="activities-stat-label">Participation Hours</span>
            <span className="activities-stat-icon yellow">◷</span>
          </div>
          <h2>{totalHours}h</h2>
          <p>Estimated activity hours</p>
        </div>
      </div>

      {/* Featured banner */}
      <div className="activities-featured-banner">
        <div className="activities-featured-content">
          <span className="activities-featured-tag">
            MAKE A DIFFERENCE
          </span>
          <h2>Small actions. Lasting impact.</h2>
          <p>
            Every activity you join contributes to a more sustainable
            workplace and a healthier planet.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveTab("available");
              setStatusFilter("All Activities");
              setCategoryFilter("All Categories");
            }}
          >
            Explore Activities <span>→</span>
          </button>
        </div>
        <div className="activities-featured-art">🌍</div>
      </div>

      {/* Activity listing */}
      <div className="activities-listing-header">
        <div>
          <h2>Explore Activities</h2>
          <p>Find opportunities that match your interests.</p>
        </div>

        <span className="activities-result-count">
          {filteredActivities.length} activities
        </span>
      </div>

      {/* Tabs */}
      <div className="activities-tabs">
        <button
          type="button"
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Activities
        </button>

        <button
          type="button"
          className={activeTab === "available" ? "active" : ""}
          onClick={() => setActiveTab("available")}
        >
          Available
        </button>

        <button
          type="button"
          className={activeTab === "joined" ? "active" : ""}
          onClick={() => setActiveTab("joined")}
        >
          My Activities
        </button>
      </div>

      {/* Filters */}
      <div className="activities-filters">
        <div className="activities-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter by category"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Cards */}
      {filteredActivities.length > 0 ? (
        <div className="activities-cards-grid">
          {filteredActivities.map((activity) => (
            <article className="activity-card" key={activity.id}>
              <div className={`activity-card-visual ${activity.color}`}>
                <span className="activity-card-emoji">
                  {activity.icon}
                </span>
                <span className="activity-category-badge">
                  {activity.category}
                </span>
              </div>

              <div className="activity-card-body">
                <div className="activity-card-title-row">
                  <h3>{activity.title}</h3>
                  <span
                    className={`activity-status-badge ${activity.status.toLowerCase()}`}
                  >
                    {activity.status}
                  </span>
                </div>

                <p className="activity-card-description">
                  {activity.description}
                </p>

                <div className="activity-card-details">
                  <div>
                    <span>📅</span>
                    {formatDate(activity.date)}
                  </div>
                  <div>
                    <span>📍</span>
                    {activity.location}
                  </div>
                  <div>
                    <span>◷</span>
                    {activity.duration}
                  </div>
                </div>

                <div className="activity-participants">
                  <div className="activity-participants-top">
                    <span>Participation</span>
                    <strong>
                      {activity.participants}/{activity.capacity}
                    </strong>
                  </div>
                  <div className="activity-participants-track">
                    <div
                      style={{
                        width: `${
                          (activity.participants / activity.capacity) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {activity.joined && (
                  <div className="activity-progress">
                    <div className="activity-progress-top">
                      <span>My Progress</span>
                      <strong>{activity.progress}%</strong>
                    </div>

                    <div className="activity-progress-track">
                      <div
                        style={{ width: `${activity.progress}%` }}
                      />
                    </div>

                    {activity.status !== "Completed" && (
                      <select
                        value={activity.progress}
                        onChange={(e) =>
                          handleProgressChange(activity.id, e.target.value)
                        }
                        aria-label={`Update progress for ${activity.title}`}
                      >
                        <option value="0">Not started</option>
                        <option value="25">25% complete</option>
                        <option value="50">50% complete</option>
                        <option value="75">75% complete</option>
                        <option value="100">Mark completed</option>
                      </select>
                    )}
                  </div>
                )}

                <div className="activity-card-footer">
                  <button
                    type="button"
                    className="activity-details-button"
                    onClick={() => setSelectedActivity(activity)}
                  >
                    View Details
                  </button>

                  {activity.joined ? (
                    <span className="activity-joined-label">
                      ✓ Joined
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="activity-join-button"
                      onClick={() => handleJoin(activity.id)}
                      disabled={
                        activity.participants >= activity.capacity
                      }
                    >
                      {activity.participants >= activity.capacity
                        ? "Full"
                        : "Join Activity"}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="activities-empty-state">
          <span>🔎</span>
          <h3>No activities found</h3>
          <p>
            Try changing your search or filters to discover more activities.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategoryFilter("All Categories");
              setStatusFilter("All Activities");
              setActiveTab("all");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Activity details modal */}
      {selectedActivity && (
        <div
          className="activity-modal-overlay"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="activity-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="activity-modal-close"
              onClick={() => setSelectedActivity(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <div
              className={`activity-modal-visual ${selectedActivity.color}`}
            >
              {selectedActivity.icon}
            </div>

            <span className="activity-modal-category">
              {selectedActivity.category}
            </span>

            <h2 id="activity-modal-title">
              {selectedActivity.title}
            </h2>

            <p className="activity-modal-description">
              {selectedActivity.description}
            </p>

            <div className="activity-modal-info">
              <div>
                <span>📅 Date</span>
                <strong>{formatDate(selectedActivity.date)}</strong>
              </div>
              <div>
                <span>🕒 Time</span>
                <strong>{selectedActivity.time}</strong>
              </div>
              <div>
                <span>📍 Location</span>
                <strong>{selectedActivity.location}</strong>
              </div>
              <div>
                <span>⏱ Duration</span>
                <strong>{selectedActivity.duration}</strong>
              </div>
              <div>
                <span>🌱 Expected Impact</span>
                <strong>{selectedActivity.impact}</strong>
              </div>
              <div>
                <span>👥 Participants</span>
                <strong>
                  {selectedActivity.participants}/
                  {selectedActivity.capacity}
                </strong>
              </div>
            </div>

            <div className="activity-modal-actions">
              {selectedActivity.joined ? (
                <button
                  type="button"
                  className="activity-join-button"
                  onClick={() => setSelectedActivity(null)}
                >
                  Already Joined ✓
                </button>
              ) : (
                <button
                  type="button"
                  className="activity-join-button"
                  onClick={() => handleJoin(selectedActivity.id)}
                  disabled={
                    selectedActivity.participants >=
                    selectedActivity.capacity
                  }
                >
                  Join This Activity
                </button>
              )}

              <button
                type="button"
                className="activity-details-button"
                onClick={() => setSelectedActivity(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyActivities;

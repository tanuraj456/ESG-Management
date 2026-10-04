
import { useMemo, useState } from "react";
import {
  Heart,
  Users,
  HandHeart,
  IndianRupee,
  CalendarDays,
  MapPin,
  Search,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  X,
  Leaf,
  GraduationCap,
  Droplets,
  TreePine,
  Download,
} from "lucide-react";

const initialActivities = [
  {
    id: 1,
    title: "Green Earth Plantation Drive",
    category: "Environment",
    description:
      "Planting trees and restoring green spaces in local communities.",
    date: "2026-10-12",
    location: "Bikaner, Rajasthan",
    volunteers: 42,
    target: 50,
    budget: 25000,
    spent: 18500,
    impact: "350 trees planted",
    status: "Ongoing",
    icon: TreePine,
  },
  {
    id: 2,
    title: "Education for All",
    category: "Education",
    description:
      "Providing learning materials and mentorship to underprivileged students.",
    date: "2026-10-18",
    location: "Government School, Bikaner",
    volunteers: 28,
    target: 30,
    budget: 40000,
    spent: 32000,
    impact: "120 students supported",
    status: "Ongoing",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Clean Water Initiative",
    category: "Community",
    description:
      "Supporting access to clean drinking water through community awareness.",
    date: "2026-09-20",
    location: "Rural Bikaner",
    volunteers: 35,
    target: 35,
    budget: 30000,
    spent: 30000,
    impact: "3 water stations supported",
    status: "Completed",
    icon: Droplets,
  },
  {
    id: 4,
    title: "Community Health Awareness",
    category: "Healthcare",
    description:
      "Organising health awareness sessions and basic wellness check-ups.",
    date: "2026-10-25",
    location: "Community Centre, Bikaner",
    volunteers: 18,
    target: 25,
    budget: 20000,
    spent: 5000,
    impact: "120 beneficiaries targeted",
    status: "Planned",
    icon: Heart,
  },
  {
    id: 5,
    title: "Community Clean-up Campaign",
    category: "Environment",
    description:
      "Engaging employees in neighbourhood clean-up and waste segregation.",
    date: "2026-09-10",
    location: "Bikaner City",
    volunteers: 55,
    target: 50,
    budget: 15000,
    spent: 14000,
    impact: "200 kg waste collected",
    status: "Completed",
    icon: Leaf,
  },
];

const statusColors = {
  Ongoing: {
    color: "#60A5FA",
    background: "rgba(96,165,250,0.13)",
  },
  Completed: {
    color: "#8EB69B",
    background: "rgba(142,182,155,0.15)",
  },
  Planned: {
    color: "#FBBF24",
    background: "rgba(251,191,36,0.13)",
  },
};

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function CSRActivities() {
  const [activities, setActivities] = useState(initialActivities);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "Environment",
    description: "",
    date: "",
    location: "",
    volunteers: "",
    target: "",
    budget: "",
  });

  const stats = useMemo(() => {
    const completed = activities.filter(
      (item) => item.status === "Completed"
    ).length;

    const volunteers = activities.reduce(
      (total, item) => total + item.volunteers,
      0
    );

    const budget = activities.reduce(
      (total, item) => total + item.budget,
      0
    );

    const spent = activities.reduce(
      (total, item) => total + item.spent,
      0
    );

    return {
      total: activities.length,
      completed,
      volunteers,
      budget,
      spent,
    };
  }, [activities]);

  const filteredActivities = activities.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleCreateActivity = (event) => {
    event.preventDefault();

    const newActivity = {
      ...form,
      id: Date.now(),
      volunteers: Number(form.volunteers) || 0,
      target: Number(form.target) || 0,
      budget: Number(form.budget) || 0,
      spent: 0,
      impact: "Impact to be updated",
      status: "Planned",
      icon: Heart,
    };

    setActivities((previous) => [newActivity, ...previous]);

    setForm({
      title: "",
      category: "Environment",
      description: "",
      date: "",
      location: "",
      volunteers: "",
      target: "",
      budget: "",
    });

    setShowForm(false);
  };

  const exportActivities = () => {
    const headers = [
      "Activity",
      "Category",
      "Date",
      "Location",
      "Volunteers",
      "Budget",
      "Spent",
      "Status",
    ];

    const rows = filteredActivities.map((item) => [
      item.title,
      item.category,
      item.date,
      item.location,
      item.volunteers,
      item.budget,
      item.spent,
      item.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecospher-csr-activities.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-page csr-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MANAGER WORKSPACE / CSR</p>
          <h1>CSR Activities</h1>
          <p className="page-description">
            Track community initiatives, employee volunteering, and the social
            impact your department creates.
          </p>
        </div>

        <div className="csr-heading-actions">
          <button className="csr-export-btn" onClick={exportActivities}>
            <Download size={17} />
            Export
          </button>

          <button
            className="csr-primary-btn"
            onClick={() => setShowForm(true)}
          >
            <Plus size={17} />
            New Activity
          </button>
        </div>
      </div>

      <section className="csr-stats-grid">
        <div className="csr-stat-card">
          <div className="csr-stat-icon green">
            <HandHeart size={21} />
          </div>
          <div>
            <p>Total Activities</p>
            <h2>{stats.total}</h2>
            <span>Across all CSR programs</span>
          </div>
        </div>

        <div className="csr-stat-card">
          <div className="csr-stat-icon blue">
            <Users size={21} />
          </div>
          <div>
            <p>Volunteer Participation</p>
            <h2>{stats.volunteers}</h2>
            <span>Total recorded participants</span>
          </div>
        </div>

        <div className="csr-stat-card">
          <div className="csr-stat-icon amber">
            <IndianRupee size={21} />
          </div>
          <div>
            <p>CSR Budget</p>
            <h2>{formatCurrency(stats.budget)}</h2>
            <span>{formatCurrency(stats.spent)} utilised</span>
          </div>
        </div>

        <div className="csr-stat-card">
          <div className="csr-stat-icon purple">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <p>Completed Programs</p>
            <h2>{stats.completed}</h2>
            <span>Successfully delivered</span>
          </div>
        </div>
      </section>

      <section className="csr-impact-banner">
        <div className="csr-impact-symbol">
          <Heart size={25} />
        </div>
        <div className="csr-impact-copy">
          <span>YOUR DEPARTMENT'S SOCIAL IMPACT</span>
          <h2>Small actions. Meaningful change.</h2>
          <p>
            Every volunteer hour and community initiative helps build a more
            inclusive and sustainable future.
          </p>
        </div>
        <div className="csr-impact-decoration">
          <Leaf size={90} />
        </div>
      </section>

      <section className="csr-activities-section">
        <div className="csr-section-heading">
          <div>
            <h2>Activity Directory</h2>
            <p>Explore and manage your department's CSR initiatives.</p>
          </div>
          <span className="csr-record-count">
            {filteredActivities.length} activities
          </span>
        </div>

        <div className="csr-filters">
          <div className="csr-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search activities or locations..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Planned">Planned</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="All">All categories</option>
            <option value="Environment">Environment</option>
            <option value="Education">Education</option>
            <option value="Community">Community</option>
            <option value="Healthcare">Healthcare</option>
          </select>
        </div>

        <div className="csr-activity-grid">
          {filteredActivities.map((activity) => {
            const Icon = activity.icon;
            const progress =
              activity.target > 0
                ? Math.min(
                    100,
                    Math.round(
                      (activity.volunteers / activity.target) * 100
                    )
                  )
                : 0;

            const budgetProgress =
              activity.budget > 0
                ? Math.min(
                    100,
                    Math.round((activity.spent / activity.budget) * 100)
                  )
                : 0;

            return (
              <article className="csr-activity-card" key={activity.id}>
                <div className="csr-card-top">
                  <div className="csr-activity-icon">
                    <Icon size={21} />
                  </div>

                  <span
                    className="csr-status"
                    style={{
                      color: statusColors[activity.status].color,
                      background: statusColors[activity.status].background,
                    }}
                  >
                    {activity.status}
                  </span>
                </div>

                <span className="csr-category">{activity.category}</span>
                <h3>{activity.title}</h3>
                <p className="csr-activity-description">
                  {activity.description}
                </p>

                <div className="csr-activity-meta">
                  <span>
                    <CalendarDays size={15} />
                    {formatDate(activity.date)}
                  </span>
                  <span>
                    <MapPin size={15} />
                    {activity.location}
                  </span>
                </div>

                <div className="csr-progress-block">
                  <div className="csr-progress-heading">
                    <span>Volunteer participation</span>
                    <strong>
                      {activity.volunteers}/{activity.target}
                    </strong>
                  </div>
                  <div className="csr-progress-track">
                    <div style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <div className="csr-budget-block">
                  <div className="csr-budget-heading">
                    <span>Budget utilisation</span>
                    <strong>{budgetProgress}%</strong>
                  </div>
                  <div className="csr-progress-track">
                    <div style={{ width: `${budgetProgress}%` }} />
                  </div>
                  <small>
                    {formatCurrency(activity.spent)} of{" "}
                    {formatCurrency(activity.budget)}
                  </small>
                </div>

                <div className="csr-card-footer">
                  <div>
                    <span>Impact</span>
                    <strong>{activity.impact}</strong>
                  </div>

                  <button
                    onClick={() => setSelectedActivity(activity)}
                    aria-label={`View ${activity.title}`}
                  >
                    View Details
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </article>
            );
          })}

          {filteredActivities.length === 0 && (
            <div className="csr-empty">
              No activities found. Try changing your search or filters.
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <div
          className="csr-modal-backdrop"
          onClick={() => setShowForm(false)}
        >
          <div
            className="csr-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="csr-modal-heading">
              <div>
                <p className="eyebrow">CSR MANAGEMENT</p>
                <h2>Create New Activity</h2>
              </div>
              <button
                className="csr-close-btn"
                onClick={() => setShowForm(false)}
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateActivity}>
              <label>
                Activity Name
                <input
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="Enter activity name"
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Describe the activity and its goals"
                  rows={3}
                  required
                />
              </label>

              <div className="csr-form-row">
                <label>
                  Category
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                  >
                    <option>Environment</option>
                    <option>Education</option>
                    <option>Community</option>
                    <option>Healthcare</option>
                  </select>
                </label>

                <label>
                  Activity Date
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    required
                  />
                </label>
              </div>

              <label>
                Location
                <input
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  placeholder="Enter location"
                  required
                />
              </label>

              <div className="csr-form-row">
                <label>
                  Initial Volunteers
                  <input
                    type="number"
                    name="volunteers"
                    min="0"
                    value={form.volunteers}
                    onChange={handleFormChange}
                    required
                  />
                </label>

                <label>
                  Volunteer Target
                  <input
                    type="number"
                    name="target"
                    min="1"
                    value={form.target}
                    onChange={handleFormChange}
                    required
                  />
                </label>
              </div>

              <label>
                Budget (INR)
                <input
                  type="number"
                  name="budget"
                  min="0"
                  value={form.budget}
                  onChange={handleFormChange}
                  placeholder="Enter budget"
                  required
                />
              </label>

              <div className="csr-form-actions">
                <button
                  type="button"
                  className="csr-cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="csr-primary-btn">
                  Create Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedActivity && (
        <div
          className="csr-modal-backdrop"
          onClick={() => setSelectedActivity(null)}
        >
          <div
            className="csr-modal csr-detail-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="csr-modal-heading">
              <div>
                <p className="eyebrow">ACTIVITY DETAILS</p>
                <h2>{selectedActivity.title}</h2>
              </div>
              <button
                className="csr-close-btn"
                onClick={() => setSelectedActivity(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <p className="csr-detail-description">
              {selectedActivity.description}
            </p>

            <div className="csr-detail-grid">
              <div>
                <span>Category</span>
                <strong>{selectedActivity.category}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedActivity.status}</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>{formatDate(selectedActivity.date)}</strong>
              </div>
              <div>
                <span>Location</span>
                <strong>{selectedActivity.location}</strong>
              </div>
              <div>
                <span>Volunteers</span>
                <strong>
                  {selectedActivity.volunteers}/{selectedActivity.target}
                </strong>
              </div>
              <div>
                <span>Impact</span>
                <strong>{selectedActivity.impact}</strong>
              </div>
              <div>
                <span>Allocated Budget</span>
                <strong>{formatCurrency(selectedActivity.budget)}</strong>
              </div>
              <div>
                <span>Amount Spent</span>
                <strong>{formatCurrency(selectedActivity.spent)}</strong>
              </div>
            </div>

            <button
              className="csr-primary-btn csr-detail-done"
              onClick={() => setSelectedActivity(null)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}

      <style>{`
        .csr-page {
          display: flex;
          flex-direction: column;
          gap: 24px;
          color: var(--text-primary);
        }

        .csr-page .page-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }

        .csr-page .page-description {
          color: var(--text-secondary);
          max-width: 650px;
          margin-top: 8px;
        }

        .csr-heading-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        .csr-primary-btn,
        .csr-export-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 15px;
          border-radius: 9px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .csr-primary-btn {
          border: 1px solid var(--primary);
          background: var(--primary);
          color: #fff;
        }

        .csr-primary-btn:hover {
          background: var(--primary-dark);
        }

        .csr-export-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-primary);
        }

        .csr-export-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .csr-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .csr-stat-card {
          display: flex;
          align-items: center;
          gap: 13px;
          min-width: 0;
          padding: 19px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface);
        }

        .csr-stat-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          flex-shrink: 0;
        }

        .csr-stat-icon.green {
          color: #8EB69B;
          background: rgba(142,182,155,0.14);
        }

        .csr-stat-icon.blue {
          color: #60A5FA;
          background: rgba(96,165,250,0.14);
        }

        .csr-stat-icon.amber {
          color: #FBBF24;
          background: rgba(251,191,36,0.14);
        }

        .csr-stat-icon.purple {
          color: #C4B5FD;
          background: rgba(196,181,253,0.14);
        }

        .csr-stat-card p {
          color: var(--text-secondary);
          font-size: 12px;
          margin: 0 0 5px;
        }

        .csr-stat-card h2 {
          font-size: 24px;
          line-height: 1.2;
          margin: 0;
        }

        .csr-stat-card span {
          display: block;
          color: var(--text-muted);
          font-size: 10px;
          margin-top: 5px;
        }

        .csr-impact-banner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 20px;
          overflow: hidden;
          padding: 26px;
          border: 1px solid rgba(142,182,155,0.22);
          border-radius: 16px;
          background: linear-gradient(115deg, #163832, #235347);
          color: #DAF1DE;
        }

        .csr-impact-symbol {
          width: 52px;
          height: 52px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 14px;
          background: rgba(218,241,222,0.15);
        }

        .csr-impact-copy {
          position: relative;
          z-index: 1;
        }

        .csr-impact-copy > span {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.1px;
          color: #B9D8C2;
        }

        .csr-impact-copy h2 {
          margin: 7px 0;
          font-size: 21px;
        }

        .csr-impact-copy p {
          max-width: 570px;
          margin: 0;
          font-size: 12px;
          line-height: 1.6;
          color: #D0E3D5;
        }

        .csr-impact-decoration {
          position: absolute;
          right: 35px;
          bottom: -23px;
          color: rgba(218,241,222,0.1);
          transform: rotate(-25deg);
        }

        .csr-activities-section {
          padding: 22px;
          border: 1px solid var(--border);
          border-radius: 16px;
          background: var(--surface);
        }

        .csr-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 19px;
        }

        .csr-section-heading h2 {
          margin: 0;
          font-size: 17px;
        }

        .csr-section-heading p {
          margin: 6px 0 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .csr-record-count {
          color: var(--text-secondary);
          font-size: 12px;
          white-space: nowrap;
        }

        .csr-filters {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .csr-search,
        .csr-filters select {
          height: 40px;
          padding: 0 12px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-primary);
          font: inherit;
          font-size: 12px;
        }

        .csr-search {
          display: flex;
          align-items: center;
          gap: 9px;
          flex: 1;
          min-width: 220px;
          color: var(--text-secondary);
        }

        .csr-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font: inherit;
        }

        .csr-filters select {
          min-width: 145px;
          cursor: pointer;
        }

        .csr-filters option {
          background: var(--surface);
          color: var(--text-primary);
        }

        .csr-activity-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .csr-activity-card {
          min-width: 0;
          padding: 19px;
          border: 1px solid var(--border);
          border-radius: 13px;
          background: var(--surface);
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .csr-activity-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .csr-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .csr-activity-icon {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          color: var(--primary);
          background: var(--surface-secondary);
        }

        .csr-status {
          padding: 6px 9px;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 600;
        }

        .csr-category {
          color: var(--primary);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .csr-activity-card h3 {
          margin: 7px 0;
          font-size: 16px;
        }

        .csr-activity-description {
          min-height: 38px;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.6;
          margin: 0;
        }

        .csr-activity-meta {
          display: flex;
          flex-direction: column;
          gap: 9px;
          padding: 15px 0;
          margin-top: 10px;
          border-bottom: 1px solid var(--border);
        }

        .csr-activity-meta span {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 11px;
        }

        .csr-activity-meta svg {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .csr-progress-block,
        .csr-budget-block {
          margin-top: 15px;
        }

        .csr-progress-heading,
        .csr-budget-heading {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 8px;
          font-size: 11px;
        }

        .csr-progress-heading span,
        .csr-budget-heading span {
          color: var(--text-secondary);
        }

        .csr-progress-heading strong,
        .csr-budget-heading strong {
          color: var(--text-primary);
        }

        .csr-progress-track {
          height: 6px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--progress-bg);
        }

        .csr-progress-track > div {
          height: 100%;
          border-radius: inherit;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        .csr-budget-block small {
          display: block;
          margin-top: 7px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .csr-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: 18px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }

        .csr-card-footer span,
        .csr-card-footer strong {
          display: block;
        }

        .csr-card-footer span {
          color: var(--text-muted);
          font-size: 10px;
          margin-bottom: 4px;
        }

        .csr-card-footer strong {
          font-size: 11px;
          color: var(--text-primary);
        }

        .csr-card-footer button {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: transparent;
          color: var(--primary);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .csr-card-footer button:hover {
          background: var(--surface-secondary);
        }

        .csr-empty {
          grid-column: 1 / -1;
          padding: 40px;
          text-align: center;
          color: var(--text-muted);
          font-size: 13px;
        }

        .csr-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
        }

        .csr-modal {
          width: 100%;
          max-width: 560px;
          max-height: 88vh;
          overflow-y: auto;
          padding: 25px;
          border: 1px solid var(--border);
          border-radius: 17px;
          background: var(--surface);
          color: var(--text-primary);
          box-shadow: var(--shadow);
        }

        .csr-modal-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }

        .csr-modal-heading h2 {
          margin: 5px 0 0;
          font-size: 20px;
        }

        .csr-close-btn {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: transparent;
          color: var(--text-primary);
          cursor: pointer;
        }

        .csr-modal form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .csr-modal form label {
          display: flex;
          flex-direction: column;
          gap: 7px;
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
        }

        .csr-modal form input,
        .csr-modal form select,
        .csr-modal form textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 11px 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          outline: 0;
          background: var(--surface);
          color: var(--text-primary);
          font: inherit;
          font-size: 13px;
        }

        .csr-modal form input:focus,
        .csr-modal form select:focus,
        .csr-modal form textarea:focus {
          border-color: var(--primary);
        }

        .csr-modal form textarea {
          resize: vertical;
        }

        .csr-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .csr-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 5px;
        }

        .csr-cancel-btn {
          padding: 11px 16px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: transparent;
          color: var(--text-primary);
          font-weight: 600;
          cursor: pointer;
        }

        .csr-detail-description {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .csr-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          padding: 18px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .csr-detail-grid span,
        .csr-detail-grid strong {
          display: block;
        }

        .csr-detail-grid span {
          color: var(--text-muted);
          font-size: 11px;
          margin-bottom: 6px;
        }

        .csr-detail-grid strong {
          font-size: 12px;
        }

        .csr-detail-done {
          width: 100%;
          margin-top: 20px;
        }

        @media (max-width: 1100px) {
          .csr-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .csr-page .page-heading {
            flex-direction: column;
          }

          .csr-heading-actions {
            width: 100%;
          }

          .csr-heading-actions button {
            flex: 1;
          }

          .csr-activity-grid {
            grid-template-columns: 1fr;
          }

          .csr-impact-decoration {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .csr-stats-grid {
            grid-template-columns: 1fr;
          }

          .csr-activities-section {
            padding: 15px;
          }

          .csr-form-row,
          .csr-detail-grid {
            grid-template-columns: 1fr;
          }

          .csr-section-heading {
            align-items: flex-start;
          }

          .csr-modal {
            padding: 18px;
          }
        }
      `}</style>
    </div>
  );
}

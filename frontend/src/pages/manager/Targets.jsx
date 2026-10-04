
import { useMemo, useState } from "react";
import {
  Target,
  Plus,
  Leaf,
  Users,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  X,
  Search,
  ArrowUpRight,
  Flag,
} from "lucide-react";

const initialTargets = [
  {
    id: 1,
    title: "Reduce Carbon Emissions",
    description: "Reduce departmental carbon emissions through energy efficiency and sustainable operations.",
    category: "Environmental",
    baseline: 100,
    target: 70,
    actual: 78,
    unit: "tCO₂e",
    deadline: "2026-12-31",
    owner: "Aarav Sharma",
    status: "On Track",
  },
  {
    id: 2,
    title: "Increase Renewable Energy Usage",
    description: "Increase the share of renewable energy in departmental electricity consumption.",
    category: "Environmental",
    baseline: 20,
    target: 60,
    actual: 45,
    unit: "%",
    deadline: "2026-12-31",
    owner: "Rohan Verma",
    status: "At Risk",
  },
  {
    id: 3,
    title: "Improve Employee Participation",
    description: "Increase employee participation in sustainability and community initiatives.",
    category: "Social",
    baseline: 45,
    target: 85,
    actual: 72,
    unit: "%",
    deadline: "2026-11-30",
    owner: "Priya Mehta",
    status: "On Track",
  },
  {
    id: 4,
    title: "Employee Volunteer Hours",
    description: "Achieve the annual volunteering hours target across the department.",
    category: "Social",
    baseline: 200,
    target: 1000,
    actual: 680,
    unit: "hours",
    deadline: "2026-12-31",
    owner: "Sneha Joshi",
    status: "On Track",
  },
  {
    id: 5,
    title: "Complete Compliance Reviews",
    description: "Complete scheduled internal ESG compliance reviews and documentation.",
    category: "Governance",
    baseline: 50,
    target: 100,
    actual: 75,
    unit: "%",
    deadline: "2026-12-15",
    owner: "Ananya Singh",
    status: "At Risk",
  },
  {
    id: 6,
    title: "Improve ESG Reporting Accuracy",
    description: "Improve accuracy and completeness of submitted ESG data.",
    category: "Governance",
    baseline: 80,
    target: 98,
    actual: 96,
    unit: "%",
    deadline: "2026-12-31",
    owner: "Ishita Rao",
    status: "On Track",
  },
];

const categoryInfo = {
  Environmental: {
    icon: Leaf,
    color: "#4D875E",
    background: "#EAF2E7",
  },
  Social: {
    icon: Users,
    color: "#568C91",
    background: "#E5F1F0",
  },
  Governance: {
    icon: ShieldCheck,
    color: "#9A7C43",
    background: "#F5EFDF",
  },
};

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function getProgress(target) {
  if (!target.target) return 0;

  if (
    target.title.toLowerCase().includes("reduce") &&
    target.baseline > target.target
  ) {
    const reductionNeeded = target.baseline - target.target;
    const reductionAchieved = target.baseline - target.actual;

    return Math.max(
      0,
      Math.min(100, (reductionAchieved / reductionNeeded) * 100)
    );
  }

  const progress =
    ((target.actual - target.baseline) /
      (target.target - target.baseline)) *
    100;

  return Math.max(0, Math.min(100, progress));
}

function getAchievement(target) {
  if (
    target.title.toLowerCase().includes("reduce") &&
    target.baseline > target.target
  ) {
    return target.actual <= target.target;
  }

  return target.actual >= target.target;
}

function StatusBadge({ status }) {
  return (
    <span className={`target-status ${status.toLowerCase().replace(" ", "-")}`}>
      {status === "On Track" ? (
        <CheckCircle2 size={13} />
      ) : (
        <AlertTriangle size={13} />
      )}
      {status}
    </span>
  );
}

export default function Targets() {
  const [targets, setTargets] = useState(initialTargets);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Environmental",
    baseline: "",
    target: "",
    actual: "",
    unit: "%",
    deadline: "",
    owner: "",
  });

  const onTrackCount = targets.filter(
    (target) => target.status === "On Track"
  ).length;

  const atRiskCount = targets.filter(
    (target) => target.status === "At Risk"
  ).length;

  const achievedCount = targets.filter(getAchievement).length;

  const averageProgress = targets.length
    ? Math.round(
        targets.reduce((sum, target) => sum + getProgress(target), 0) /
          targets.length
      )
    : 0;

  const filteredTargets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return targets.filter((target) => {
      const matchesCategory =
        categoryFilter === "All" || target.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All" || target.status === statusFilter;

      const matchesSearch =
        !query ||
        target.title.toLowerCase().includes(query) ||
        target.owner.toLowerCase().includes(query) ||
        target.description.toLowerCase().includes(query);

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [targets, categoryFilter, statusFilter, search]);

  const handleCreateTarget = (event) => {
    event.preventDefault();

    const newTarget = {
      id: Date.now(),
      ...formData,
      baseline: Number(formData.baseline),
      target: Number(formData.target),
      actual: Number(formData.actual),
      status: "On Track",
    };

    setTargets((previous) => [newTarget, ...previous]);

    setFormData({
      title: "",
      description: "",
      category: "Environmental",
      baseline: "",
      target: "",
      actual: "",
      unit: "%",
      deadline: "",
      owner: "",
    });

    setShowForm(false);
  };

  const updateActual = (id, value) => {
    const actual = Number(value);

    setTargets((previous) =>
      previous.map((target) => {
        if (target.id !== id) return target;

        const updated = { ...target, actual };
        const progress = getProgress(updated);

        return {
          ...updated,
          status: progress >= 70 ? "On Track" : "At Risk",
        };
      })
    );
  };

  return (
    <div className="manager-targets-page">
      <style>{`
        .manager-targets-page {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding-bottom: 35px;
          color: var(--text-primary);
        }

        .targets-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .targets-eyebrow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 9px;
          color: var(--primary);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .targets-header h1 {
          margin: 0 0 8px;
          color: var(--text-primary);
          font-size: clamp(25px, 3vw, 32px);
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .targets-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
        }

        .targets-primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 42px;
          padding: 10px 16px;
          border: 1px solid var(--primary);
          border-radius: 10px;
          background: var(--primary);
          color: #fff;
          font-size: 12px;
          font-weight: 650;
          cursor: pointer;
          transition: 0.2s ease;
          white-space: nowrap;
        }

        .targets-primary-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
        }

        .targets-stats {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 24px;
        }

        .target-stat-card {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          min-width: 0;
          padding: 18px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 15px;
          box-shadow: var(--shadow);
        }

        .target-stat-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 12px;
        }

        .target-stat-card span {
          display: block;
          margin-bottom: 6px;
          color: var(--text-secondary);
          font-size: 11px;
        }

        .target-stat-card strong {
          display: block;
          color: var(--text-primary);
          font-size: 23px;
          font-weight: 750;
          letter-spacing: -0.6px;
        }

        .target-stat-card small {
          display: block;
          margin-top: 5px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .targets-summary {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
          gap: 15px;
          margin-bottom: 25px;
        }

        .targets-summary-card {
          padding: 21px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 15px;
          box-shadow: var(--shadow);
        }

        .targets-summary-card h2 {
          margin: 0 0 6px;
          color: var(--text-primary);
          font-size: 15px;
        }

        .targets-summary-card > p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 11px;
          line-height: 1.6;
        }

        .target-average {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 10px;
          margin-top: 22px;
        }

        .target-average strong {
          color: var(--primary);
          font-size: 34px;
          letter-spacing: -1px;
        }

        .target-average span {
          color: var(--text-secondary);
          font-size: 11px;
        }

        .target-progress-track {
          width: 100%;
          height: 10px;
          overflow: hidden;
          margin-top: 12px;
          border-radius: 20px;
          background: var(--progress-bg);
        }

        .target-progress-fill {
          height: 100%;
          border-radius: 20px;
          background: #6D9B70;
          transition: width 0.3s ease;
        }

        .target-category-list {
          display: flex;
          flex-direction: column;
          gap: 17px;
          margin-top: 18px;
        }

        .target-category-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .target-category-label {
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .target-category-label strong {
          color: var(--text-primary);
          font-size: 12px;
        }

        .target-category-row small {
          color: var(--text-secondary);
          font-size: 11px;
        }

        .target-category-icon {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 9px;
        }

        .targets-directory {
          overflow: hidden;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow);
        }

        .targets-directory-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 20px;
          border-bottom: 1px solid var(--border);
        }

        .targets-directory-header h2 {
          margin: 0 0 5px;
          color: var(--text-primary);
          font-size: 17px;
        }

        .targets-directory-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .targets-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
          padding: 15px 20px;
          border-bottom: 1px solid var(--border);
        }

        .targets-search {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 240px;
          height: 38px;
          padding: 0 11px;
          color: var(--text-muted);
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 9px;
        }

        .targets-search input {
          width: 100%;
          min-width: 0;
          height: 100%;
          padding: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font-size: 12px;
        }

        .targets-filter-select {
          height: 38px;
          padding: 0 11px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 12px;
          outline: 0;
        }

        .targets-result-count {
          margin-left: auto;
          color: var(--text-muted);
          font-size: 11px;
        }

        .target-card-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
          padding: 18px;
        }

        .target-card {
          min-width: 0;
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 13px;
          background: var(--surface);
          transition: 0.2s ease;
        }

        .target-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow);
          transform: translateY(-2px);
        }

        .target-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .target-card-title {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          min-width: 0;
        }

        .target-card-title h3 {
          margin: 0 0 6px;
          color: var(--text-primary);
          font-size: 13px;
          line-height: 1.5;
        }

        .target-card-title p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 10px;
          line-height: 1.6;
        }

        .target-card-category {
          display: inline-block;
          margin-top: 8px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .target-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
          padding: 5px 8px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          white-space: nowrap;
        }

        .target-status.on-track {
          background: #DDF2E5;
          color: #28694A;
        }

        .target-status.at-risk {
          background: #F8F0DF;
          color: #956B20;
        }

        .target-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
          margin: 20px 0 15px;
          padding: 13px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .target-metric span {
          display: block;
          margin-bottom: 6px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .target-metric strong {
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 700;
        }

        .target-progress-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .target-progress-heading span {
          color: var(--text-secondary);
          font-size: 10px;
        }

        .target-progress-heading strong {
          color: var(--primary);
          font-size: 12px;
        }

        .target-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 17px;
        }

        .target-owner,
        .target-deadline {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
          font-size: 10px;
        }

        .target-edit-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 7px 9px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--primary);
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
        }

        .target-edit-btn:hover {
          background: var(--surface-secondary);
        }

        .targets-empty {
          grid-column: 1 / -1;
          padding: 45px 20px;
          text-align: center;
          color: var(--text-secondary);
        }

        .targets-empty h3 {
          margin: 10px 0 5px;
          color: var(--text-primary);
          font-size: 15px;
        }

        .targets-empty p {
          margin: 0;
          font-size: 12px;
        }

        .target-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 500;
          display: grid;
          place-items: center;
          padding: 18px;
          background: rgba(14, 30, 19, 0.48);
        }

        .target-modal {
          width: min(100%, 490px);
          max-height: 90vh;
          overflow-y: auto;
          padding: 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: var(--shadow-lg);
        }

        .target-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
        }

        .target-modal-header h2 {
          margin: 0 0 6px;
          color: var(--text-primary);
          font-size: 19px;
        }

        .target-modal-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .target-close-btn {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-secondary);
          cursor: pointer;
        }

        .target-form-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 14px;
        }

        .target-form-field label {
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 650;
        }

        .target-form-field input,
        .target-form-field select,
        .target-form-field textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-primary);
          font-size: 12px;
        }

        .target-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .target-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
          margin-top: 20px;
        }

        .target-cancel-btn {
          padding: 10px 15px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 1100px) {
          .targets-stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 800px) {
          .targets-summary {
            grid-template-columns: 1fr;
          }

          .target-card-list {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .targets-header {
            flex-direction: column;
          }

          .targets-primary-btn {
            width: 100%;
          }

          .targets-stats {
            gap: 10px;
          }

          .target-stat-card {
            padding: 13px;
            gap: 9px;
          }

          .target-stat-icon {
            width: 36px;
            height: 36px;
          }

          .target-stat-card strong {
            font-size: 19px;
          }

          .targets-search {
            width: 100%;
          }

          .targets-result-count {
            width: 100%;
            margin-left: 0;
          }

          .target-card-list {
            padding: 12px;
          }

          .target-card {
            padding: 14px;
          }

          .target-card-top {
            flex-direction: column;
          }

          .target-form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }
      `}</style>

      <header className="targets-header">
        <div>
          <div className="targets-eyebrow">
            <Target size={14} />
            Manager Workspace / Targets
          </div>
          <h1>ESG Targets</h1>
          <p>
            Set measurable goals, monitor departmental performance, and
            stay aligned with your sustainability commitments.
          </p>
        </div>

        <button
          className="targets-primary-btn"
          onClick={() => setShowForm(true)}
        >
          <Plus size={16} />
          Add New Target
        </button>
      </header>

      <section className="targets-stats">
        <div className="target-stat-card">
          <div
            className="target-stat-icon"
            style={{ background: "#EAF0D9", color: "#3F6B43" }}
          >
            <Target size={21} />
          </div>
          <div>
            <span>Total Targets</span>
            <strong>{targets.length}</strong>
            <small>Across all ESG categories</small>
          </div>
        </div>

        <div className="target-stat-card">
          <div
            className="target-stat-icon"
            style={{ background: "#DDF2E5", color: "#28694A" }}
          >
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>On Track</span>
            <strong>{onTrackCount}</strong>
            <small>Progressing as planned</small>
          </div>
        </div>

        <div className="target-stat-card">
          <div
            className="target-stat-icon"
            style={{ background: "#F8F0DF", color: "#956B20" }}
          >
            <AlertTriangle size={21} />
          </div>
          <div>
            <span>At Risk</span>
            <strong>{atRiskCount}</strong>
            <small>Need closer monitoring</small>
          </div>
        </div>

        <div className="target-stat-card">
          <div
            className="target-stat-icon"
            style={{ background: "#E5F0F0", color: "#477B83" }}
          >
            <TrendingUp size={21} />
          </div>
          <div>
            <span>Average Progress</span>
            <strong>{averageProgress}%</strong>
            <small>Across all targets</small>
          </div>
        </div>
      </section>

      <section className="targets-summary">
        <div className="targets-summary-card">
          <h2>Overall Target Progress</h2>
          <p>
            Average completion of your department's ESG goals based on
            baseline and target values.
          </p>

          <div className="target-average">
            <strong>{averageProgress}%</strong>
            <span>{achievedCount} targets achieved</span>
          </div>

          <div className="target-progress-track">
            <div
              className="target-progress-fill"
              style={{ width: `${averageProgress}%` }}
            />
          </div>
        </div>

        <div className="targets-summary-card">
          <h2>Progress by ESG Category</h2>
          <p>Compare performance across the three pillars.</p>

          <div className="target-category-list">
            {["Environmental", "Social", "Governance"].map((category) => {
              const info = categoryInfo[category];
              const Icon = info.icon;
              const categoryTargets = targets.filter(
                (target) => target.category === category
              );

              const progress = categoryTargets.length
                ? Math.round(
                    categoryTargets.reduce(
                      (sum, target) => sum + getProgress(target),
                      0
                    ) / categoryTargets.length
                  )
                : 0;

              return (
                <div className="target-category-row" key={category}>
                  <div className="target-category-label">
                    <span
                      className="target-category-icon"
                      style={{
                        background: info.background,
                        color: info.color,
                      }}
                    >
                      <Icon size={16} />
                    </span>
                    <strong>{category}</strong>
                  </div>
                  <small>{progress}%</small>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="targets-directory">
        <div className="targets-directory-header">
          <div>
            <h2>Departmental Targets</h2>
            <p>Track goal performance, owners, and deadlines.</p>
          </div>
        </div>

        <div className="targets-filters">
          <label className="targets-search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search targets or owners..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <select
            className="targets-filter-select"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter by ESG category"
          >
            <option value="All">All categories</option>
            <option value="Environmental">Environmental</option>
            <option value="Social">Social</option>
            <option value="Governance">Governance</option>
          </select>

          <select
            className="targets-filter-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="Filter by target status"
          >
            <option value="All">All statuses</option>
            <option value="On Track">On Track</option>
            <option value="At Risk">At Risk</option>
          </select>

          <span className="targets-result-count">
            Showing {filteredTargets.length} of {targets.length} targets
          </span>
        </div>

        <div className="target-card-list">
          {filteredTargets.length ? (
            filteredTargets.map((target) => {
              const info = categoryInfo[target.category];
              const Icon = info.icon;
              const progress = getProgress(target);

              return (
                <article className="target-card" key={target.id}>
                  <div className="target-card-top">
                    <div className="target-card-title">
                      <span
                        className="target-category-icon"
                        style={{
                          background: info.background,
                          color: info.color,
                          width: 38,
                          height: 38,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={19} />
                      </span>

                      <div>
                        <h3>{target.title}</h3>
                        <p>{target.description}</p>
                        <span className="target-card-category">
                          {target.category}
                        </span>
                      </div>
                    </div>

                    <StatusBadge status={target.status} />
                  </div>

                  <div className="target-metrics">
                    <div className="target-metric">
                      <span>Baseline</span>
                      <strong>
                        {target.baseline} {target.unit}
                      </strong>
                    </div>
                    <div className="target-metric">
                      <span>Target</span>
                      <strong>
                        {target.target} {target.unit}
                      </strong>
                    </div>
                    <div className="target-metric">
                      <span>Actual</span>
                      <strong>
                        {target.actual} {target.unit}
                      </strong>
                    </div>
                  </div>

                  <div className="target-progress-heading">
                    <span>Progress toward target</span>
                    <strong>{Math.round(progress)}%</strong>
                  </div>

                  <div className="target-progress-track">
                    <div
                      className="target-progress-fill"
                      style={{
                        width: `${progress}%`,
                        background:
                          target.status === "At Risk"
                            ? "#C69A43"
                            : "#6D9B70",
                      }}
                    />
                  </div>

                  <div className="target-card-footer">
                    <div className="target-owner">
                      <Users size={13} />
                      {target.owner}
                    </div>

                    <div className="target-deadline">
                      <CalendarDays size={13} />
                      {formatDate(target.deadline)}
                    </div>

                    <button
                      className="target-edit-btn"
                      onClick={() => {
                        const value = window.prompt(
                          `Enter the latest actual value for ${target.title}:`,
                          String(target.actual)
                        );

                        if (
                          value !== null &&
                          value.trim() !== "" &&
                          Number.isFinite(Number(value))
                        ) {
                          updateActual(target.id, value);
                        }
                      }}
                    >
                      Update actual <ArrowUpRight size={13} />
                    </button>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="targets-empty">
              <Flag size={28} />
              <h3>No targets found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </section>

      {showForm && (
        <div
          className="target-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowForm(false);
            }
          }}
        >
          <div
            className="target-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="target-create-title"
          >
            <div className="target-modal-header">
              <div>
                <h2 id="target-create-title">Create ESG Target</h2>
                <p>Define a measurable departmental goal.</p>
              </div>

              <button
                type="button"
                className="target-close-btn"
                aria-label="Close form"
                onClick={() => setShowForm(false)}
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleCreateTarget}>
              <div className="target-form-field">
                <label htmlFor="target-title">Target title *</label>
                <input
                  id="target-title"
                  required
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      title: event.target.value,
                    })
                  }
                  placeholder="Enter target title"
                />
              </div>

              <div className="target-form-field">
                <label htmlFor="target-description">Description</label>
                <textarea
                  id="target-description"
                  rows={3}
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                  placeholder="Describe the goal"
                />
              </div>

              <div className="target-form-field">
                <label htmlFor="target-category">ESG category *</label>
                <select
                  id="target-category"
                  value={formData.category}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      category: event.target.value,
                    })
                  }
                >
                  <option>Environmental</option>
                  <option>Social</option>
                  <option>Governance</option>
                </select>
              </div>

              <div className="target-form-row">
                <div className="target-form-field">
                  <label htmlFor="target-baseline">Baseline value *</label>
                  <input
                    id="target-baseline"
                    type="number"
                    step="any"
                    required
                    value={formData.baseline}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        baseline: event.target.value,
                      })
                    }
                    placeholder="e.g. 50"
                  />
                </div>

                <div className="target-form-field">
                  <label htmlFor="target-goal">Target value *</label>
                  <input
                    id="target-goal"
                    type="number"
                    step="any"
                    required
                    value={formData.target}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        target: event.target.value,
                      })
                    }
                    placeholder="e.g. 100"
                  />
                </div>
              </div>

              <div className="target-form-row">
                <div className="target-form-field">
                  <label htmlFor="target-actual">Current actual *</label>
                  <input
                    id="target-actual"
                    type="number"
                    step="any"
                    required
                    value={formData.actual}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        actual: event.target.value,
                      })
                    }
                    placeholder="e.g. 65"
                  />
                </div>

                <div className="target-form-field">
                  <label htmlFor="target-unit">Unit *</label>
                  <select
                    id="target-unit"
                    value={formData.unit}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        unit: event.target.value,
                      })
                    }
                  >
                    <option value="%">Percentage (%)</option>
                    <option value="tCO₂e">tCO₂e</option>
                    <option value="hours">Hours</option>
                    <option value="units">Units</option>
                    <option value="count">Count</option>
                  </select>
                </div>
              </div>

              <div className="target-form-field">
                <label htmlFor="target-owner">Responsible owner *</label>
                <input
                  id="target-owner"
                  required
                  value={formData.owner}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      owner: event.target.value,
                    })
                  }
                  placeholder="Enter owner name"
                />
              </div>

              <div className="target-form-field">
                <label htmlFor="target-deadline">Deadline *</label>
                <input
                  id="target-deadline"
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      deadline: event.target.value,
                    })
                  }
                />
              </div>

              <div className="target-form-actions">
                <button
                  type="button"
                  className="target-cancel-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="targets-primary-btn">
                  Create Target
                  <Plus size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

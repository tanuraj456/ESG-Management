
import { useMemo, useState } from "react";
import {
  ShieldCheck,
  FileCheck,
  Clock,
  AlertTriangle,
  Search,
  CalendarDays,
  Download,
  Eye,
  CheckCircle2,
  X,
  Building2,
  Leaf,
  Users,
  Scale,
  ClipboardCheck,
  ArrowUpRight,
} from "lucide-react";

const initialCompliance = [
  {
    id: 1,
    title: "Environmental Impact Assessment",
    category: "Environmental",
    description:
      "Review and document the environmental impact of departmental operations.",
    regulation: "Environmental Protection Requirements",
    owner: "Aarav Sharma",
    dueDate: "2026-10-15",
    status: "In Review",
    priority: "High",
    documents: 3,
    progress: 75,
    icon: Leaf,
  },
  {
    id: 2,
    title: "Workplace Health & Safety Audit",
    category: "Social",
    description:
      "Verify employee safety practices, workplace conditions, and safety documentation.",
    regulation: "Occupational Health & Safety",
    owner: "Priya Mehta",
    dueDate: "2026-10-10",
    status: "Pending",
    priority: "Critical",
    documents: 1,
    progress: 30,
    icon: Users,
  },
  {
    id: 3,
    title: "ESG Data Disclosure",
    category: "Governance",
    description:
      "Compile accurate ESG performance data for internal reporting and disclosures.",
    regulation: "ESG Reporting Framework",
    owner: "Nandani Sankhla",
    dueDate: "2026-10-20",
    status: "Completed",
    priority: "High",
    documents: 5,
    progress: 100,
    icon: FileCheck,
  },
  {
    id: 4,
    title: "Waste Management Documentation",
    category: "Environmental",
    description:
      "Maintain records of waste segregation, disposal, and recycling activities.",
    regulation: "Waste Management Guidelines",
    owner: "Rohan Verma",
    dueDate: "2026-10-25",
    status: "In Progress",
    priority: "Medium",
    documents: 2,
    progress: 60,
    icon: Leaf,
  },
  {
    id: 5,
    title: "Employee Diversity & Inclusion Review",
    category: "Social",
    description:
      "Review workforce diversity metrics and inclusion-related initiatives.",
    regulation: "Workplace Inclusion Policy",
    owner: "Priya Mehta",
    dueDate: "2026-11-05",
    status: "Pending",
    priority: "Medium",
    documents: 0,
    progress: 0,
    icon: Users,
  },
  {
    id: 6,
    title: "Ethics & Anti-Corruption Declaration",
    category: "Governance",
    description:
      "Collect declarations and verify adherence to organisational ethics policies.",
    regulation: "Code of Conduct",
    owner: "Aarav Sharma",
    dueDate: "2026-09-25",
    status: "Overdue",
    priority: "Critical",
    documents: 1,
    progress: 40,
    icon: Scale,
  },
];

const statusStyles = {
  Completed: {
    color: "#8EB69B",
    background: "rgba(142,182,155,0.15)",
  },
  "In Progress": {
    color: "#60A5FA",
    background: "rgba(96,165,250,0.13)",
  },
  "In Review": {
    color: "#C4B5FD",
    background: "rgba(196,181,253,0.14)",
  },
  Pending: {
    color: "#FBBF24",
    background: "rgba(251,191,36,0.13)",
  },
  Overdue: {
    color: "#F87171",
    background: "rgba(248,113,113,0.13)",
  },
};

const priorityStyles = {
  Critical: "#F87171",
  High: "#FB923C",
  Medium: "#FBBF24",
  Low: "#8EB69B",
};

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function Compliance() {
  const [requirements, setRequirements] = useState(initialCompliance);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const stats = useMemo(() => {
    const total = requirements.length;

    const completed = requirements.filter(
      (item) => item.status === "Completed"
    ).length;

    const overdue = requirements.filter(
      (item) => item.status === "Overdue"
    ).length;

    const pending = requirements.filter(
      (item) =>
        item.status === "Pending" ||
        item.status === "In Progress" ||
        item.status === "In Review"
    ).length;

    const averageProgress =
      total > 0
        ? Math.round(
            requirements.reduce(
              (sum, item) => sum + item.progress,
              0
            ) / total
          )
        : 0;

    return {
      total,
      completed,
      overdue,
      pending,
      averageProgress,
    };
  }, [requirements]);

  const filteredRequirements = requirements.filter((item) => {
    const query = search.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.owner.toLowerCase().includes(query) ||
      item.regulation.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const updateStatus = (id, status) => {
    setRequirements((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              progress: status === "Completed" ? 100 : item.progress,
            }
          : item
      )
    );

    setSelectedItem((previous) =>
      previous?.id === id
        ? {
            ...previous,
            status,
            progress: status === "Completed" ? 100 : previous.progress,
          }
        : previous
    );
  };

  const exportCompliance = () => {
    const headers = [
      "Requirement",
      "Category",
      "Regulation",
      "Owner",
      "Due Date",
      "Status",
      "Priority",
      "Progress",
      "Documents",
    ];

    const rows = filteredRequirements.map((item) => [
      item.title,
      item.category,
      item.regulation,
      item.owner,
      item.dueDate,
      item.status,
      item.priority,
      `${item.progress}%`,
      item.documents,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "ecospher-compliance-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard-page compliance-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MANAGER WORKSPACE / COMPLIANCE</p>
          <h1>Compliance Management</h1>
          <p className="page-description">
            Monitor ESG obligations, track documentation, and ensure your
            department stays aligned with organisational policies.
          </p>
        </div>

        <button
          className="compliance-export-btn"
          onClick={exportCompliance}
        >
          <Download size={17} />
          Export Report
        </button>
      </div>

      <section className="compliance-stats-grid">
        <div className="compliance-stat-card">
          <div className="compliance-stat-icon green">
            <ShieldCheck size={21} />
          </div>
          <div>
            <p>Total Requirements</p>
            <h2>{stats.total}</h2>
            <span>Tracked obligations</span>
          </div>
        </div>

        <div className="compliance-stat-card">
          <div className="compliance-stat-icon blue">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <p>Completed</p>
            <h2>{stats.completed}</h2>
            <span>Successfully fulfilled</span>
          </div>
        </div>

        <div className="compliance-stat-card">
          <div className="compliance-stat-icon amber">
            <Clock size={21} />
          </div>
          <div>
            <p>Pending Review</p>
            <h2>{stats.pending}</h2>
            <span>Require attention</span>
          </div>
        </div>

        <div className="compliance-stat-card">
          <div className="compliance-stat-icon red">
            <AlertTriangle size={21} />
          </div>
          <div>
            <p>Overdue</p>
            <h2>{stats.overdue}</h2>
            <span>Past due date</span>
          </div>
        </div>
      </section>

      <section className="compliance-overview">
        <div className="compliance-overview-main">
          <div className="compliance-overview-icon">
            <ClipboardCheck size={24} />
          </div>

          <div>
            <span>OVERALL COMPLIANCE PROGRESS</span>
            <h2>{stats.averageProgress}%</h2>
            <p>
              Average completion across all tracked compliance requirements.
            </p>
          </div>
        </div>

        <div className="compliance-overview-progress">
          <div className="compliance-progress-heading">
            <span>Completion progress</span>
            <strong>{stats.averageProgress}%</strong>
          </div>
          <div className="compliance-progress-track">
            <div style={{ width: `${stats.averageProgress}%` }} />
          </div>
          <small>
            {stats.completed} of {stats.total} requirements completed
          </small>
        </div>
      </section>

      <section className="compliance-alert">
        <div className="compliance-alert-icon">
          <AlertTriangle size={20} />
        </div>
        <div>
          <h3>Attention Required</h3>
          <p>
            {stats.overdue > 0
              ? `${stats.overdue} compliance requirement(s) are overdue. Review their status and follow up with the assigned owners.`
              : "There are no overdue compliance requirements. Keep monitoring upcoming deadlines."}
          </p>
        </div>
      </section>

      <section className="compliance-directory">
        <div className="compliance-section-heading">
          <div>
            <h2>Compliance Register</h2>
            <p>
              Review requirements, responsible owners, documentation, and
              deadlines.
            </p>
          </div>

          <span className="compliance-count">
            {filteredRequirements.length} records
          </span>
        </div>

        <div className="compliance-filters">
          <div className="compliance-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search requirements, owners..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All statuses</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="In Review">In Review</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
          >
            <option value="All">All categories</option>
            <option value="Environmental">Environmental</option>
            <option value="Social">Social</option>
            <option value="Governance">Governance</option>
          </select>
        </div>

        <div className="compliance-table-wrapper">
          <table className="compliance-table">
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredRequirements.map((item) => {
                const Icon = item.icon;
                const statusStyle = statusStyles[item.status];

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="compliance-requirement-cell">
                        <div className="compliance-row-icon">
                          <Icon size={17} />
                        </div>
                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.regulation}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="compliance-category">
                        {item.category}
                      </span>
                    </td>

                    <td>
                      <span className="compliance-owner">{item.owner}</span>
                    </td>

                    <td>
                      <span className="compliance-date">
                        <CalendarDays size={14} />
                        {formatDate(item.dueDate)}
                      </span>
                    </td>

                    <td>
                      <span
                        className="compliance-priority"
                        style={{ color: priorityStyles[item.priority] }}
                      >
                        <span
                          style={{
                            background: priorityStyles[item.priority],
                          }}
                        />
                        {item.priority}
                      </span>
                    </td>

                    <td>
                      <span
                        className="compliance-status"
                        style={{
                          color: statusStyle.color,
                          background: statusStyle.background,
                        }}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="compliance-table-progress">
                        <div className="compliance-progress-track">
                          <div
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span>{item.progress}%</span>
                      </div>
                    </td>

                    <td>
                      <button
                        className="compliance-view-btn"
                        onClick={() => setSelectedItem(item)}
                        aria-label={`View ${item.title}`}
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {filteredRequirements.length === 0 && (
                <tr>
                  <td colSpan="8" className="compliance-empty">
                    No compliance requirements found. Try adjusting your
                    filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedItem && (
        <div
          className="compliance-modal-backdrop"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="compliance-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="compliance-modal-heading">
              <div>
                <p className="eyebrow">COMPLIANCE REQUIREMENT</p>
                <h2>{selectedItem.title}</h2>
              </div>

              <button
                className="compliance-close-btn"
                onClick={() => setSelectedItem(null)}
                aria-label="Close details"
              >
                <X size={20} />
              </button>
            </div>

            <p className="compliance-detail-description">
              {selectedItem.description}
            </p>

            <div className="compliance-detail-grid">
              <div>
                <span>Category</span>
                <strong>{selectedItem.category}</strong>
              </div>
              <div>
                <span>Regulation / Policy</span>
                <strong>{selectedItem.regulation}</strong>
              </div>
              <div>
                <span>Responsible Owner</span>
                <strong>{selectedItem.owner}</strong>
              </div>
              <div>
                <span>Due Date</span>
                <strong>{formatDate(selectedItem.dueDate)}</strong>
              </div>
              <div>
                <span>Priority</span>
                <strong>{selectedItem.priority}</strong>
              </div>
              <div>
                <span>Documents Attached</span>
                <strong>{selectedItem.documents} documents</strong>
              </div>
              <div>
                <span>Current Status</span>
                <strong>{selectedItem.status}</strong>
              </div>
              <div>
                <span>Completion</span>
                <strong>{selectedItem.progress}%</strong>
              </div>
            </div>

            <div className="compliance-modal-progress">
              <div className="compliance-progress-heading">
                <span>Requirement progress</span>
                <strong>{selectedItem.progress}%</strong>
              </div>
              <div className="compliance-progress-track">
                <div
                  style={{ width: `${selectedItem.progress}%` }}
                />
              </div>
            </div>

            <div className="compliance-modal-actions">
              {selectedItem.status !== "Completed" && (
                <button
                  className="compliance-complete-btn"
                  onClick={() =>
                    updateStatus(selectedItem.id, "Completed")
                  }
                >
                  <CheckCircle2 size={16} />
                  Mark as Completed
                </button>
              )}

              <button
                className="compliance-cancel-btn"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .compliance-page {
          display: flex;
          flex-direction: column;
          gap: 23px;
          color: var(--text-primary);
        }

        .compliance-page .page-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }

        .compliance-page .page-description {
          max-width: 650px;
          margin-top: 8px;
          color: var(--text-secondary);
        }

        .compliance-export-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 15px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-primary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .compliance-export-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .compliance-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .compliance-stat-card {
          display: flex;
          align-items: center;
          gap: 13px;
          min-width: 0;
          padding: 19px;
          border: 1px solid var(--border);
          border-radius: 14px;
          background: var(--surface);
        }

        .compliance-stat-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 11px;
        }

        .compliance-stat-icon.green {
          color: #8EB69B;
          background: rgba(142,182,155,0.14);
        }

        .compliance-stat-icon.blue {
          color: #60A5FA;
          background: rgba(96,165,250,0.14);
        }

        .compliance-stat-icon.amber {
          color: #FBBF24;
          background: rgba(251,191,36,0.14);
        }

        .compliance-stat-icon.red {
          color: #F87171;
          background: rgba(248,113,113,0.14);
        }

        .compliance-stat-card p {
          margin: 0 0 5px;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .compliance-stat-card h2 {
          margin: 0;
          font-size: 25px;
          line-height: 1.2;
        }

        .compliance-stat-card span {
          display: block;
          margin-top: 5px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .compliance-overview {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 25px;
          padding: 24px;
          border: 1px solid rgba(142,182,155,0.25);
          border-radius: 15px;
          background: linear-gradient(115deg, #163832, #235347);
          color: #DAF1DE;
        }

        .compliance-overview-main {
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .compliance-overview-icon {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 13px;
          background: rgba(218,241,222,0.14);
        }

        .compliance-overview-main span {
          color: #B9D8C2;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .compliance-overview-main h2 {
          margin: 5px 0;
          font-size: 29px;
        }

        .compliance-overview-main p {
          margin: 0;
          color: #D0E3D5;
          font-size: 11px;
          line-height: 1.6;
        }

        .compliance-overview-progress {
          padding-left: 22px;
          border-left: 1px solid rgba(218,241,222,0.2);
        }

        .compliance-progress-heading {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 9px;
          font-size: 11px;
        }

        .compliance-progress-track {
          height: 7px;
          overflow: hidden;
          border-radius: 20px;
          background: var(--progress-bg);
        }

        .compliance-progress-track > div {
          height: 100%;
          border-radius: inherit;
          background: var(--primary);
          transition: width 0.3s ease;
        }

        .compliance-overview .compliance-progress-track {
          background: rgba(218,241,222,0.2);
        }

        .compliance-overview .compliance-progress-track > div {
          background: #DAF1DE;
        }

        .compliance-overview-progress small {
          display: block;
          margin-top: 9px;
          color: #C6DCCB;
          font-size: 10px;
        }

        .compliance-alert {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          padding: 16px 18px;
          border: 1px solid rgba(248,113,113,0.22);
          border-radius: 12px;
          background: rgba(248,113,113,0.07);
        }

        .compliance-alert-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          color: #F87171;
        }

        .compliance-alert h3 {
          margin: 0 0 5px;
          color: #F87171;
          font-size: 13px;
        }

        .compliance-alert p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 12px;
          line-height: 1.6;
        }

        .compliance-directory {
          min-width: 0;
          padding: 22px;
          border: 1px solid var(--border);
          border-radius: 16px;
          background: var(--surface);
        }

        .compliance-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 19px;
        }

        .compliance-section-heading h2 {
          margin: 0;
          font-size: 17px;
        }

        .compliance-section-heading p {
          margin: 6px 0 0;
          color: var(--text-secondary);
          font-size: 12px;
        }

        .compliance-count {
          color: var(--text-secondary);
          font-size: 12px;
          white-space: nowrap;
        }

        .compliance-filters {
          display: flex;
          gap: 10px;
          margin-bottom: 17px;
          flex-wrap: wrap;
        }

        .compliance-search,
        .compliance-filters select {
          height: 40px;
          padding: 0 12px;
          border: 1px solid var(--border);
          border-radius: 9px;
          background: var(--surface);
          color: var(--text-primary);
          font: inherit;
          font-size: 12px;
        }

        .compliance-search {
          display: flex;
          align-items: center;
          flex: 1;
          min-width: 220px;
          gap: 9px;
          color: var(--text-secondary);
        }

        .compliance-search input {
          width: 100%;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font: inherit;
        }

        .compliance-filters select {
          min-width: 145px;
          cursor: pointer;
        }

        .compliance-filters option {
          background: var(--surface);
          color: var(--text-primary);
        }

        .compliance-table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .compliance-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .compliance-table th {
          padding: 13px 12px;
          border-bottom: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .compliance-table td {
          padding: 15px 12px;
          border-bottom: 1px solid var(--border);
          font-size: 11px;
        }

        .compliance-table tbody tr:last-child td {
          border-bottom: 0;
        }

        .compliance-requirement-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 210px;
          white-space: normal;
        }

        .compliance-row-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          border-radius: 9px;
          background: var(--surface-secondary);
          color: var(--primary);
        }

        .compliance-requirement-cell strong,
        .compliance-requirement-cell span {
          display: block;
        }

        .compliance-requirement-cell strong {
          max-width: 230px;
          color: var(--text-primary);
          font-size: 11px;
          line-height: 1.5;
        }

        .compliance-requirement-cell span {
          margin-top: 4px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .compliance-category,
        .compliance-owner {
          color: var(--text-secondary);
        }

        .compliance-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-secondary);
        }

        .compliance-priority {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
        }

        .compliance-priority > span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .compliance-status {
          display: inline-block;
          padding: 6px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 600;
        }

        .compliance-table-progress {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 90px;
        }

        .compliance-table-progress .compliance-progress-track {
          width: 60px;
          height: 5px;
        }

        .compliance-table-progress span {
          color: var(--text-secondary);
          font-size: 10px;
        }

        .compliance-view-btn {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: transparent;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .compliance-view-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .compliance-empty {
          padding: 35px !important;
          text-align: center;
          color: var(--text-muted);
        }

        .compliance-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,0.65);
          backdrop-filter: blur(4px);
        }

        .compliance-modal {
          width: 100%;
          max-width: 570px;
          max-height: 88vh;
          overflow-y: auto;
          padding: 25px;
          border: 1px solid var(--border);
          border-radius: 17px;
          background: var(--surface);
          color: var(--text-primary);
          box-shadow: var(--shadow);
        }

        .compliance-modal-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 18px;
        }

        .compliance-modal-heading h2 {
          margin: 5px 0 0;
          font-size: 19px;
        }

        .compliance-close-btn {
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

        .compliance-detail-description {
          margin-bottom: 20px;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
        }

        .compliance-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          padding: 18px 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .compliance-detail-grid span,
        .compliance-detail-grid strong {
          display: block;
        }

        .compliance-detail-grid span {
          margin-bottom: 6px;
          color: var(--text-muted);
          font-size: 11px;
        }

        .compliance-detail-grid strong {
          font-size: 12px;
        }

        .compliance-modal-progress {
          margin-top: 20px;
        }

        .compliance-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 22px;
        }

        .compliance-complete-btn,
        .compliance-cancel-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .compliance-complete-btn {
          border: 1px solid var(--primary);
          background: var(--primary);
          color: #fff;
        }

        .compliance-cancel-btn {
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-primary);
        }

        @media (max-width: 1100px) {
          .compliance-stats-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .compliance-page .page-heading {
            flex-direction: column;
          }

          .compliance-overview {
            grid-template-columns: 1fr;
          }

          .compliance-overview-progress {
            padding: 18px 0 0;
            border-left: 0;
            border-top: 1px solid rgba(218,241,222,0.2);
          }
        }

        @media (max-width: 480px) {
          .compliance-stats-grid {
            grid-template-columns: 1fr;
          }

          .compliance-directory {
            padding: 15px;
          }

          .compliance-detail-grid {
            grid-template-columns: 1fr;
          }

          .compliance-modal {
            padding: 18px;
          }
        }
      `}</style>
    </div>
  );
}

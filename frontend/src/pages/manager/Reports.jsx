
import { useMemo, useState } from "react";
import {
  FileBarChart,
  Download,
  CalendarDays,
  Leaf,
  Users,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  FileText,
  CheckCircle2,
  Clock3,
  Search,
  Eye,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";

const reportData = [
  {
    id: 1,
    name: "Q3 2026 ESG Performance Report",
    type: "Quarterly",
    category: "All Categories",
    period: "Jul – Sep 2026",
    generated: "2026-10-02",
    status: "Ready",
    owner: "Nandani Sankhla",
  },
  {
    id: 2,
    name: "Environmental Impact Summary",
    type: "Monthly",
    category: "Environmental",
    period: "September 2026",
    generated: "2026-10-01",
    status: "Ready",
    owner: "Aarav Sharma",
  },
  {
    id: 3,
    name: "Employee Engagement Report",
    type: "Monthly",
    category: "Social",
    period: "September 2026",
    generated: "2026-09-30",
    status: "Ready",
    owner: "Priya Mehta",
  },
  {
    id: 4,
    name: "Governance & Compliance Review",
    type: "Quarterly",
    category: "Governance",
    period: "Q3 2026",
    generated: "2026-09-28",
    status: "Ready",
    owner: "Ananya Singh",
  },
  {
    id: 5,
    name: "Annual Sustainability Report",
    type: "Annual",
    category: "All Categories",
    period: "FY 2026",
    generated: "2026-09-25",
    status: "In Progress",
    owner: "Nandani Sankhla",
  },
];

const categoryData = [
  {
    name: "Environmental",
    score: 78,
    change: 8,
    icon: Leaf,
    color: "#4D875E",
    background: "#EAF2E7",
    description: "Emissions, energy, and resource efficiency",
  },
  {
    name: "Social",
    score: 70,
    change: 5,
    icon: Users,
    color: "#568C91",
    background: "#E5F1F0",
    description: "Employee engagement and community impact",
  },
  {
    name: "Governance",
    score: 85,
    change: 12,
    icon: ShieldCheck,
    color: "#9A7C43",
    background: "#F5EFDF",
    description: "Compliance, transparency, and accountability",
  },
];

const monthlyData = [
  { month: "Apr", environmental: 58, social: 52, governance: 68 },
  { month: "May", environmental: 62, social: 55, governance: 70 },
  { month: "Jun", environmental: 65, social: 59, governance: 73 },
  { month: "Jul", environmental: 69, social: 62, governance: 76 },
  { month: "Aug", environmental: 73, social: 66, governance: 80 },
  { month: "Sep", environmental: 78, social: 70, governance: 85 },
];

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function Reports() {
  const [reports, setReports] = useState(reportData);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [period, setPeriod] = useState("6");

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !query ||
        report.name.toLowerCase().includes(query) ||
        report.owner.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || report.type === typeFilter;

      const matchesCategory =
        categoryFilter === "All" ||
        report.category === categoryFilter ||
        report.category === "All Categories";

      return matchesSearch && matchesType && matchesCategory;
    });
  }, [reports, search, typeFilter, categoryFilter]);

  const handleGenerateReport = () => {
    const newReport = {
      id: Date.now(),
      name: `ESG Performance Report ${new Date().toLocaleDateString("en-IN")}`,
      type: "Monthly",
      category: "All Categories",
      period: "Current Period",
      generated: new Date().toISOString().slice(0, 10),
      status: "Ready",
      owner: "Manager",
    };

    setReports((previous) => [newReport, ...previous]);
    window.alert(
      "A demo report entry has been created. PDF generation will be connected in a future backend integration."
    );
  };

  const handleDownload = (report) => {
    const content = [
      "ECOSPHERE ESG MANAGEMENT PLATFORM",
      report.name,
      `Report Type: ${report.type}`,
      `Category: ${report.category}`,
      `Period: ${report.period}`,
      `Generated: ${formatDate(report.generated)}`,
      `Prepared By: ${report.owner}`,
      "",
      "DEPARTMENT ESG SUMMARY",
      "Environmental Score: 78%",
      "Social Score: 70%",
      "Governance Score: 85%",
      "Overall ESG Score: 78%",
      "",
      "Note: This is a frontend demo report using sample data.",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${report.name.replace(/[^a-z0-9]/gi, "_")}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const overallScore = Math.round(
    categoryData.reduce((sum, item) => sum + item.score, 0) /
      categoryData.length
  );

  const selectedMonths = Number(period);
  const chartData = monthlyData.slice(-selectedMonths);

  return (
    <div className="manager-reports-page">
      <style>{`
        .manager-reports-page {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding-bottom: 35px;
          color: var(--text-primary);
        }

        .reports-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .reports-eyebrow {
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

        .reports-header h1 {
          margin: 0 0 8px;
          color: var(--text-primary);
          font-size: clamp(25px, 3vw, 32px);
          font-weight: 750;
          letter-spacing: -0.8px;
        }

        .reports-header p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
        }

        .reports-primary-btn {
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

        .reports-primary-btn:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
        }

        .reports-overview {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
          margin-bottom: 22px;
        }

        .reports-stat {
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

        .reports-stat-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          border-radius: 12px;
        }

        .reports-stat span {
          display: block;
          margin-bottom: 6px;
          color: var(--text-secondary);
          font-size: 11px;
        }

        .reports-stat strong {
          display: block;
          color: var(--text-primary);
          font-size: 23px;
          font-weight: 750;
          letter-spacing: -0.6px;
        }

        .reports-stat small {
          display: block;
          margin-top: 5px;
          color: var(--text-muted);
          font-size: 10px;
        }

        .reports-section {
          margin-bottom: 22px;
          padding: 21px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: var(--shadow);
        }

        .reports-section-heading {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 20px;
        }

        .reports-section-heading h2 {
          margin: 0 0 6px;
          color: var(--text-primary);
          font-size: 16px;
        }

        .reports-section-heading p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 11px;
          line-height: 1.6;
        }

        .reports-period-select {
          height: 36px;
          padding: 0 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-secondary);
          font-size: 11px;
          outline: 0;
        }

        .reports-category-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .reports-category-card {
          padding: 17px;
          border: 1px solid var(--border);
          border-radius: 13px;
          background: var(--surface);
        }

        .reports-category-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 17px;
        }

        .reports-category-icon {
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border-radius: 11px;
        }

        .reports-category-card h3 {
          margin: 0 0 5px;
          color: var(--text-primary);
          font-size: 13px;
        }

        .reports-category-card p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 10px;
          line-height: 1.5;
        }

        .reports-category-score {
          color: var(--text-primary);
          font-size: 25px;
          font-weight: 750;
          letter-spacing: -0.7px;
        }

        .reports-category-change {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #4D875E;
          font-size: 10px;
          font-weight: 650;
        }

        .reports-progress-track {
          width: 100%;
          height: 8px;
          overflow: hidden;
          margin-top: 12px;
          border-radius: 20px;
          background: var(--progress-bg);
        }

        .reports-progress-fill {
          height: 100%;
          border-radius: 20px;
          transition: width 0.3s ease;
        }

        .reports-chart-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.6fr) minmax(220px, 1fr);
          gap: 25px;
          align-items: center;
        }

        .reports-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          gap: 13px;
          height: 220px;
          padding: 10px 5px 0;
          border-bottom: 1px solid var(--border);
        }

        .reports-chart-column {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
          gap: 8px;
        }

        .reports-chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: 4px;
          width: 100%;
          height: 190px;
        }

        .reports-chart-bar {
          width: min(22px, 30%);
          min-height: 3px;
          border-radius: 5px 5px 0 0;
          transition: height 0.3s ease;
        }

        .reports-chart-column small {
          color: var(--text-muted);
          font-size: 10px;
        }

        .reports-legend {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .reports-legend-item {
          display: flex;
          align-items: center;
          gap: 9px;
          color: var(--text-secondary);
          font-size: 11px;
        }

        .reports-legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .reports-legend-item strong {
          margin-left: auto;
          color: var(--text-primary);
          font-size: 12px;
        }

        .reports-table-wrap {
          overflow-x: auto;
        }

        .reports-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          white-space: nowrap;
        }

        .reports-table th {
          padding: 12px 14px;
          background: var(--surface-secondary);
          color: var(--text-secondary);
          font-size: 10px;
          font-weight: 700;
        }

        .reports-table td {
          padding: 14px;
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 11px;
        }

        .reports-table tr:last-child td {
          border-bottom: 0;
        }

        .reports-file-name {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
          font-weight: 650;
        }

        .reports-file-icon {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 9px;
          background: var(--surface-secondary);
          color: var(--primary);
        }

        .reports-status {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 8px;
          border-radius: 20px;
          background: #DDF2E5;
          color: #28694A;
          font-size: 10px;
          font-weight: 700;
        }

        .reports-status.pending {
          background: #F8F0DF;
          color: #956B20;
        }

        .reports-download-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 7px 10px;
          border: 1px solid var(--border);
          border-radius: 7px;
          background: var(--surface);
          color: var(--primary);
          font-size: 10px;
          font-weight: 650;
          cursor: pointer;
        }

        .reports-download-btn:hover {
          background: var(--surface-secondary);
        }

        .reports-filters {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 9px;
          margin-bottom: 15px;
        }

        .reports-search {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 240px;
          height: 36px;
          padding: 0 10px;
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text-muted);
        }

        .reports-search input {
          width: 100%;
          min-width: 0;
          border: 0;
          outline: 0;
          background: transparent;
          color: var(--text-primary);
          font-size: 11px;
        }

        .reports-empty {
          padding: 35px;
          text-align: center;
          color: var(--text-secondary);
          font-size: 12px;
        }

        @media (max-width: 1100px) {
          .reports-overview {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 800px) {
          .reports-category-grid {
            grid-template-columns: 1fr;
          }

          .reports-chart-layout {
            grid-template-columns: 1fr;
          }

          .reports-legend {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .reports-header {
            flex-direction: column;
          }

          .reports-primary-btn {
            width: 100%;
          }

          .reports-overview {
            gap: 10px;
          }

          .reports-stat {
            padding: 13px;
            gap: 9px;
          }

          .reports-stat-icon {
            width: 36px;
            height: 36px;
          }

          .reports-stat strong {
            font-size: 19px;
          }

          .reports-section {
            padding: 15px;
          }

          .reports-section-heading {
            flex-direction: column;
          }

          .reports-search {
            width: 100%;
          }

          .reports-filters select {
            flex: 1;
          }

          .reports-legend {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <header className="reports-header">
        <div>
          <div className="reports-eyebrow">
            <FileBarChart size={14} />
            Manager Workspace / Reports
          </div>
          <h1>ESG Reports & Analytics</h1>
          <p>
            Explore departmental ESG performance, monitor trends, and
            access sustainability reports in one place.
          </p>
        </div>

        <button
          className="reports-primary-btn"
          onClick={handleGenerateReport}
        >
          <FileText size={16} />
          Generate Report
        </button>
      </header>

      <section className="reports-overview">
        <div className="reports-stat">
          <div
            className="reports-stat-icon"
            style={{ background: "#EAF0D9", color: "#3F6B43" }}
          >
            <FileBarChart size={21} />
          </div>
          <div>
            <span>Total Reports</span>
            <strong>{reports.length}</strong>
            <small>Available in workspace</small>
          </div>
        </div>

        <div className="reports-stat">
          <div
            className="reports-stat-icon"
            style={{ background: "#DDF2E5", color: "#28694A" }}
          >
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Ready to Access</span>
            <strong>
              {reports.filter((report) => report.status === "Ready").length}
            </strong>
            <small>Completed reports</small>
          </div>
        </div>

        <div className="reports-stat">
          <div
            className="reports-stat-icon"
            style={{ background: "#F8F0DF", color: "#956B20" }}
          >
            <Clock3 size={21} />
          </div>
          <div>
            <span>In Progress</span>
            <strong>
              {
                reports.filter((report) => report.status === "In Progress")
                  .length
              }
            </strong>
            <small>Reports being prepared</small>
          </div>
        </div>

        <div className="reports-stat">
          <div
            className="reports-stat-icon"
            style={{ background: "#E5F0F0", color: "#477B83" }}
          >
            <Activity size={21} />
          </div>
          <div>
            <span>Overall ESG Score</span>
            <strong>{overallScore}%</strong>
            <small>Average across ESG pillars</small>
          </div>
        </div>
      </section>

      <section className="reports-section">
        <div className="reports-section-heading">
          <div>
            <h2>ESG Performance Overview</h2>
            <p>
              Current departmental performance across the three ESG pillars.
            </p>
          </div>
        </div>

        <div className="reports-category-grid">
          {categoryData.map((category) => {
            const Icon = category.icon;

            return (
              <article className="reports-category-card" key={category.name}>
                <div className="reports-category-top">
                  <span
                    className="reports-category-icon"
                    style={{
                      background: category.background,
                      color: category.color,
                    }}
                  >
                    <Icon size={19} />
                  </span>

                  <span className="reports-category-change">
                    <TrendingUp size={13} />
                    +{category.change}% this quarter
                  </span>
                </div>

                <h3>{category.name}</h3>
                <p>{category.description}</p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 5,
                    marginTop: 18,
                  }}
                >
                  <strong className="reports-category-score">
                    {category.score}%
                  </strong>
                  <span
                    style={{
                      color: "var(--text-muted)",
                      fontSize: 10,
                    }}
                  >
                    performance score
                  </span>
                </div>

                <div className="reports-progress-track">
                  <div
                    className="reports-progress-fill"
                    style={{
                      width: `${category.score}%`,
                      background: category.color,
                    }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="reports-section">
        <div className="reports-section-heading">
          <div>
            <h2>Performance Trends</h2>
            <p>
              Monthly ESG scores showing progress over the selected period.
            </p>
          </div>

          <select
            className="reports-period-select"
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            aria-label="Select chart period"
          >
            <option value="3">Last 3 months</option>
            <option value="6">Last 6 months</option>
          </select>
        </div>

        <div className="reports-chart-layout">
          <div className="reports-chart">
            {chartData.map((item) => (
              <div className="reports-chart-column" key={item.month}>
                <div className="reports-chart-bars">
                  <div
                    className="reports-chart-bar"
                    title={`Environmental: ${item.environmental}%`}
                    style={{
                      height: `${item.environmental}%`,
                      background: "#6D9B70",
                    }}
                  />
                  <div
                    className="reports-chart-bar"
                    title={`Social: ${item.social}%`}
                    style={{
                      height: `${item.social}%`,
                      background: "#6E9FA2",
                    }}
                  />
                  <div
                    className="reports-chart-bar"
                    title={`Governance: ${item.governance}%`}
                    style={{
                      height: `${item.governance}%`,
                      background: "#C4A66A",
                    }}
                  />
                </div>
                <small>{item.month}</small>
              </div>
            ))}
          </div>

          <div className="reports-legend">
            <div className="reports-legend-item">
              <span
                className="reports-legend-dot"
                style={{ background: "#6D9B70" }}
              />
              Environmental
              <strong>78%</strong>
            </div>
            <div className="reports-legend-item">
              <span
                className="reports-legend-dot"
                style={{ background: "#6E9FA2" }}
              />
              Social
              <strong>70%</strong>
            </div>
            <div className="reports-legend-item">
              <span
                className="reports-legend-dot"
                style={{ background: "#C4A66A" }}
              />
              Governance
              <strong>85%</strong>
            </div>
            <div
              style={{
                padding: "13px",
                borderRadius: 10,
                background: "var(--surface-secondary)",
                color: "var(--text-secondary)",
                fontSize: 10,
                lineHeight: 1.6,
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: 5,
                  color: "var(--text-primary)",
                }}
              >
                Performance insight
              </strong>
              Governance currently leads the department, while Social
              performance has room for further improvement.
            </div>
          </div>
        </div>
      </section>

      <section className="reports-section">
        <div className="reports-section-heading">
          <div>
            <h2>Report Library</h2>
            <p>
              Search and access reports prepared for your department.
            </p>
          </div>
        </div>

        <div className="reports-filters">
          <label className="reports-search">
            <Search size={15} />
            <input
              type="search"
              placeholder="Search reports..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          <select
            className="reports-period-select"
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
            aria-label="Filter report type"
          >
            <option value="All">All types</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Annual">Annual</option>
          </select>

          <select
            className="reports-period-select"
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            aria-label="Filter report category"
          >
            <option value="All">All categories</option>
            <option value="Environmental">Environmental</option>
            <option value="Social">Social</option>
            <option value="Governance">Governance</option>
          </select>
        </div>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Period</th>
                <th>Generated</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <div className="reports-file-name">
                      <span className="reports-file-icon">
                        <FileText size={17} />
                      </span>
                      {report.name}
                    </div>
                  </td>
                  <td>{report.type}</td>
                  <td>{report.period}</td>
                  <td>{formatDate(report.generated)}</td>
                  <td>
                    <span
                      className={`reports-status ${
                        report.status === "In Progress" ? "pending" : ""
                      }`}
                    >
                      {report.status === "Ready" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock3 size={12} />
                      )}
                      {report.status}
                    </span>
                  </td>
                  <td>
                    {report.status === "Ready" ? (
                      <button
                        className="reports-download-btn"
                        onClick={() => handleDownload(report)}
                      >
                        <Download size={13} />
                        Download
                      </button>
                    ) : (
                      <span
                        style={{
                          color: "var(--text-muted)",
                          fontSize: 10,
                        }}
                      >
                        Preparing
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan="6">
                    <div className="reports-empty">
                      <FileText size={25} />
                      <p>No reports match your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
